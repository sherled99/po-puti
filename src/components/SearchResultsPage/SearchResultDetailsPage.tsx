import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import styles from "./SearchResultDetailsPage.module.css";
import Footer from "../Footer/Footer";
import { getCardById } from "../../utils/api";
import type { ISearchCard } from "../../services/types/data";

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    author: "Валерия",
    rating: 5,
    text: "Всё прошло хорошо, как договорились, посылка была передана в целости и сохранности. Рекомендую Александра!",
    date: "12 января",
  },
  {
    id: 2,
    author: "Михаил",
    rating: 5,
    text: "Всё прошло отлично, приехал вовремя, держал связь на протяжении всей поездки.",
    date: "12 января",
  },
  {
    id: 3,
    author: "Людмила",
    rating: 5,
    text: "Оперативно договорились, посылку передал лично получателю. Спасибо!",
    date: "12 января",
  },
];

function renderStars(count: number) {
  return Array.from({ length: count }, (_, index) => <span key={index} className={styles.star} />);
}

const SearchResultDetailsPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const stateCard = (location.state as { card?: ISearchCard } | undefined)?.card ?? null;
  const [card, setCard] = useState<ISearchCard | null>(stateCard);
  const [loading, setLoading] = useState(!stateCard);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (card || !id) {
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getCardById(id)
      .then((response) => {
        if (!cancelled) {
          setCard(response);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to load card details", err);
          setError("Не удалось загрузить информацию об объявлении.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [card, id]);

  const initials = useMemo(() => {
    if (!card) {
      return "";
    }
    const parts = card.name.trim().split(" ");
    if (parts.length === 0) {
      return "";
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }, [card]);

  const arrivalDisplay = useMemo(() => {
    if (!card) {
      return "";
    }
    return format(new Date(card.timeArrivedUtc), "d MMM yyyy, HH:mm", { locale: ruLocale });
  }, [card]);

  const createdDisplay = useMemo(() => {
    if (!card) {
      return "";
    }
    return format(new Date(card.createdOnUtc), "d MMM yyyy, HH:mm", { locale: ruLocale });
  }, [card]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.stateMessage}>Загружаем информацию…</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={`${styles.stateMessage} ${styles.stateError}`}>{error}</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!card) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>Мы не нашли такую карточку. Попробуйте выбрать другого попутчика.</div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <span>Главная</span>
          <span>—</span>
          <span>Поиск</span>
          <span>—</span>
          <span>Результат поиска</span>
          <span>—</span>
          <span className={styles.breadcrumbCurrent}>{card.name}</span>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebarCard}>
            <div className={styles.placeholderAvatar} aria-hidden>
              {initials}
            </div>
            <div className={styles.sidebarContent}>
              <h2 className={styles.rewardTitle}>{card.typeName}</h2>
              <div className={styles.statusRow}>
                <span className={styles.statusIcon} aria-hidden />
                <span>{card.statusName}</span>
              </div>
              <p className={styles.metaLine}>Создано: {createdDisplay}</p>
              <button type="button" className={styles.actionButton}>
                Связаться
              </button>
            </div>
          </aside>

          <section className={styles.contentColumn}>
            <article className={styles.profileCard}>
              <header className={styles.profileHeader}>
                <h1 className={styles.profileName}>{card.name}</h1>
                <ul className={styles.profileMeta}>
                  <li className={styles.profileMetaItem}>
                    <span className={`${styles.profileMetaIcon} ${styles.iconRoute}`} aria-hidden />
                    <span>
                      {card.cityFrom} — {card.cityTo}
                    </span>
                  </li>
                  <li className={styles.profileMetaItem}>
                    <span className={`${styles.profileMetaIcon} ${styles.iconCalendar}`} aria-hidden />
                    <span>Дата прибытия: {arrivalDisplay}</span>
                  </li>
                  <li className={styles.profileMetaItem}>
                    <span className={`${styles.profileMetaIcon} ${styles.iconPackage}`} aria-hidden />
                    <span>Размер посылки: {card.packageName}</span>
                  </li>
                </ul>
              </header>
              <p className={styles.description}>{card.description || "Описание не указано."}</p>
            </article>

            <article className={styles.reviewsCard}>
              <div className={styles.reviewsHeader}>
                <h2 className={styles.reviewsTitle}>Отзывы</h2>
                <button type="button" className={styles.reviewsLink}>
                  Посмотреть все
                </button>
              </div>
              <ul className={styles.reviewsList}>
                {mockReviews.map((review) => (
                  <li key={review.id} className={styles.reviewItem}>
                    <div className={styles.reviewAuthorRow}>
                      <span className={styles.reviewAuthor}>{review.author}</span>
                      <div className={styles.reviewRating}>{renderStars(review.rating)}</div>
                    </div>
                    <p className={styles.reviewText}>{review.text}</p>
                    <span className={styles.reviewDate}>{review.date}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default SearchResultDetailsPage;
