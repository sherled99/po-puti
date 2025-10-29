import React, { useEffect, useMemo, useState } from 'react';
import styles from './Authorization.module.css';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/types';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Location } from 'react-router-dom';

const Authorization: React.FC = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const backgroundTarget = useMemo(() => {
    const state = location.state as { backgroundLocation?: Location } | null;
    const background = state?.backgroundLocation;
    if (!background) {
      return null;
    }
    return `${background.pathname}${background.search}${background.hash}`;
  }, [location.state]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    if (backgroundTarget) {
      navigate(backgroundTarget, { replace: true });
      return;
    }
    navigate('/', { replace: true });
  }, [isAuthenticated, backgroundTarget, navigate]);

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