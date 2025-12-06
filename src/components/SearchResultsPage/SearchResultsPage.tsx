import React, { useCallback, useEffect, useMemo, useState } from "react";
import { endOfDay, format, startOfDay } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SearchResultsPage.module.css";
import SearchForm, { SearchFormValues, TripTab } from "../SearchForm/SearchForm";
import SearchResultCard from "./SearchResultCard";
import Footer from "../Footer/Footer";
import { searchCards } from "../../utils/api";
import type { ISearchCard } from "../../services/types/data";

const initialSearch: SearchFormValues = {
  tripType: "send",
  fromCity: "",
  toCity: "",
  dateFrom: new Date(),
  dateTo: new Date(),
  packageId: "",
  packageName: "",
};

const TRIP_TYPE_TO_ID: Record<TripTab, string> = {
  send: "f0a23ff5-9b42-4d3d-9c5d-57f075444efb",
  receive: "2b1790e0-7cf0-4f96-9e19-7b0f395464a6",
};

const LAST_SEARCH_STORAGE_KEY = "lastSearchValues";

type SerializedSearchFormValues = Omit<SearchFormValues, "dateFrom" | "dateTo"> & {
  dateFrom: string | Date;
  dateTo: string | Date;
};

interface SearchLocationState {
  searchValues?: SerializedSearchFormValues;
  [key: string]: unknown;
}

function reviveSearchValues(values: SerializedSearchFormValues): SearchFormValues {
  const { dateFrom, dateTo, ...rest } = values;
  return {
    ...rest,
    dateFrom: dateFrom instanceof Date ? dateFrom : new Date(dateFrom),
    dateTo: dateTo instanceof Date ? dateTo : new Date(dateTo),
  };
}

function formatCriteriaRange(start: Date, end: Date) {
  return `${format(start, "d MMM, EEE", { locale: ruLocale })} — ${format(end, "d MMM, EEE", {
    locale: ruLocale,
  })}`;
}

function serializeSearchValues(values: SearchFormValues): SerializedSearchFormValues {
  return {
    ...values,
    dateFrom: values.dateFrom.toISOString(),
    dateTo: values.dateTo.toISOString(),
  };
}

function persistSearch(values: SearchFormValues) {
  if (typeof window === "undefined") return;
  try {
    const serialized = serializeSearchValues(values);
    window.sessionStorage.setItem(LAST_SEARCH_STORAGE_KEY, JSON.stringify(serialized));
  } catch {
    /* ignore */
  }
}

function loadPersistedSearch(): SearchFormValues | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(LAST_SEARCH_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SerializedSearchFormValues;
    return reviveSearchValues(parsed);
  } catch {
    return null;
  }
}

function shouldRestoreFromCard(): boolean {
  if (typeof window === "undefined") return false;
  const flag = window.sessionStorage.getItem("restoreSearchAfterBack");
  if (flag) {
    window.sessionStorage.removeItem("restoreSearchAfterBack");
    return true;
  }
  return false;
}

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState<SearchFormValues>(initialSearch);
  const [results, setResults] = useState<ISearchCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchResults = useCallback(async (values: SearchFormValues) => {
    const tripTypeId = TRIP_TYPE_TO_ID[values.tripType];
    if (!tripTypeId || !values.packageId) {
      setError("Заполните все параметры поиска.");
      setResults([]);
      setHasSearched(true);
      setSearchCriteria(values);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchCriteria(values);
    persistSearch(values);

    try {
      const data = await searchCards({
        cityFrom: values.fromCity,
        cityTo: values.toCity,
        arrivalFromUtc: startOfDay(values.dateFrom).toISOString(),
        arrivalToUtc: endOfDay(values.dateTo).toISOString(),
        typeId: tripTypeId,
        packageId: values.packageId,
      });
      setResults(data);
    } catch (err) {
      console.error("Failed to load search results", err);
      setResults([]);
      setError("Не удалось загрузить результаты. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const state = (location.state as SearchLocationState | null) ?? null;
    if (!state?.searchValues) {
      if (shouldRestoreFromCard()) {
        const saved = loadPersistedSearch();
        if (saved) {
          fetchResults(saved);
        }
      }
      return;
    }

    const { searchValues, ...restState } = state;
    fetchResults(reviveSearchValues(searchValues));

    const hasRestState = Object.keys(restState).length > 0;
    navigate(`${location.pathname}${location.search}${location.hash}`, {
      replace: true,
      state: hasRestState ? restState : null,
    });
  }, [fetchResults, location, navigate]);

  const criteriaSummary = useMemo(() => {
    if (!hasSearched) {
      return "Укажите параметры и нажмите «Найти попутчика».";
    }
    const route =
      searchCriteria.fromCity && searchCriteria.toCity
        ? `${searchCriteria.fromCity} — ${searchCriteria.toCity}`
        : "Маршрут не выбран";
    const dates = formatCriteriaRange(searchCriteria.dateFrom, searchCriteria.dateTo);
    const size = searchCriteria.packageName || "Размер не выбран";
    return `${route} · ${dates} · ${size}`;
  }, [hasSearched, searchCriteria]);

  const resultsTitle = useMemo(() => {
    if (!hasSearched) {
      return "Введите параметры для поиска";
    }
    if (loading) {
      return "Ищем подходящие предложения...";
    }
    if (error) {
      return "Не удалось загрузить результаты";
    }
    if (results.length === 0) {
      return "Объявления не найдены";
    }

    const count = results.length;
    const suffix = count === 1 ? "объявление" : count < 5 ? "объявления" : "объявлений";
    return `Найдено ${count} ${suffix}`;
  }, [error, hasSearched, loading, results.length]);

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
            <SearchForm variant="default" initialValues={searchCriteria} onSearch={fetchResults} />
          </div>
        </div>
      </section>

      <section className={styles.resultsSection}>
        <div className={styles.container}>
          <header className={styles.resultsHeader}>
            <div>
              <h2 className={styles.resultsTitle}>{resultsTitle}</h2>
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
            {loading && <div className={styles.stateMessage}>Загружаем результаты…</div>}
            {!loading && error && (
              <div className={`${styles.stateMessage} ${styles.stateError}`}>{error}</div>
            )}
            {!loading && !error && results.length === 0 && hasSearched && (
              <div className={styles.stateMessage}>По заданным параметрам ничего не найдено.</div>
            )}
            {!loading && !error &&
              results.map((card) => (
                <SearchResultCard key={card.id} card={card} />
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SearchResultsPage;
