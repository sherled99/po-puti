import { FC, useEffect, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./VerificationForm.module.css";
import { verifyEmailCode } from "../../services/actions/user";
import { RootState } from "../../services/types";

const CODE_LENGTH = 6;

type LocationState = {
  email?: string;
  backgroundLocation?: Location;
};

const VerificationForm: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const locationState = (location.state as LocationState) ?? {};
  const backgroundLocation = locationState.backgroundLocation;
  const backgroundTarget = backgroundLocation
    ? `${backgroundLocation.pathname}${backgroundLocation.search}${backgroundLocation.hash}`
    : null;

  const { loading, error, email: storedEmail, emailConfirmed, isAuthenticated } = useSelector(
    (state: RootState) => state.user,
  );

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [localError, setLocalError] = useState<string | null>(null);

  const email = locationState.email ?? storedEmail ?? "";

  useEffect(() => {
    if (!email) {
      navigate("/", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (backgroundTarget) {
          navigate(backgroundTarget, { replace: true });
          return;
        }
        navigate("/", { replace: true });
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [navigate, backgroundTarget]);

  useEffect(() => {
    if (emailConfirmed && isAuthenticated) {
      if (backgroundTarget) {
        navigate(backgroundTarget, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [emailConfirmed, isAuthenticated, backgroundTarget, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;
    if (value.length === 1 && /^[0-9]$/.test(value)) {
      const nextCode = [...code];
      nextCode[index] = value;
      setCode(nextCode);

      if (index < CODE_LENGTH - 1) {
        const nextInput = document.querySelector<HTMLInputElement>(`input[name="code-${index + 1}"]`);
        nextInput?.focus();
      }
    } else if (value.length === 0) {
      const nextCode = [...code];
      nextCode[index] = "";
      setCode(nextCode);

      if (index > 0) {
        const previousInput = document.querySelector<HTMLInputElement>(`input[name="code-${index - 1}"]`);
        previousInput?.focus();
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length !== CODE_LENGTH) {
      setLocalError("Пожалуйста, введите полный код из 6 цифр.");
      return;
    }

    if (!email) {
      setLocalError("Не удалось определить email для подтверждения.");
      return;
    }

    setLocalError(null);
    dispatch(verifyEmailCode({ email, code: verificationCode }) as any);
  };

  const handleResend = () => {
    // TODO: integrate real resend endpoint when backend is ready
    console.warn("Resend verification code not yet implemented");
  };

  const handleChangeEmail = () => {
    if (backgroundTarget) {
      navigate(backgroundTarget, { replace: true });
    } else {
      navigate(-1);
    }
  };

  const combinedError = localError ?? error;

  return (
    <div className={styles.verificationForm}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <p className={styles.emailText}>Введите код, который мы отправили на адрес</p>
        <p className={styles.emailAddress}>{email}</p>
        <p className={styles.changeEmail} onClick={handleChangeEmail}>
          Изменить email
        </p>
        <div className={styles.codeInputGroup}>
          {code.map((value, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(event) => handleChange(event, index)}
              className={styles.codeInput}
              name={`code-${index}`}
              autoFocus={index === 0}
            />
          ))}
        </div>
        {combinedError && <p className={styles.errorMessage}>{combinedError}</p>}
        <div className={styles.divNonCode}>
          <p className={styles.resendText}>Не получили письмо?</p>
          <p className={styles.agreementTextLink} onClick={handleResend}>
            Отправить код повторно
          </p>
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          Подтвердить
        </button>
        <p className={styles.agreementText}>
          Продолжая, вы соглашаетесь с
          <a href="/agree" target="_blank" rel="noopener noreferrer" className={styles.agreementTextLink}>
            &nbsp;политикой конфиденциальности
          </a>
        </p>
      </form>
    </div>
  );
};

export default VerificationForm;
