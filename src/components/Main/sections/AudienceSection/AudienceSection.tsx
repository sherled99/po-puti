import React from 'react';
import styles from './AudienceSection.module.css';

const audiences = [
  {
    title: 'Отправители',
    description:
      'Доставьте важные документы, подарки или покупки через попутчиков, которые уже летят в нужный город.',
    image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Попутчики',
    description:
      'Возьмите посылку с собой в поездку, чтобы окупить часть пути и сделать доброе дело.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Для всей вашей семьи',
    description:
      'Делитесь теплотой и заботой с близкими, даже если вы далеко. Мы поможем доставить радость.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
];

const AudienceSection: React.FC = () => {
  return (
    <section className={styles.section} id="for-whom">
      <div className={styles.container}>
        <h2 className={styles.heading}>Для кого?</h2>
        <div className={styles.grid}>
          {audiences.map((audience) => (
            <article key={audience.title} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={audience.image} alt={audience.title} className={styles.image} />
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{audience.title}</h3>
                <p className={styles.description}>{audience.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
