import React from "react";
import styles from "./SearchResultCard.module.css";

export interface SearchResult {
  id: number;
  name: string;
  avatar?: string;
  fromCity: string;
  toCity: string;
  travelDates: string;
  packageSizes: string[];
  description: string;
  reward: string;
  rating: number;
  reviews: number;
  verified: boolean;
  publishedAt: string;
}

interface SearchResultCardProps {
  result: SearchResult;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {
  const initials = React.useMemo(() => {
    const [firstWord] = result.name.split(" ");
    return firstWord ? firstWord.charAt(0).toUpperCase() : "?";
  }, [result.name]);

  return (
    <article className={styles.card}>
      <div className={styles.main}>
        <div className={styles.avatarWrapper} aria-hidden={!result.avatar}>
          {result.avatar ? (
            <img src={result.avatar} alt={result.name} className={styles.avatarImage} />
          ) : (
            <span className={styles.avatarFallback}>{initials}</span>
          )}
        </div>
        <div className={styles.details}>
          <h3 className={styles.name}>{result.name}</h3>
          <ul className={styles.meta}>
            <li className={styles.metaItem}>
              <span className={styles.metaLabel}>Маршрут:</span>
              <span>{`${result.fromCity} → ${result.toCity}`}</span>
            </li>
            <li className={styles.metaItem}>
              <span className={styles.metaLabel}>Дата отправки:</span>
              <span>{result.travelDates}</span>
            </li>
            <li className={styles.metaItem}>
              <span className={styles.metaLabel}>Размер посылки:</span>
              <span>{result.packageSizes.join(", ")}</span>
            </li>
          </ul>
          <p className={styles.description}>{result.description}</p>
          <p className={styles.publishedAt}>Дата публикации: {result.publishedAt}</p>
        </div>
      </div>
      <div className={styles.aside}>
        <span className={styles.reward}>{result.reward}</span>
        <div className={styles.ratingBlock}>
          <span className={styles.ratingValue}>Рейтинг {result.rating.toFixed(1)}</span>
          <span className={styles.ratingMeta}>Отзывы ({result.reviews})</span>
        </div>
        <span
          className={[
            styles.verification,
            result.verified ? styles.verified : styles.notVerified,
          ].join(" ")}
        >
          {result.verified ? "Аккаунт подтвержден" : "Аккаунт не подтвержден"}
        </span>
        <button type="button" className={styles.actionBtn}>
          Отправить запрос
        </button>
      </div>
    </article>
  );
};

export default SearchResultCard;
