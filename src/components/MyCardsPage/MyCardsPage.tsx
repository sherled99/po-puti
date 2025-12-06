import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./MyCardsPage.module.css";
import Footer from "../Footer/Footer";
import type { AppDispatch, RootState } from "../../services/types";
import { fetchCurrentUser } from "../../services/actions/user";
import { getMyActiveCards, getMyArchiveCards } from "../../utils/api";
import type { ISearchCard } from "../../services/types/data";
import megaphone from "../../img/megaphone.png";

type TabKey = "my" | "requests" | "reviews" | "archive";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "my", label: "Мои объявления" },
  { key: "requests", label: "Мои запросы" },
  { key: "reviews", label: "Мои отзывы" },
  { key: "archive", label: "Архив" },
];

const MyCardsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { profile, email, token } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState<TabKey>("my");
  const [activeCards, setActiveCards] = useState<ISearchCard[]>([]);
  const [archiveCards, setArchiveCards] = useState<ISearchCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const avatarUrl = profile?.image ? `data:image/*;base64,${profile.image}` : null;

  useEffect(() => {
    if (token && !profile) {
      dispatch(fetchCurrentUser()).catch(() => {
        /* handled elsewhere */
      });
    }
  }, [dispatch, profile, token]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!token) {
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const [actives, archived] = await Promise.all([getMyActiveCards(token), getMyArchiveCards(token)]);
        if (cancelled) return;
        setActiveCards(actives);
        setArchiveCards(archived);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load my cards", err);
          setError("Не удалось загрузить ваши карточки. Проверьте соединение или авторизацию.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const fullName =
    profile?.firstName || profile?.lastName
      ? `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim()
      : email || "Ваш профиль";

  const rating = profile?.rate ?? 0;
  const reviewsCount = 0; // нет API для отзывов
  const myCardsCount = activeCards.length;
  const requestsCount = 0; // нет API для откликов/запросов
  const archiveCount = archiveCards.length;

  const tabCounters: Record<TabKey, number | undefined> = useMemo(
    () => ({
      my: myCardsCount,
      requests: requestsCount,
      reviews: reviewsCount,
      archive: archiveCount,
    }),
    [archiveCount, myCardsCount, requestsCount, reviewsCount]
  );

  const tabsWithCount = tabs.map((tab) => {
    const count = tabCounters[tab.key];
    return {
      ...tab,
      label: count !== undefined ? `${tab.label} (${count})` : tab.label,
    };
  });

  const renderEmptyState = (title: string, subtitle: string, action?: { label: string; onClick: () => void }) => (
    <div className={styles.empty}>
      <img src={megaphone} alt="" className={styles.emptyIconImage} />
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptySubtitle}>{subtitle}</p>
      {action && (
        <button type="button" className={styles.primaryButton} onClick={action.onClick}>
          {action.label}
        </button>
      )}
      {error && <p className={styles.note}>{error}</p>}
      {!error && <p className={styles.note}>Используем /api/cards/my/active и /api/cards/my/archive.</p>}
    </div>
  );

  const renderCards = (cards: ISearchCard[]) => {
    if (cards.length === 0) {
      return renderEmptyState("Пока здесь нет объявлений", "Начните — разместите своё первое объявление", {
        label: "Разместить объявление",
        onClick: () => navigate("/create"),
      });
    }
    return (
      <div className={styles.cardList}>
        {cards.map((card) => (
          <article key={card.id} className={styles.cardItem}>
            <div className={styles.cardTop}>
              <div className={styles.cardUser}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className={styles.cardAvatar} />
                ) : (
                  <div className={styles.cardAvatarFallback}>👤</div>
                )}
                <div>
                  <h4 className={styles.cardTitle}>{card.name}</h4>
                  <p className={styles.cardDate}>{new Date(card.timeArrivedUtc).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={styles.cardBadge}>{card.packageName}</span>
            </div>
            <p className={styles.cardRoute}>
              {card.cityFrom} → {card.cityTo}
            </p>
            <p className={styles.cardDesc}>{card.description}</p>
          </article>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <div className={styles.stateText}>Загружаем ваши карточки...</div>;
    }
    switch (activeTab) {
      case "my":
        return renderCards(activeCards);
      case "requests":
        return renderEmptyState("Нет запросов", "У вас пока нет откликов или запросов");
      case "reviews":
        return renderEmptyState("Нет отзывов", "Когда появятся отзывы, мы покажем их здесь");
      case "archive":
        return renderCards(archiveCards);
      default:
        return null;
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.topBar}>
            <button type="button" className={styles.backButton} onClick={() => navigate("/")}>
              <span className={styles.backIcon} aria-hidden="true" />
              <span>На главную</span>
            </button>
          </div>

          <div className={styles.layout}>
            <aside className={styles.profileCard}>
              <div className={styles.avatar} aria-hidden="true" />
              <h2 className={styles.name}>{fullName}</h2>
              <div className={styles.rating}>
                <span>Рейтинг {rating.toFixed(1)}</span>
                <span className={styles.stars} aria-hidden="true">★★★★★</span>
              </div>
              <div className={styles.meta}>
                <span>Отзывов: {reviewsCount}</span>
              </div>
            </aside>

            <div className={styles.cardsArea}>
              <div className={styles.tabs}>
                {tabsWithCount.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    className={`${styles.tab} ${tab.key === activeTab ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className={styles.contentCard}>{renderContent()}</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default MyCardsPage;
