import React from 'react';
import styles from './SafetySection.module.css';
import introImage from '../../../../img/SafetySection/Frame 2131329070.png';
import handshakeImage from '../../../../img/SafetySection/Frame 2131329071.png';
import shieldImage from '../../../../img/SafetySection/safety 1.png';

const SafetySection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Безопасность и ответственность</h2>
        <div className={styles.layout}>
          <article className={`${styles.card} ${styles.textCard}`}>
            <h3 className={styles.title}>Мы — просто крутая платформа, которая помогает находить тех, кому по пути!</h3>
            <p className={styles.text}>
              Отправляйте и принимайте посылки только на своё усмотрение, вся ответственность за передачу и доставку
              полностью лежит на отправителе и попутчике.
            </p>
          </article>

          <article className={`${styles.card} ${styles.topImageCard}`}>
            <img src={handshakeImage} alt="Встреча отправителя с попутчиком" className={styles.image} />
          </article>

          <article className={`${styles.card} ${styles.bottomImageCard}`}>
            <img src={introImage} alt="Передача посылки" className={styles.image} />
          </article>

          <article className={`${styles.card} ${styles.highlightCard}`}>
            <div className={styles.highlightBody}>
              <h3 className={styles.title}>Но нам очень важна ваша безопасность</h3>
              <p className={styles.text}>
                Мы подготовили гайд, который поможет вам защититься от мошенников, чтобы ваши отправки и доставки прошли
                максимально спокойно и надёжно.
              </p>
              <button type="button" className={styles.button}>Читать гайд</button>
            </div>
          </article>

          <img src={shieldImage} alt="Золотой щит" className={styles.shield} />
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
