import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import styles from "./SearchResultsPage.module.css";
import SearchForm, { SearchFormValues } from "../SearchForm/SearchForm";
import SearchResultCard, { SearchResult } from "./SearchResultCard";
import Footer from "../Footer/Footer";

const initialSearch: SearchFormValues = {
  tripType: "send",
  fromCity: "Баку",
  toCity: "Белград",
  dateFrom: new Date(2025, 11, 7),
  dateTo: new Date(2025, 11, 10),
  packageSize: "Посылка XS",
};

const mockResults: SearchResult[] = [
  {
    id: 1,
    name: "Александр Бортиников",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    fromCity: "Баку",
    toCity: "Белград",
    travelDates: "7 дек, пн — 10 дек, чт",
    packageSizes: ["XS", "S"],
    description:
      "Здравствуйте, лечу в гости к сестре, могу взять с собой небольшую посылку среднего размера. Всё бережно упакую и передам адресату.",
    reward: "За денежное вознаграждение",
    rating: 4.9,
    reviews: 48,
    verified: true,
    publishedAt: "08:24",
  },
  {
    id: 2,
    name: "Екатерина Варнава",
    avatar: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80",
    fromCity: "Баку",
    toCity: "Белград",
    travelDates: "7 дек, пн — 11 дек, пт",
    packageSizes: ["XS"],
    description:
      "Лечу к друзьям, могу взять коробку небольшого размера либо документы. Всегда остаюсь на связи и могу прислать фото.",
    reward: "За денежное вознаграждение",
    rating: 4.8,
    reviews: 31,
    verified: true,
    publishedAt: "08:12",
  },
  {
    id: 3,
    name: "Михаил Шешков",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    fromCity: "Баку",
    toCity: "Белград",
    travelDates: "8 дек, вт — 12 дек, сб",
    packageSizes: ["XS", "S", "M", "L"],
    description:
      "Регулярно летаю по маршруту Баку — Белград. Бережно отношусь к посылкам, могу встретиться в удобное время, есть опыт в перевозке хрупких вещей.",
    reward: "За денежное вознаграждение",
    rating: 5.0,
    reviews: 64,
    verified: true,
    publishedAt: "07:58",
  },
  {
    id: 4,
    name: "Анна Соколова",
    fromCity: "Баку",
    toCity: "Белград",
    travelDates: "9 дек, ср — 12 дек, сб",
    packageSizes: ["XS", "S", "M"],
    description:
      "Еду к родителям, могу забрать посылку до 5 кг. При необходимости заберу курьером и отправлю фото при вручении.",
    reward: "За денежное вознаграждение",
    rating: 4.7,
    reviews: 22,
    verified: false,
    publishedAt: "07:45",
  },
  {
    id: 5,
    name: "Игорь Тихонов",
    fromCity: "Баку",
    toCity: "Белград",
    travelDates: "10 дек, чт — 13 дек, вс",
    packageSizes: ["XS", "S"],
    description:
      "Часто совмещаю поездки с доставкой небольших посылок. Сообщу о каждом этапе и подтвержу передачу личным фото.",
    reward: "За денежное вознаграждение",
    rating: 4.6,
    reviews: 19,
    verified: false,
    publishedAt: "07:30",
  },
];

function formatCriteriaRange(start: Date, end: Date) {
  return `${format(start, "d MMM, EEE", { locale: ruLocale })} — ${format(end, "d MMM, EEE", {
    locale: ruLocale,
  })}`;
}

const SearchResultsPage: React.FC = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchFormValues>(initialSearch);

  const criteriaSummary = useMemo(() => {
    const route = `${searchCriteria.fromCity} → ${searchCriteria.toCity}`;
    const dates = formatCriteriaRange(searchCriteria.dateFrom, searchCriteria.dateTo);
    const size = searchCriteria.packageSize;
    return `${route} · ${dates} · ${size}`;
  }, [searchCriteria]);

  const handleSearch = (values: SearchFormValues) => {
    setSearchCriteria(values);
  };

  return (
    <main className={styles.page}>
      <section className={styles.heroArea}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <span>Главная</span>
            <span>—</span>
            <span>Поиск</span>
            <span>—</span>
            <span className={styles.breadcrumbCurrent}>Результат поиска</span>
          </div>
          <h1 className={styles.pageTitle}>Найдём попутчика по вашим параметрам</h1>
          <div className={styles.searchFormWrapper}>
            <SearchForm variant="default" initialValues={searchCriteria} onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <section className={styles.resultsSection}>
        <div className={styles.container}>
          <header className={styles.resultsHeader}>
            <div>
              <h2 className={styles.resultsTitle}>Найдено 16 объявлений по вашим параметрам</h2>
              <p className={styles.criteria}>{criteriaSummary}</p>
            </div>
            <label className={styles.sort}>
              <span>Сортировка:</span>
              <select className={styles.sortSelect} defaultValue="relevance">
                <option value="relevance">По релевантности</option>
                <option value="rating">По рейтингу</option>
                <option value="date">По дате публикации</option>
              </select>
            </label>
          </header>
          <div className={styles.list}>
            {mockResults.map((result) => (
              <SearchResultCard key={result.id} result={result} />
            ))}
          </div>
          <nav className={styles.pagination} aria-label="Пагинация">
            <button type="button" className={styles.pageButton} aria-label="Предыдущая страница">
              ‹
            </button>
            <button type="button" className={`${styles.pageButton} ${styles.activePage}`}>
              1
            </button>
            <button type="button" className={styles.pageButton}>
              2
            </button>
            <button type="button" className={styles.pageButton}>
              3
            </button>
            <button type="button" className={styles.pageButton}>
              4
            </button>
            <button type="button" className={styles.pageButton}>
              5
            </button>
            <button type="button" className={styles.pageButton} aria-label="Следующая страница">
              ›
            </button>
          </nav>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SearchResultsPage;
