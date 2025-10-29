import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./SearchResultDetailsPage.module.css";
import Footer from "../Footer/Footer";
import { getSearchResultById } from "./mockResults";

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
  const numericId = Number(id);
  const profile = Number.isFinite(numericId) ? getSearchResultById(numericId) : undefined;

  const initials = useMemo(() => {
    if (!profile) {
      return "";
    }
    const parts = profile.name.trim().split(" ");
    if (parts.length === 0) {
      return "";
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }, [profile]);

  if (!profile) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>Мы не нашли такую карточку. Попробуйте выбрать другого попутчика.</div>
        </div>
        <Footer />
      </main>
    );
  }

  const ratingDisplay = profile.rating.toFixed(1).replace(".", ",");

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
          <span className={styles.breadcrumbCurrent}>{profile.name}</span>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebarCard}>
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className={styles.avatar} />
            ) : (
              <div className={styles.placeholderAvatar} aria-hidden>
                {initials}
              </div>
            )}
            <div className={styles.sidebarContent}>
              <h2 className={styles.rewardTitle}>{profile.reward}</h2>
              <div className={styles.statusRow}>
                <span className={styles.statusIcon} aria-hidden />
                <span>{profile.verified ? "Аккаунт подтвержден" : "Аккаунт не подтвержден"}</span>
              </div>
              <div className={styles.ratingRow}>
                <span className={styles.ratingValue}>Рейтинг {ratingDisplay}</span>
                <span>Отзывы ({profile.reviews})</span>
              </div>
              <button type="button" className={styles.actionButton}>
                Отправить запрос
              </button>
            </div>
          </aside>

          <section className={styles.contentColumn}>
            <article className={styles.profileCard}>
              <header className={styles.profileHeader}>
                <h1 className={styles.profileName}>{profile.name}</h1>
                <ul className={styles.profileMeta}>
                  <li className={styles.profileMetaItem}>
                    <span className={`${styles.profileMetaIcon} ${styles.iconRoute}`} aria-hidden />
                    <span>
                      {profile.fromCity} — {profile.toCity}
                    </span>
                  </li>
                  <li className={styles.profileMetaItem}>
                    <span className={`${styles.profileMetaIcon} ${styles.iconCalendar}`} aria-hidden />
                    <span>Дата отъезда: {profile.travelDates}</span>
                  </li>
                  <li className={styles.profileMetaItem}>
                    <span className={`${styles.profileMetaIcon} ${styles.iconPackage}`} aria-hidden />
                    <span>Размер посылки: {profile.packageSizes.join(", ")}</span>
                  </li>
                </ul>
              </header>
              <p className={styles.description}>{profile.description}</p>
              <p className={styles.warning}>ВНИМАНИЕ: не беру ничего хрупкого и бьющегося.</p>
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
