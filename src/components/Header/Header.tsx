import React from 'react';
import './Header.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../img/logo.png'; 

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const open = () => {
    navigate(`/login`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" />
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
                О нас
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
          <button className="btn btn-warning me-2" onClick={open}>Войти</button>
          <a href="#" className="login-icon">
            <i className="bi bi-person"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;