import React from 'react';
import styles from './ValueProposition.module.css';

const ValueProposition: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Экономьте время и свои деньги!</h2>
          <p className={styles.text}>
            Мы соединяем отправителей посылок с попутчиками, которые уже планируют поездку в нужном
            направлении. Вы договариваетесь о деталях, экономите на доставке и получаете посылку быстрее
            стандартных служб.
          </p>
          <button className={styles.cta}>Найти попутчика</button>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=960&q=80"
            alt="Двое людей планируют отправку посылки"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
