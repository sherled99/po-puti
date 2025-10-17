import React from 'react';
import styles from './BenefitsSection.module.css';

const benefits = [
  {
    title: 'Безопасно',
    description: 'Проверенные попутчики и верификация профилей обеспечивают безопасность доставок.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1047/1047710.png',
  },
  {
    title: 'Быстро',
    description: 'Посылка отправляется с попутчиком уже завтра — никаких очередей и складов.',
    icon: 'https://cdn-icons-png.flaticon.com/512/992/992700.png',
  },
  {
    title: 'Выгодно',
    description: 'Договаривайтесь о стоимости напрямую и платите только за путь посылки.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1484/1484596.png',
  },
  {
    title: 'Удобно',
    description: 'Все детали поездки и статусы посылки — в одном личном кабинете.',
    icon: 'https://cdn-icons-png.flaticon.com/512/992/992651.png',
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section className={styles.section} id="advantages">
      <div className={styles.container}>
        <h2 className={styles.heading}>Вам удобно — нам приятно!</h2>
        <div className={styles.grid}>
          {benefits.map((benefit) => (
            <article key={benefit.title} className={styles.card}>
              <div className={styles.iconWrapper}>
                <img src={benefit.icon} alt={benefit.title} className={styles.icon} />
              </div>
              <h3 className={styles.title}>{benefit.title}</h3>
              <p className={styles.description}>{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
