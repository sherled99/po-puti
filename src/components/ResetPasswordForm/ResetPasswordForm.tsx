import { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ResetPasswordForm.module.css";
import { requestPasswordResetEmail } from "../../services/actions/user";
import { AppDispatch, RootState } from "../../services/types";

const ResetPasswordForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, passwordResetRequested } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(`/`);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setLocalError("Введите email, чтобы отправить ссылку для восстановления.");
      return;
    }

    try {
      await dispatch(requestPasswordResetEmail(email.trim()));
      setSuccessMessage("Если такая почта зарегистрирована, мы отправили письмо со ссылкой для восстановления.");
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
        return;
      }
      setLocalError("Не удалось отправить письмо. Попробуйте еще раз.");
    }
  };

  return (
    <div className={styles.verificationForm}>
      <p className={styles.emailText}>Восстановление пароля</p>
      <p className={styles.emailAddress}>Укажите почту, и мы вышлем ссылку для сброса пароля.</p>
      <form onSubmit={handleResetPassword} autoComplete="off">
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="example@mail.com"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Отправляем..." : "Отправить ссылку"}
        </button>
      </form>
      {(localError || error) && <p className={styles.errorMessage}>{localError || error}</p>}
      {(passwordResetRequested || successMessage) && (
        <p className={styles.successMessage}>
          {successMessage || "Если такая почта зарегистрирована, мы отправили письмо со ссылкой для восстановления."}
        </p>
      )}
      <p className={styles.agreementText}>
        Нажимая «Отправить ссылку», вы соглашаетесь с{" "}
        <a href="/agree" target="_blank" rel="noopener noreferrer" className={styles.agreementTextLink}>
          политикой обработки данных
        </a>
        .
      </p>
    </div>
  );
};

export default ResetPasswordForm;
