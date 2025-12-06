import { useEffect, useState, FC } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ResetForm.module.css";
import { submitNewPassword } from "../../services/actions/user";
import { AppDispatch, RootState } from "../../services/types";

const ResetForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const tokenFromQuery = searchParams.get("token") ?? "";
  const emailFromQuery = searchParams.get("email") ?? "";

  const locationState = location.state as { email?: string; token?: string } | null;
  const token = tokenFromQuery || locationState?.token || "";
  const email = emailFromQuery || locationState?.email || "";

  const [password, setPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");
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

  useEffect(() => {
    if (!token || !email) {
      setLocalError("Ссылка для сброса некорректна или устарела.");
    } else {
      setLocalError(null);
    }
  }, [token, email]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (!token || !email) {
      setLocalError("Ссылка для сброса некорректна или устарела.");
      return;
    }

    if (!password.trim() || !againPassword.trim()) {
      setLocalError("Введите новый пароль.");
      return;
    }

    if (password !== againPassword) {
      setLocalError("Пароли не совпадают.");
      return;
    }

    try {
      await dispatch(
        submitNewPassword({
          token,
          email,
          newPassword: password.trim(),
        })
      );
      setSuccessMessage("Пароль обновлен. Выполняем вход...");
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
        return;
      }
      setLocalError("Не удалось сменить пароль. Попробуйте еще раз.");
    }
  };

  return (
    <div className={styles.verificationForm}>
      <p className={styles.emailText}>Придумайте новый пароль</p>
      <form onSubmit={handleResetPassword} autoComplete="off">
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Новый пароль"
            className={styles.inputField}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />
          <input
            type="password"
            placeholder="Повторите пароль"
            className={styles.inputField}
            onChange={(e) => setAgainPassword(e.target.value)}
            value={againPassword}
            name="againPassword"
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading || !token || !email}>
          {loading ? "Обновляем..." : "Подтвердить"}
        </button>
      </form>
      {(localError || error) && <p className={styles.errorMessage}>{localError || error}</p>}
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      <p className={styles.agreementText}>
        Продолжая, вы соглашаетесь с{" "}
        <a href="/agree" target="_blank" rel="noopener noreferrer" className={styles.agreementTextLink}>
          политикой обработки данных
        </a>
        .
      </p>
    </div>
  );
};

export default ResetForm;
