import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const initials = React.useMemo(() => {
    const parts = result.name.trim().split(" ");
    if (!parts.length) {
      return "?";
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  }, [result.name]);

  const ratingDisplay = React.useMemo(() => {
    return result.rating.toFixed(1).replace(".", ",");
  }, [result.rating]);

  const handleOpenDetails = () => {
    navigate(`/search/${result.id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenDetails();
    }
  };

  return (
    <article
      className={styles.card}
      onClick={handleOpenDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Открыть подробную информацию о попутчике ${result.name}`}
    >
      <div className={styles.main}>
        <div className={styles.avatarWrapper}>
          {result.avatar ? (
            <img className={styles.avatarImage} src={result.avatar} alt={result.name} />
          ) : (
            <span className={styles.avatarFallback} aria-hidden>
              {initials}
            </span>
          )}
        </div>
        <div className={styles.details}>
          <h3 className={styles.name}>{result.name}</h3>
          <ul className={styles.meta} aria-label="Ключевые параметры">
            <li className={styles.metaItem}>
              <span className={`${styles.metaIcon} ${styles.iconRoute}`} aria-hidden />
              <span className={styles.metaValue}>{`${result.fromCity} — ${result.toCity}`}</span>
            </li>
            <li className={styles.metaItem}>
              <span className={`${styles.metaIcon} ${styles.iconCalendar}`} aria-hidden />
              <span className={styles.metaValue}>Дата отъезда: {result.travelDates}</span>
            </li>
            <li className={styles.metaItem}>
              <span className={`${styles.metaIcon} ${styles.iconPackage}`} aria-hidden />
              <span className={styles.metaValue}>
                Размер посылки: {result.packageSizes.join(", ")}
              </span>
            </li>
          </ul>
          <p className={styles.description}>{result.description}</p>
          <p className={styles.publishedAt}>Дата публикации: {result.publishedAt}</p>
        </div>
      </div>
      <div className={styles.aside}>
        <span className={styles.reward}>{result.reward}</span>
        <div className={styles.ratingRow}>
          <span className={styles.ratingLabel}>Рейтинг {ratingDisplay}</span>
          <button type="button" className={styles.reviewsLink}>
            Отзывы ({result.reviews})
          </button>
        </div>
        <div className={styles.verificationRow}>
          <span
            className={`${styles.statusIcon} ${
              result.verified ? styles.statusIconSuccess : styles.statusIconWarn
            }`}
            aria-hidden
          />
          <span className={styles.verificationText}>
            {result.verified ? "Аккаунт подтвержден" : "Аккаунт не подтвержден"}
          </span>
          <span className={styles.infoIcon} aria-hidden />
        </div>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={(event) => event.stopPropagation()}
        >
          Отправить запрос
        </button>
      </div>
    </article>
  );
};

export default SearchResultCard;
