import React, { useState } from 'react';
import styles from './Authorization.module.css';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const Authorization: React.FC = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const handleLoginClick = () => {
    setIsLoginActive(true);
  };

  const handleRegisterClick = () => {
    setIsLoginActive(false);
  };

  return (
    <div className={`${isLoginActive ? styles.isLoginActive : styles.isRegisterActive}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.btnToggleGroup}>
            <button
              className={`${styles.btnToggle} ${styles.btnLeft} ${isLoginActive ? styles.active : styles.btnText}`}
              onClick={handleLoginClick}
            >
              Вход
            </button>
            <button
              className={`${styles.btnToggle} ${styles.btnRight} ${!isLoginActive ? styles.active : styles.btnText}`}
              onClick={handleRegisterClick}
            >
              Регистрация
            </button>
          </div>
        </div>
        <div className={styles.modalBody}>
          {isLoginActive ? (
            <div>
              <LoginForm/>
            </div>
          ) : (
            <div>
              <RegisterForm/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authorization;