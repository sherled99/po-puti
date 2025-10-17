import React from 'react';
import styles from './BenefitsSection.module.css';
import clockIcon from '../../../../img/clock.png';
import thumbsUpIcon from '../../../../img/thumbs-up-icon.png';
import walletIcon from '../../../../img/wallet-with-money.png';
import starIcon from '../../../../img/star.png';

const benefits = [
  {
    title: 'Быстро',
    description: 'Больше никаких чатов — ваш попутчик найдётся буквально в пару кликов!',
    icon: clockIcon,
  },
  {
    title: 'Легко',
    description: 'Вы решаете, что отправлять и кому. Прозрачно, без посредников и лишних движений.',
    icon: thumbsUpIcon,
  },
  {
    title: 'Выгодно',
    description: 'Вы передаете посылку, а попутчик может заработать на своей дороге! Всё по-честному',
    icon: walletIcon,
  },
  {
    title: 'Уникально',
    description: 'Подобной платформы ещё нет — мы создаём новый стандарт для удобной доставки!',
    icon: starIcon,
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
              <div className={styles.content}>
                <h3 className={styles.title}>{benefit.title}</h3>
                <p className={styles.description}>{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
