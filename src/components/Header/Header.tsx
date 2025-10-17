import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../img/logo.png';
import userIcon from '../../img/user.svg';

const navLinks = [
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Для кого', href: '#for-whom' },
  { label: 'Как отправить', href: '#how-to' },
  { label: 'FAQ', href: '#faq' },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openAuthModal = () => {
    navigate('/login', { state: { backgroundLocation: location } });
  };

  const goHome = () => navigate('/');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.logoButton} onClick={goHome} aria-label="На главную">
          <img src={logo} alt="Попути" className={styles.logo} />
        </button>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <button className={styles.primaryAction} onClick={openAuthModal}>
            Найти попутчика
          </button>
          <button className={styles.secondaryAction} onClick={openAuthModal}>
            Войти
          </button>
          <button className={styles.profileButton} onClick={openAuthModal} aria-label="Профиль">
            <img src={userIcon} alt="" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
