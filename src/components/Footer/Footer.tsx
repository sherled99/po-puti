import React from 'react';
import styles from './Footer.module.css';
import logo from '../../img/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img src={logo} alt="Попути" className={styles.logo} />
          <p className={styles.tagline}>Сервис для поиска попутчика вашей посылке.</p>
        </div>
        <div className={styles.linksColumn}>
          <h4 className={styles.heading}>Навигация</h4>
          <ul className={styles.list}>
            <li><a href="#advantages">Преимущества</a></li>
            <li><a href="#for-whom">Для кого</a></li>
            <li><a href="#how-to">Как отправить</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className={styles.contacts}>
          <h4 className={styles.heading}>Контакты</h4>
          <a href="mailto:poputi@gmail.com" className={styles.link}>poputi@gmail.com</a>
          <a href="tel:+78129201564" className={styles.link}>+7 (812) 920-15-64</a>
          <p className={styles.address}>Санкт-Петербург, Невский проспект, 12</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.button}>Найти попутчика</button>
          <span className={styles.notice}>Мы на связи ежедневно с 09:00 до 21:00</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Попути. Все права защищены.</span>
        <div className={styles.bottomLinks}>
          <a href="/privacy">Политика конфиденциальности</a>
          <a href="/terms">Пользовательское соглашение</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
