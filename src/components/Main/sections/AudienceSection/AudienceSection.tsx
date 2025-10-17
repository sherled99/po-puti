import React from 'react';
import styles from './AudienceSection.module.css';
import info1 from '../../../../img/info 1.png';
import info2 from '../../../../img/info 2.png';
import info3 from '../../../../img/info 3.png';

const audiences = [
  {
    title: 'Отправителям',
    description: 'Нужно срочно отправить посылку? Найдите попутчика за пару минут!',
    image: info1,
  },
  {
    title: 'Попутчикам',
    description: 'Куда-то едете? Помогайте доставить вещи и получайте вознаграждение!',
    image: info2,
  },
  {
    title: 'Для тех, кто ценит время',
    description: 'Радуйте близких — отправляйте и получайте быстрее, чем по почте',
    image: info3,
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
