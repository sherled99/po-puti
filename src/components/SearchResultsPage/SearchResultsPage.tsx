import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import styles from "./SearchResultsPage.module.css";
import SearchForm, { SearchFormValues } from "../SearchForm/SearchForm";
import SearchResultCard from "./SearchResultCard";
import Footer from "../Footer/Footer";
import { mockResults } from "./mockResults";

const initialSearch: SearchFormValues = {
  tripType: "send",
  fromCity: "Баку",
  toCity: "Белград",
  dateFrom: new Date(2025, 11, 7),
  dateTo: new Date(2025, 11, 10),
  packageSize: "Посылка XS",
};

function formatCriteriaRange(start: Date, end: Date) {
  return `${format(start, "d MMM, EEE", { locale: ruLocale })} — ${format(end, "d MMM, EEE", {
    locale: ruLocale,
  })}`;
}

const SearchResultsPage: React.FC = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchFormValues>(initialSearch);

  const criteriaSummary = useMemo(() => {
    const route = `${searchCriteria.fromCity} — ${searchCriteria.toCity}`;
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
          <div className={styles.breadcrumbs} aria-label="Хлебные крошки">
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
