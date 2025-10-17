import React from 'react';
import styles from './StatsSection.module.css';

const stats = [
  {
    value: '>50 000',
    description: 'посылок доставлено попутчиками по всей стране',
  },
  {
    value: '>200',
    description: 'городов, где уже есть активные отправители и попутчики',
  },
  {
    value: '0 ₽',
    description: 'за поиск попутчика — оплачиваете только доставку',
  },
];

const StatsSection: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        {stats.map((stat) => (
          <div key={stat.value} className={styles.stat}>
            <span className={styles.value}>{stat.value}</span>
            <p className={styles.description}>{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
