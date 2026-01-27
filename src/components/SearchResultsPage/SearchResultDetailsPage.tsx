import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { ru as ruLocale } from "date-fns/locale";
import styles from "./SearchResultDetailsPage.module.css";
import Footer from "../Footer/Footer";
import { createReview, getCardById, getReviewsByUser, getUserById } from "../../utils/api";
import type { ICreateReviewRequest, IReview, ISearchCard, IUser } from "../../services/types/data";
import type { RootState } from "../../services/types";

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
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.profile?.id);
  const stateCard = (location.state as { card?: ISearchCard } | undefined)?.card ?? null;
  const [card, setCard] = useState<ISearchCard | null>(stateCard);
  const [loading, setLoading] = useState(!stateCard);
  const [error, setError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(() => stateCard?.image ?? stateCard?.createdByImage ?? null);
  const [author, setAuthor] = useState<IUser | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

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

  useEffect(() => {
    let cancelled = false;
    if ((!token && !card?.createdByImage) || !card?.createdById) {
      return;
    }
    if (!token) {
      return;
    }
    getUserById(card.createdById, token)
      .then((user) => {
        if (!cancelled) {
          setAuthor(user);
          if (!avatar && user.image) {
            setAvatar(user.image);
          }
        }
      })
      .catch(() => {
        /* ignore */
      });
    return () => {
      cancelled = true;
    };
  }, [avatar, card?.createdById, token]);

  useEffect(() => {
    let cancelled = false;
    if (!card?.createdById) return;
    setReviewsLoading(true);
    setReviewsError(null);
    getReviewsByUser(card.createdById, token)
      .then((list) => {
        if (!cancelled) {
          setReviews(list);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to load reviews", err);
          setReviewsError("Не удалось загрузить отзывы");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setReviewsLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [card?.createdById, token]);

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

  const renderStars = (count: number) =>
    Array.from({ length: 5 }, (_, idx) => (
      <span
        key={idx}
        className={`${styles.starIcon} ${idx < count ? styles.starIconActive : ""}`}
        aria-hidden="true"
      >
        ★
      </span>
    ));

  const formatReviewDate = (review: IReview) => {
    const value =
      review.createdOnUtc ||
      (review as { createdAtUtc?: string }).createdAtUtc ||
      (review as { createdAt?: string }).createdAt ||
      (review as { createdOn?: string }).createdOn;
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return format(date, "d MMM yyyy", { locale: ruLocale });
  };

  const renderReviewAuthor = (review: IReview) =>
    review.reviewerName || review.reviewerContact || "Аноним";

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
            {avatar ? (
              <img src={`data:image/*;base64,${avatar}`} alt="" className={styles.detailAvatar} />
            ) : (
              <div className={styles.placeholderAvatar} aria-hidden>
                {initials}
              </div>
            )}
            <div className={styles.sidebarContent}>
              <h2 className={styles.rewardTitle}>{card.typeName}</h2>
              <div className={styles.statusRow}>
                <span className={styles.statusIcon} aria-hidden />
                <span>{card.statusName}</span>
              </div>
              <p className={styles.metaLine}>Создано: {createdDisplay}</p>
              <p className={styles.metaLine}>Способ связи: {author?.contactInfo || "Не указан"}</p>
              <button type="button" className={styles.actionButton} onClick={() => setIsReviewModalOpen(true)}>
                Оставить отзыв
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
              </div>
              {reviewsLoading && <p className={styles.reviewNote}>Загружаем отзывы…</p>}
              {reviewsError && <p className={`${styles.reviewNote} ${styles.reviewError}`}>{reviewsError}</p>}
              <ul className={styles.reviewsList}>
                {reviews.length === 0 && !reviewsLoading ? (
                  <li className={styles.reviewItem}>Пока отзывов нет</li>
                ) : (
                  reviews.map((review) => (
                    <li key={review.id} className={styles.reviewItem}>
                      <div className={styles.reviewAuthorRow}>
                        <span className={styles.reviewAuthor}>{renderReviewAuthor(review)}</span>
                        <div className={styles.reviewRating}>{renderStars(review.score)}</div>
                      </div>
                      <p className={styles.reviewText}>{review.text}</p>
                      <span className={styles.reviewDate}>{formatReviewDate(review)}</span>
                    </li>
                  ))
                )}
              </ul>
            </article>
          </section>
        </div>
      </div>

      {isReviewModalOpen && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Оставить отзыв</h3>
              <button
                type="button"
                className={styles.modalClose}
                aria-label="Закрыть"
                onClick={() => setIsReviewModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form
              className={styles.modalForm}
              onSubmit={(e) => {
                e.preventDefault();
                if (!token || !author?.id) {
                  setReviewStatus("Нужно войти, чтобы оставить отзыв.");
                  return;
                }
                if (userId && author.id === userId) {
                  setReviewStatus("Нельзя оставлять отзыв самому себе.");
                  return;
                }
                const payload: ICreateReviewRequest = {
                  revieweeId: author.id,
                  score: reviewRating,
                  text: reviewText.trim(),
                };
                createReview(payload, token)
                  .then(() => {
                    setReviewStatus("Отзыв отправлен.");
                    setIsReviewModalOpen(false);
                    setReviewText("");
                    return getReviewsByUser(author.id, token);
                  })
                  .then((list) => setReviews(list))
                  .catch((err) => {
                    const message =
                      err instanceof Error && err.message.includes("409")
                        ? "Вы уже оставили отзыв этому пользователю."
                        : err instanceof Error
                        ? err.message
                        : "Не удалось отправить отзыв.";
                    setReviewStatus(message);
                  });
              }}
            >
              <label className={styles.modalField}>
                <span className={styles.modalLabel}>Оценка</span>
                <div className={styles.starsPicker}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.starButton} ${reviewRating >= star ? styles.starButtonActive : ""}`}
                      onClick={() => setReviewRating(star)}
                      aria-label={`Поставить ${star} звезд`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </label>
              <label className={styles.modalField}>
                <span className={styles.modalLabel}>Комментарий</span>
                <textarea
                  className={styles.modalTextarea}
                  value={reviewText}
                  maxLength={500}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Опишите, как прошла доставка или общение"
                />
              </label>
              {reviewStatus && <p className={styles.modalNote}>{reviewStatus}</p>}
              <div className={styles.modalActions}>
                <button type="button" className={styles.modalSecondary} onClick={() => setIsReviewModalOpen(false)}>
                  Отмена
                </button>
                <button type="submit" className={styles.modalPrimary}>
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default SearchResultDetailsPage;
