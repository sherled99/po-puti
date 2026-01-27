import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../services/actions/user";
import { RootState } from "../../services/types";
import styles from "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }) as any);
  };

  const handleForgotPassword = () => {
    navigate(`/resetPassword`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Электронная почта"
            className={styles.inputField}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Пароль"
            className={styles.inputField}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>
        <div className={styles.forgotPassword}>
          <button type="button" onClick={handleForgotPassword} className={styles.forgotButton}>
            Забыли пароль?
          </button>
        </div>
        <p className={styles.agreementText}>
          Нажимая «Войти», вы принимаете
          <a
            href="/agree"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.agreementTextLink}
          >
            &nbsp;Соглашение
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
