import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { AppDispatch, RootState } from "../../services/types";
import { fetchCurrentUser, updateCurrentUser } from "../../services/actions/user";
import { IUpdateUserRequest } from "../../services/types/data";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, token, email, profile, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [sex, setSex] = useState<boolean | null>(null);
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login", { state: { backgroundLocation: location } });
    }
  }, [isAuthenticated, token, navigate, location]);

  useEffect(() => {
    if (token && !profile && !loading) {
      dispatch(fetchCurrentUser() as any).catch(() => {
        /* error already in store */
      });
    }
  }, [token, profile, loading, dispatch]);

  useEffect(() => {
    setFirstName(profile?.firstName ?? "");
    setLastName(profile?.lastName ?? "");
    setCity(profile?.city ?? "");
    setPhone(profile?.phone ?? "");
    setContactInfo(profile?.contactInfo ?? "");
    setSex(profile?.sex ?? null);
    setAvatarBase64(null);
    setAvatarPreview(profile?.image ? `data:image/*;base64,${profile.image}` : null);
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;

    setLocalError(null);
    setStatusMessage(null);
    setSaving(true);

    const normalize = (value: string) => value.trim() || undefined;

    const payload: IUpdateUserRequest = {
      firstName: normalize(firstName),
      lastName: normalize(lastName),
      city: normalize(city),
      phone: normalize(phone),
      contactInfo: normalize(contactInfo),
      sex,
      image: avatarBase64 ?? undefined,
    };

    try {
      await dispatch(updateCurrentUser(payload) as any);
      setStatusMessage("Сохранено. Профиль обновлён.");
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError("Не удалось сохранить профиль.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleRefresh = () => {
    if (token) {
      dispatch(fetchCurrentUser() as any).catch(() => {
        /* handled in store */
      });
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      const pureBase64 = result.split(",")[1] ?? result;
      setAvatarBase64(pureBase64);
    };
    reader.readAsDataURL(file);
  };

  const initials =
    (firstName?.[0] || profile?.firstName?.[0] || "") + (lastName?.[0] || profile?.lastName?.[0] || "");

  const displayName =
    profile?.firstName || profile?.lastName
      ? `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim()
      : profile?.email ?? "Ваш профиль";

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>Главная / Профиль</div>
      <div className={styles.titleRow}>
        <div className={styles.titleBlock}>
          <p>Мой аккаунт</p>
          <h1>{displayName || "Ваш профиль"}</h1>
          <p>Обновите контактные данные, чтобы с вами было проще связаться.</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Основные данные</h3>
          <div className={styles.avatarSection}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Аватар" className={styles.avatarPreview} />
            ) : (
              <div className={styles.avatarFallback}>{initials || "👤"}</div>
            )}
            <div className={styles.avatarControls}>
              <span className={styles.uploadLabel}>Фотография профиля</span>
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
              <p className={styles.uploadHint}>PNG/JPG, до 2 МБ. Изображение сохраняется в base64.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.twoCols}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="firstName">
                  Имя
                </label>
                <input
                  id="firstName"
                  className={styles.input}
                  placeholder="Иван"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="lastName">
                  Фамилия
                </label>
                <input
                  id="lastName"
                  className={styles.input}
                  placeholder="Иванов"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Пол</label>
              <div className={styles.sexToggle}>
                <button
                  type="button"
                  className={`${styles.sexButton} ${sex === true ? styles.active : ""}`}
                  onClick={() => setSex(true)}
                >
                  Муж
                </button>
                <button
                  type="button"
                  className={`${styles.sexButton} ${sex === false ? styles.active : ""}`}
                  onClick={() => setSex(false)}
                >
                  Жен
                </button>
                <button
                  type="button"
                  className={`${styles.sexButton} ${sex === null ? styles.active : ""}`}
                  onClick={() => setSex(null)}
                >
                  Не указан
                </button>
              </div>
            </div>

            <div className={styles.twoCols}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="city">
                  Город
                </label>
                <input
                  id="city"
                  className={styles.input}
                  placeholder="Москва"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">
                  Телефон
                </label>
                <input
                  id="phone"
                  className={styles.input}
                  placeholder="+79991234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contactInfo">
                Как с вами связаться
              </label>
              <textarea
                id="contactInfo"
                className={styles.textarea}
                placeholder="Telegram @username, звонки, мессенджеры..."
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </div>

            {statusMessage && <div className={`${styles.message} ${styles.success}`}>{statusMessage}</div>}
            {(localError || error) && (
              <div className={`${styles.message} ${styles.error}`}>{localError || error}</div>
            )}

            <div className={styles.actions}>
              <button className={styles.primaryBtn} type="submit" disabled={saving}>
                {saving ? "Сохраняем..." : "Сохранить изменения"}
              </button>
              <button className={styles.textBtn} type="button" onClick={handleRefresh} disabled={loading}>
                Обновить из профиля
              </button>
            </div>
            <p className={styles.note}>Мы используем эти данные только для связи между отправителем и курьером.</p>
          </form>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Статус и контакты</h3>
          <div className={styles.infoCard}>
            <div className={styles.pill}>Email: {email || "—"}</div>
            <div className={styles.pill}>
              Телефон: {phone || profile?.phone || "не указан"}
              {profile?.isApprovedPhone ? " (подтверждён)" : ""}
            </div>
            <div className={styles.pill}>Город: {city || profile?.city || "—"}</div>
            <div className={styles.stat}>
              <span>Рейтинг</span>
              <span>{profile?.rate ?? "—"}</span>
            </div>
            <div className={styles.pill}>ID: {profile?.id ?? "—"}</div>
            <div className={styles.pill}>
              Создано: {profile?.createdAtUtc ? new Date(profile.createdAtUtc).toLocaleDateString() : "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
