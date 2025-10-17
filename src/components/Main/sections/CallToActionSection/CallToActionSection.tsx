import React from 'react';
import styles from './CallToActionSection.module.css';

const CallToActionSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Готовы сделать свою жизнь проще?</h2>
          <p className={styles.text}>
            Создайте объявление всего за пару минут и найдите попутчика, который доставит вашу посылку по пути.
          </p>
        </div>
        <button className={styles.button}>Создать заявку</button>
      </div>
    </section>
  );
};

export default CallToActionSection;
