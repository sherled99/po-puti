import React, { useState, useRef, useEffect } from 'react';
import styles from './HeroSection.module.css';
import background from '../../img/heroSection.jpg';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань'];
const packageTypes = ['Документы', 'Посылка XS', 'Посылка S', 'Посылка M', 'Посылка L'];

interface RangeItem {
  startDate: Date;
  endDate: Date;
  key: string;
}

function formatRange(start: Date, end: Date) {
  const startStr = format(start, 'd MMM, EEE', { locale: ruLocale });
  const endStr = format(end, 'd MMM, EEE', { locale: ruLocale });
  return `${startStr} - ${endStr}`;
}

const HeroSection: React.FC = () => {
  const [range, setRange] = useState<RangeItem[]>([
    { startDate: new Date(), endDate: new Date(), key: 'selection' },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const handleDateChange = (item: { selection: RangeItem }) => {
    const updated = item.selection;
    setRange([updated]);
    if (updated.endDate > updated.startDate) {
      setShowCalendar(false);
    }
  };

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Тут находят попутчика для своей посылки!</h1>
        <div className={styles.formWrapper}>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.active}`}>Отправить посылку</button>
            <button className={styles.tab}>Стать попутчиком</button>
          </div>
          <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
            <select className={styles.input} defaultValue="">
              <option value="" disabled>
                Откуда
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <select className={styles.input} defaultValue="">
              <option value="" disabled>
                Куда
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className={styles.datePickerWrapper} ref={calendarRef}>
              <button
                type="button"
                className={styles.datePicker}
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                {formatRange(range[0].startDate, range[0].endDate)}
              </button>
              {showCalendar && (
                <div className={styles.calendarDropdown}>
                  <DateRange
                    ranges={range}
                    onChange={handleDateChange}
                    locale={ruLocale}
                    showSelectionPreview
                    moveRangeOnFirstSelection={false}
                    months={1}
                    direction="horizontal"
                  />
                </div>
              )}
            </div>
            <select className={styles.select} defaultValue="">
              <option value="" disabled>
                Тип посылки
              </option>
              {packageTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button type="submit" className={styles.searchBtn}>
              Найти попутчика
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
