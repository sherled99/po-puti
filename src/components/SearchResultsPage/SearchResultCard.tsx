import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import styles from "./SearchResultCard.module.css";
import type { ISearchCard } from "../../services/types/data";
import type { RootState } from "../../services/types";
import { getUserById } from "../../utils/api";

interface SearchResultCardProps {
  card: ISearchCard;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ card }) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.user.token);
  const [avatar, setAvatar] = useState<string | null>(() => card.image ?? card.createdByImage ?? null);
  const initials = useMemo(() => {
    const parts = card.name.trim().split(" ");
    if (!parts.length) {
      return "?";
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  }, [card.name]);

  const arrivalDisplay = useMemo(() => {
    if (!card.timeArrivedUtc) {
      return "Дата не указана";
    }
    return format(new Date(card.timeArrivedUtc), "d MMM yyyy, HH:mm", { locale: ruLocale });
  }, [card.timeArrivedUtc]);

  const createdDisplay = useMemo(() => {
    if (!card.createdOnUtc) {
      return "-";
    }
    return format(new Date(card.createdOnUtc), "d MMM yyyy, HH:mm", { locale: ruLocale });
  }, [card.createdOnUtc]);

  const handleOpenDetails = () => {
    try {
      window.sessionStorage.setItem("restoreSearchAfterBack", "true");
    } catch {
      /* ignore storage issues */
    }
    navigate(`/search/${card.id}`, { state: { card } });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenDetails();
    }
  };

  useEffect(() => {
    let cancelled = false;
    if (avatar || !token || !card.createdById) {
      return;
    }
    getUserById(card.createdById, token)
      .then((user) => {
        if (!cancelled && user.image) {
          setAvatar(user.image);
        }
      })
      .catch(() => {
        /* ignore, fallback to initials */
      });
    return () => {
      cancelled = true;
    };
  }, [avatar, card.createdById, token]);

  return (
    <article
      className={styles.card}
      onClick={handleOpenDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Открыть подробную информацию об объявлении ${card.name}`}
    >
      <div className={styles.main}>
        <div className={styles.avatarWrapper}>
          {avatar ? (
            <img src={`data:image/*;base64,${avatar}`} alt="" className={styles.avatarImage} />
          ) : (
            <span className={styles.avatarFallback} aria-hidden>
              {initials}
            </span>
          )}
        </div>
        <div className={styles.details}>
          <h3 className={styles.name}>{card.name}</h3>
          <ul className={styles.meta} aria-label="Ключевые параметры">
            <li className={styles.metaItem}>
              <span className={`${styles.metaIcon} ${styles.iconRoute}`} aria-hidden />
              <span className={styles.metaValue}>{`${card.cityFrom} — ${card.cityTo}`}</span>
            </li>
            <li className={styles.metaItem}>
              <span className={`${styles.metaIcon} ${styles.iconCalendar}`} aria-hidden />
              <span className={styles.metaValue}>Дата прибытия: {arrivalDisplay}</span>
            </li>
            <li className={styles.metaItem}>
              <span className={`${styles.metaIcon} ${styles.iconPackage}`} aria-hidden />
              <span className={styles.metaValue}>Размер посылки: {card.packageName}</span>
            </li>
          </ul>
          <p className={styles.description}>{card.description || "Описание не указано."}</p>
          <p className={styles.publishedAt}>Дата публикации: {createdDisplay}</p>
        </div>
      </div>
      <div className={styles.aside}>
        <span className={styles.tag}>{card.typeName}</span>
        <div className={styles.statusRow}>
          <span className={styles.statusDot} aria-hidden />
          <span className={styles.statusText}>{card.statusName}</span>
        </div>
        <p className={styles.createdAt}>Создано: {createdDisplay}</p>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={(event) => {
            event.stopPropagation();
            handleOpenDetails();
          }}
        >
          Подробнее
        </button>
      </div>
    </article>
  );
};

export default SearchResultCard;
