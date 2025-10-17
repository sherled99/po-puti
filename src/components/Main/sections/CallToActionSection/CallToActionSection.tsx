import React from 'react';
import styles from './CallToActionSection.module.css';
import familyImage from '../../../../img/CallToActionSection/life.png';

const CallToActionSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Готовы сделать свою жизнь проще?</h2>
          <p className={styles.text}>
            Нужно всего пара минут на объявление — дальше платформа найдёт попутчика, а вы отдыхаете. Время — деньги,
            не теряйте ни того, ни другого!
          </p>
          <button type="button" className={styles.button}>Найти попутчика</button>
        </div>
        <div className={styles.imageWrapper}>
          <img src={familyImage} alt="Семья открывает посылку" className={styles.image} />
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
