import React from "react";
import styles from "./Footer.module.css";
import logo from "../../img/logo.png";
import vkIcon from "../../img/vkLogo.png";
import youtubeIcon from "../../img/yandexLogo.png";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.column}>
          <ul className={styles.linkList}>
            <li><a href="/about">О компании</a></li>
            <li><a href="/senders">Для отправителей</a></li>
            <li><a href="/companions">Для попутчиков</a></li>
            <li><a href="/safety">Гайд по безопасности</a></li>
            <li><a href="/ads">Для рекламы</a></li>
            <li><a href="/privacy">Политика конфиденциальности</a></li>
          </ul>
        </nav>

        <nav className={styles.column}>
          <ul className={styles.linkList}>
            <li><a href="/login">Войти</a></li>
            <li><a href="/register">Зарегистрироваться</a></li>
            <li><a href="/create">Разместить объявление</a></li>
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
        <div className={styles.socials} aria-label="Мы в соцсетях">
          <a href="https://vk.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
            <img src={vkIcon} alt="VK" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
            <img src={youtubeIcon} alt="YouTube" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
