import React from 'react';
import styles from './Footer.module.css';
import logo from '../../img/logo.png';
import vkIcon from '../../img/vkLogo.png';
import youtubeIcon from '../../img/yandexLogo.png';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.column}>
          <ul className={styles.linkList}>
            <li><a href="#">О компании</a></li>
            <li><a href="#">Для отправителей</a></li>
            <li><a href="#">Для попутчиков</a></li>
            <li><a href="#">Гайд по безопасности</a></li>
            <li><a href="#">Для рекламы</a></li>
            <li><a href="#">Политика конфиденциальности</a></li>
          </ul>
        </nav>

        <nav className={styles.column}>
          <ul className={styles.linkList}>
            <li><a href="#">Войти</a></li>
            <li><a href="#">Зарегистрироваться</a></li>
            <li><a href="#">Разместить объявление</a></li>
          </ul>
        </nav>

        <div className={styles.column}>
          <a href="mailto:poputi@gmail.com" className={styles.contact}>poputi@gmail.com</a>
        </div>

        <div className={styles.column}>
          <button type="button" className={styles.primaryAction}>Задать свой вопрос</button>
          <button type="button" className={styles.secondaryAction}>Связаться в Telegram</button>
        </div>
      </div>

      <div className={styles.separator} />

      <div className={styles.bottom}>
        <div className={styles.bottomBrand}>
          <img src={logo} alt="По пути" className={styles.bottomLogo} />
          <span className={styles.bottomTitle}>По пути</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
