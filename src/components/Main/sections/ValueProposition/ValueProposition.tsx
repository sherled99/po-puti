import React from 'react';
import styles from './ValueProposition.module.css';
import illustration from '../../../../img/value-proposition.png';

const ValueProposition: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Экономьте время и свои деньги!</h2>
            <p className={styles.text}>
              Забудьте про чаты и долгие доставки по почте. Укажите, что и куда отправить, и найдётся человек,
              который уже едет в нужную сторону и готов помочь.
            </p>
            <button type="button" className={styles.cta}>Попробовать сейчас</button>
          </div>
        </div>
        <div className={styles.illustrationWrapper}>
          <img src={illustration} alt="Попутчики проверяют телефон" className={styles.illustration} />
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
