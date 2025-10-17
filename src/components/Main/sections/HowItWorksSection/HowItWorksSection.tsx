import React from 'react';
import styles from './HowItWorksSection.module.css';
import stepOneIllustration from '../../../../img/megaphone.png';
import stepTwoIllustration from '../../../../img/geolocation.png';
import stepThreeIllustration from '../../../../img/message.png';
import stepFourIllustration from '../../../../img/courier.png';

const HowItWorksSection: React.FC = () => {
  return (
    <section className={styles.section} id="how-to">
      <div className={styles.container}>
        <h2 className={styles.heading}>Как стать отправителем?</h2>
        <div className={styles.layout}>
          <article className={`${styles.card} ${styles.stepOne}`}>
            <div className={styles.stepContent}>
              <h3 className={styles.title}>1. Зарегистрируйтесь и создайте объявление</h3>
              <p className={styles.subtitle}>«Нужно передать зарядку в Белград, кто поедет?»</p>
              <button type="button" className={styles.cta}>Разместить объявление</button>
            </div>
            <img src={stepOneIllustration} alt="Мегафон" className={styles.illustration} />
          </article>

          <article className={`${styles.card} ${styles.stepTwo}`}>
            <div className={styles.stepContent}>
              <h3 className={styles.title}>2. Выберите подходящего попутчика</h3>
              <p className={styles.description}>
                Платформа покажет, кто едет туда, куда нужно и тех, кто откликнулся на ваше объявление.
              </p>
            </div>
            <img src={stepTwoIllustration} alt="Метка на карте" className={styles.illustration} />
          </article>

          <article className={`${styles.card} ${styles.stepThree}`}>
            <img src={stepThreeIllustration} alt="Чат сообщение" className={styles.illustration} />
            <div className={styles.stepContent}>
              <h3 className={styles.title}>3. Обговорите детали с попутчиком</h3>
              <p className={styles.description}>
                Получите контакты, договоритесь напрямую — где, когда и как передать вещь.
              </p>
            </div>
          </article>

          <article className={`${styles.card} ${styles.stepFour}`}>
            <div className={styles.stepContent}>
              <h3 className={styles.title}>4. Отправьте посылку через попутчика</h3>
              <p className={styles.description}>
                Он доставит её в нужное место, а вы сэкономите время и деньги.
              </p>
            </div>
            <img src={stepFourIllustration} alt="Курьер с посылкой" className={styles.illustration} />
          </article>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
