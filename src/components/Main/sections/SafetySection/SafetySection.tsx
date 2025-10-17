import React from 'react';
import styles from './SafetySection.module.css';

const SafetySection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Безопасность и ответственность</h2>
        <div className={styles.grid}>
          <article className={styles.cardLarge}>
            <img
              src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=900&q=80"
              alt="Передача посылки"
              className={styles.image}
            />
            <div className={styles.body}>
              <h3 className={styles.title}>Мы — просто крутая платформа, которая помогает находить тех, кому можно доверить посылку.</h3>
              <p className={styles.text}>
                Каждого попутчика мы просим подтвердить личность. Оставляйте отзывы, оценивайте поездки и выбирайте
                только тех, кому доверяете посылку.
              </p>
            </div>
          </article>
          <article className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.title}>Но мы очень серьёзно относимся к безопасности.</h3>
              <p className={styles.text}>
                У нас работает служба поддержки, баним нарушителей и предоставляем дополнительные рекомендации по
                упаковке и передаче посылок.
              </p>
              <button className={styles.linkButton}>Узнать правила</button>
            </div>
          </article>
          <article className={styles.card}>
            <img
              src="https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=800&q=80"
              alt="Попутчик с посылкой"
              className={styles.imageShield}
            />
          </article>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
