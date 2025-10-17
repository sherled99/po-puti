import React, { useState } from 'react';
import styles from './FaqSection.module.css';

const faqs = [
  {
    question: 'Сколько стоит доставка через попутчика?',
    answer:
      'Стоимость вы обсуждаете с попутчиком напрямую. Мы рекомендуем ориентироваться на маршрут, размеры посылки и срочность. Комиссию за сделку сервис не взимает.',
  },
  {
    question: 'Как убедиться, что попутчик надёжный?',
    answer:
      'Обращайте внимание на подтверждение личности и отзывы. Используйте встроенный чат и проверяйте документы попутчика при встрече.',
  },
  {
    question: 'Что делать, если посылка не была доставлена?',
    answer:
      'Свяжитесь с нашей службой поддержки — мы поможем разобраться в ситуации и найдём оптимальное решение.',
  },
  {
    question: 'Какие посылки можно отправлять?',
    answer:
      'Мы поддерживаем отправку безопасных для перевозки вещей. Опасные и запрещённые к пересылке предметы перевозить нельзя.',
  },
  {
    question: 'Нужно ли оформлять дополнительные документы?',
    answer:
      'Как правило, достаточно договора между отправителем и попутчиком. При необходимости мы предоставим шаблон соглашения.',
  },
];

const FaqSection: React.FC = () => {
  const [opened, setOpened] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpened((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <h2 className={styles.heading}>Часто задаваемые вопросы</h2>
        <div className={styles.list}>
          {faqs.map((faq, index) => {
            const isOpen = opened === index;
            return (
              <div key={faq.question} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>+</span>
                </button>
                {isOpen && <p className={styles.answer}>{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
