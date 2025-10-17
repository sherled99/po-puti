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
          <a href="tel:+78129201754" className={styles.contact}>+7 (812) 920-17-54</a>
          <p className={styles.address}>
            г. Санкт-Петербург, ул. Лифляндская, д. 3, Лит. О, помещение 1-Н, ком., №23
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="YouTube">
              <img src={youtubeIcon} alt="" />
            </a>
            <a href="#" aria-label="VK">
              <img src={vkIcon} alt="" />
            </a>
          </div>
        </div>

        <div className={styles.column}>
          <button type="button" className={styles.primaryAction}>Задать свой вопрос</button>
          <button type="button" className={styles.secondaryAction}>Связаться в Telegram</button>
        </div>
      </div>

      <div className={styles.separator} />

      <div className={styles.bottom}>
        <div className={styles.bottomBrand}>
          <img src={logo} alt="Попути" className={styles.bottomLogo} />
          <span className={styles.bottomTitle}>Попути</span>
        </div>
        <span className={styles.bottomNote}>ООО “Медицинские технологии будущего”</span>
      </div>
    </footer>
  );
};

export default Footer;
