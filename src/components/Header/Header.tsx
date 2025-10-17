import React from 'react';
import styles from './Header.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../img/logo.png'; 
import user from '../../img/user.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openLogin = () => {
    navigate(`/login`, {
      state: { backgroundLocation: location },
    });
  };

  const openMainPage = () => navigate('/');

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles.header}`}>
      <div className="container">
        <a className="navbar-brand" onClick={openMainPage}>
          <img src={logo} className={styles.logoIcon} alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Главная
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Как это работает
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Вопросы
              </a>
            </li>
          </ul>
          <button className={`btn btn-warning me-2 ${styles.btnAdventure}`} onClick={openLogin}>Разместить объявление</button>
          <button className={`btn ${styles.btnEnter}`} onClick={openLogin}>Войти</button>
          <img src={user}></img>
          <a href="#" className={styles.loginIcon}>
            <i className="bi bi-person"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;