import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Location } from "react-router-dom";
import { register } from "../../services/actions/user";
import { RootState } from "../../services/types";
import styles from "./RegisterForm.module.css";
import YandexLogo from "../../img/yandexLogo.png";
import VkLogo from "../../img/vkLogo.png";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { loading, error, needsVerification, email: registeredEmail } = useSelector(
    (state: RootState) => state.user,
  );

  const backgroundLocation =
    ((location.state as { backgroundLocation?: Location } | null)?.backgroundLocation as Location | undefined) ??
    location;

  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (!needsVerification) {
      hasNavigatedRef.current = false;
    }
  }, [needsVerification]);

  useEffect(() => {
    if (!loading && needsVerification && registeredEmail && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      navigate("/verification", {
        state: {
          backgroundLocation,
          email: registeredEmail,
        },
      });
    }
  }, [loading, needsVerification, registeredEmail, navigate, backgroundLocation]);

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password || !againPassword) {
      setFormError("Заполните все поля.");
      return;
    }

    if (password !== againPassword) {
      setFormError("Пароли не совпадают.");
      return;
    }

    setFormError(null);
    dispatch(register({ email, password }) as any);
  };

  const loginFromSocial = () => {
    console.warn("Социальная авторизация в разработке");
  };

  const combinedError = formError ?? error;

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleRegister} autoComplete="off">
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Электронная почта"
            className={styles.inputField}
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            name="email"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Придумайте пароль"
            className={styles.inputField}
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            name="password"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Повторите пароль"
            className={styles.inputField}
            onChange={(event) => setAgainPassword(event.target.value)}
            value={againPassword}
            name="againPassword"
            required
          />
        </div>
        {combinedError && <p className={styles.errorMessage}>{combinedError}</p>}
        <button type="submit" className={styles.submitButton} disabled={loading}>
          Зарегистрироваться
        </button>
        <p className={styles.agreementText}>
          Продолжая, вы соглашаетесь с
          <a
            href="/agree"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.agreementTextLink}
          >
            &nbsp;пользовательским соглашением
          </a>
        </p>
        <div className={styles.socialLogin}>
          <p className={styles.socialLoginText}>Войти через социальные сети</p>
          <div className={styles.socialIcons}>
            <button type="button" className={styles.socialButton} onClick={loginFromSocial}>
              <img src={VkLogo} alt="VK" className={styles.socialLogo} />
            </button>
            <button type="button" className={styles.socialButton} onClick={loginFromSocial}>
              <img src={YandexLogo} alt="Yandex" className={styles.socialLogo} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
