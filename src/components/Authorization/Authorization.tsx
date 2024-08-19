import React, { useState } from 'react';
import styles from './Authorization.module.css';




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
              className={`${styles.btnToggle} ${isLoginActive ? styles.active : styles.btnText}`}
              onClick={handleLoginClick}
            >
              Вход
            </button>
            <button
              className={`${styles.btnToggle} ${!isLoginActive ? styles.active : styles.btnText}`}
              onClick={handleRegisterClick}
            >
              Регистрация
            </button>
          </div>
        </div>
        <div className={styles.modalBody}>
          {isLoginActive ? (
            <div>
              <h2>Форма Входа</h2>
              {/* Форма входа */}
            </div>
          ) : (
            <div>
              <h2>Форма Регистрации</h2>
              {/* Форма регистрации */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authorization;