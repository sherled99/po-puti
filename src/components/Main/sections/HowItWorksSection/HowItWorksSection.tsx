import React from 'react';
import styles from './HowItWorksSection.module.css';

const steps = [
  {
    title: '1. Зарегистрируйтесь или войдите',
    description: 'Создайте профиль с контактами и подтвердите свою личность, чтобы начать пользоваться сервисом.',
    icon: 'https://cdn-icons-png.flaticon.com/512/6213/6213731.png',
  },
  {
    title: '2. Выберите подходящего попутчика',
    description: 'Воспользуйтесь фильтрами по датам и направлениям, чтобы найти идеального партнёра для доставки.',
    icon: 'https://cdn-icons-png.flaticon.com/512/11474/11474192.png',
  },
  {
    title: '3. Обсудите детали отправки',
    description: 'Свяжитесь в чате, уточните габариты посылки, оплату и место встречи без лишних звонков.',
    icon: 'https://cdn-icons-png.flaticon.com/512/2618/2618497.png',
  },
  {
    title: '4. Отдайте посылку через попутчика',
    description: 'Передайте посылку в согласованном месте и отслеживайте статус доставки в личном кабинете.',
    icon: 'https://cdn-icons-png.flaticon.com/512/11071/11071493.png',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className={styles.section} id="how-to">
      <div className={styles.container}>
        <h2 className={styles.heading}>Как стать отправителем?</h2>
        <div className={styles.grid}>
          {steps.map((step) => (
            <article key={step.title} className={styles.card}>
              <div className={styles.iconWrapper}>
                <img src={step.icon} alt="" aria-hidden="true" className={styles.icon} />
              </div>
              <div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
