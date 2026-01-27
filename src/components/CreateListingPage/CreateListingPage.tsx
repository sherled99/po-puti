import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import styles from "./CreateListingPage.module.css";
import { createCard, getCardStatuses, getPackageTypes } from "../../utils/api";
import type { ICardStatus, ICreateCardRequest, IPackageType } from "../../services/types/data";
import type { AppDispatch, RootState } from "../../services/types";
import { fetchCurrentUser } from "../../services/actions/user";
import { useCitiesOptions } from "../../hooks/useCitiesOptions";
import CityCombo from "../CityCombo/CityCombo";

type ListingTab = "send" | "deliver";

type FormState = {
  name: string;
  from: string;
  to: string;
  date: string;
  packageId: string;
  description: string;
  reward: string;
  contact: string;
};

const TRIP_TYPE_TO_ID: Record<ListingTab, string> = {
  send: "f0a23ff5-9b42-4d3d-9c5d-57f075444efb",
  deliver: "2b1790e0-7cf0-4f96-9e19-7b0f395464a6",
};

const DEFAULT_STATUS_ID = "2c7de8a4-0be6-4d9d-bfa4-5bdcf0584d29";

const tabs: Array<{ key: ListingTab; label: string }> = [
  { key: "send", label: "Отправить посылку" },
  { key: "deliver", label: "Отвезти посылку" },
];

const tabCopy: Record<
  ListingTab,
  {
    descriptionLabel: string;
    descriptionPlaceholder: string;
    rewardPlaceholder: string;
    contactNote: string;
    helper: string;
  }
> = {
  send: {
    descriptionLabel: "Описание вашего объявления",
    descriptionPlaceholder:
      "Опишите, что вы хотите отправить, как выглядит посылка и когда готовы передать её курьеру. Чем подробнее, тем легче будет найти попутчика.",
    rewardPlaceholder: "Выберите вознаграждение или напишите свой вариант",
    contactNote: "Контакт увидит только исполнитель после подтверждения сделки.",
    helper: "Поделитесь деталями: что внутри, нужна ли особая упаковка или температурный режим.",
  },
  deliver: {
    descriptionLabel: "Расскажите о поездке",
    descriptionPlaceholder:
      "Когда и откуда вы готовы выехать, какой багаж возьмёте, есть ли ограничения по весу и объёму.",
    rewardPlaceholder: "Укажите сумму или формат благодарности от отправителя",
    contactNote: "Контакт передастся только после подтверждения обеими сторонами.",
    helper: "Чем подробнее маршрут, тем быстрее найдутся подходящие заявки.",
  },
};

const initialForms: Record<ListingTab, FormState> = {
  send: { name: "", from: "", to: "", date: "", packageId: "", description: "", reward: "", contact: "" },
  deliver: { name: "", from: "", to: "", date: "", packageId: "", description: "", reward: "", contact: "" },
};

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const toIsoDate = (value: string): string | null => {
  if (!value) return null;
  if (ISO_DATE_REGEX.test(value)) return value;
  const digits = value.replace(/\D/g, "");
  if (digits.length === 8) {
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4);
    return `${year}-${month}-${day}`;
  }
  const parts = value.split(".");
  if (parts.length === 3) {
    const day = parts[0]?.padStart(2, "0") ?? "";
    const month = parts[1]?.padStart(2, "0") ?? "";
    const year = (parts[2]?.padStart(4, "0") ?? "").padStart(4, "0");
    if (year && month && day) {
      return `${year}-${month}-${day}`;
    }
  }
  return null;
};

const formatDateForInput = (value: string): string => {
  const iso = toIsoDate(value);
  if (!iso) return value;
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
};

const ArrowDownIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="m5.5 7.5 4.5 5 4.5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token, profile, userId } = useSelector((state: RootState) => state.user);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<ListingTab>("send");
  const [forms, setForms] = useState<Record<ListingTab, FormState>>(initialForms);
  const [packageOptions, setPackageOptions] = useState<IPackageType[]>([]);
  const [statusOptions, setStatusOptions] = useState<ICardStatus[]>([]);
  const [optionsError, setOptionsError] = useState<string | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { cities: cityOptions, loading: citiesLoading, error: citiesError } = useCitiesOptions();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  const currentForm = forms[activeTab];
  const currentCopy = tabCopy[activeTab];
  const charsLeft = 500 - currentForm.description.length;

  const stepStatuses = useMemo(
    () => [
      { label: "Название", done: Boolean(currentForm.name.trim()) },
      { label: "Откуда", done: Boolean(currentForm.from.trim()) },
      { label: "Куда", done: Boolean(currentForm.to.trim()) },
      { label: "Когда", done: Boolean(currentForm.date.trim()) },
      { label: "Размер", done: Boolean(currentForm.packageId.trim()) },
      { label: "Описание", done: Boolean(currentForm.description.trim()) },
      { label: "Контакты", done: Boolean(currentForm.contact.trim()) },
    ],
    [currentForm]
  );

  const completedCount = useMemo(
    () => stepStatuses.filter((step) => step.done).length,
    [stepStatuses]
  );

  const activeStepIndex = useMemo(() => {
    const firstIncomplete = stepStatuses.findIndex((step) => !step.done);
    return firstIncomplete === -1 ? stepStatuses.length - 1 : firstIncomplete;
  }, [stepStatuses]);

  const selectedStatusId = useMemo(() => {
    if (statusOptions.length === 0) {
      return DEFAULT_STATUS_ID;
    }
    const fallback = statusOptions.find((item) => item.id === DEFAULT_STATUS_ID);
    return fallback?.id ?? statusOptions[0].id;
  }, [statusOptions]);

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value } = event.target;
        setStatusMessage(null);
        setError(null);
        setForms((prev) => ({
          ...prev,
          [activeTab]: {
            ...prev[activeTab],
            [field]: value,
          },
        }));
      },
    [activeTab]
  );

  const handleCityChange = useCallback(
    (field: "from" | "to") => (value: string) => {
      setStatusMessage(null);
      setError(null);
      setForms((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          [field]: value,
        },
      }));
    },
    [activeTab]
  );

  const handleDateChange = useCallback(
    (value: string) => {
      setStatusMessage(null);
      setError(null);
      const iso = toIsoDate(value);
      setForms((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          date: iso ?? value,
        },
      }));
    },
    [activeTab]
  );

  const openCalendar = useCallback(() => {
    const node = dateInputRef.current;
    if (!node) return;
    if (typeof node.showPicker === "function") {
      node.showPicker();
    } else {
      node.focus();
      node.click();
    }
  }, []);

  useEffect(() => {
    if (token && !profile && !userId) {
      dispatch(fetchCurrentUser()).catch(() => {
        /* ignore; message handled on submit */
      });
    }
  }, [dispatch, profile, token, userId]);

  useEffect(() => {
    let cancelled = false;
    const loadOptions = async () => {
      setLoadingOptions(true);
      setOptionsError(null);
      try {
        const [packages, statuses] = await Promise.all([
          getPackageTypes(),
          getCardStatuses(),
        ]);
        if (cancelled) return;
        setPackageOptions(packages);
        setStatusOptions(statuses);
        setForms((prev) => {
          const firstPackage = packages[0]?.id || "";
          return {
            send: { ...prev.send, packageId: prev.send.packageId || firstPackage },
            deliver: { ...prev.deliver, packageId: prev.deliver.packageId || firstPackage },
          };
        });
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load options", err);
          setOptionsError("Не удалось загрузить данные для формы. Попробуйте обновить страницу.");
        }
      } finally {
        if (!cancelled) {
          setLoadingOptions(false);
        }
      }
    };

    loadOptions();
    return () => {
      cancelled = true;
    };
  }, []);

  const limitedCities = useMemo(() => {
    return cityOptions;
  }, [cityOptions]);

  const validateForm = (): string | null => {
    if (!token) {
      return "Авторизуйтесь, чтобы публиковать объявления.";
    }
    if (!(userId || profile?.id)) {
      return "Не удалось определить пользователя. Перезайдите или откройте профиль.";
    }
    if (!currentForm.name.trim()) return "Добавьте название объявления.";
    if (!currentForm.from.trim()) return "Укажите город отправления.";
    if (!currentForm.to.trim()) return "Укажите город назначения.";
    const isoDate = toIsoDate(currentForm.date);
    if (!isoDate) return "Выберите дату прибытия.";
    if (!currentForm.packageId) return "Выберите размер/тип посылки.";
    if (!currentForm.description.trim()) return "Добавьте описание.";
    if (!currentForm.contact.trim()) return "Оставьте способ связи.";
    if (Number.isNaN(Date.parse(isoDate))) return "Некорректная дата.";
    return null;
  };

  const buildDescription = () => {
    const parts = [
      currentForm.description.trim(),
      currentForm.reward.trim() ? `Вознаграждение: ${currentForm.reward.trim()}` : "",
      currentForm.contact.trim() ? `Связь: ${currentForm.contact.trim()}` : "",
    ].filter(Boolean);
    return parts.join("\n\n");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const createdById = userId || profile?.id;
    const isoDate = toIsoDate(currentForm.date);
    if (!isoDate || Number.isNaN(Date.parse(isoDate))) {
      setError("Некорректная дата.");
      return;
    }
    const time = new Date(isoDate);
    const typeId = TRIP_TYPE_TO_ID[activeTab];
    const name =
      currentForm.name.trim() ||
      (activeTab === "send" ? "Отправка посылки" : "Отвезу посылку");

    const payload: ICreateCardRequest = {
      name,
      createdById: createdById as string,
      cityTo: currentForm.to.trim(),
      cityFrom: currentForm.from.trim(),
      timeArrivedUtc: time.toISOString(),
      description: buildDescription(),
      typeId,
      statusId: selectedStatusId,
      packageId: currentForm.packageId,
    };

    setSubmitting(true);
    try {
      const created = await createCard(payload, token || undefined);
      navigate(`/search/${created.id}`, { replace: true });
    } catch (err) {
      console.error("Failed to create card", err);
      setError("Не удалось отправить объявление. Проверьте данные и попробуйте снова.");
    } finally {
      setSubmitting(false);
    }
  };

  const packageLabel = (id: string) => packageOptions.find((item) => item.id === id)?.name ?? "Размер не выбран";

  return (
    <main className={styles.page}>
      <section className={styles.heroArea}>
        <div className={styles.container}>
          <button type="button" className={styles.backButton} onClick={handleBack}>
            <span className={styles.backIcon} aria-hidden="true" />
            <span>Назад</span>
          </button>
          <div className={styles.heading}>
            <h1 className={styles.title}>Создание объявления</h1>
            <p className={styles.subtitle}>
              Заполните ключевые шаги, чтобы найти попутчика или исполнителя. Данные отправляются на сервер по /api/cards.
            </p>
          </div>

          <div className={styles.layout}>
            <div className={styles.formCard}>
              <div className={styles.tabs}>
                {tabs.map((tab) => (
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

              <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Название</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder={activeTab === "send" ? "Отправка документов в Казань" : "Могу отвезти посылку в Питер"}
                    value={currentForm.name}
                    onChange={handleChange("name")}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Откуда нужно отправить</span>
                  <CityCombo
                    value={currentForm.from}
                    onChange={handleCityChange("from")}
                    placeholder="Откуда"
                    options={limitedCities}
                    loading={citiesLoading}
                    className={styles.comboWrapper}
                    inputClassName={`${styles.input} ${styles.comboInput}`}
                    dropdownMaxItems={8}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Куда нужно привезти</span>
                  <CityCombo
                    value={currentForm.to}
                    onChange={handleCityChange("to")}
                    placeholder="Куда"
                    options={limitedCities}
                    loading={citiesLoading}
                    className={styles.comboWrapper}
                    inputClassName={`${styles.input} ${styles.comboInput}`}
                    dropdownMaxItems={8}
                  />
                </label>
                {citiesLoading && <p className={styles.cityNote}>Загружаем города из CountriesNow…</p>}
                {citiesError && <p className={`${styles.cityNote} ${styles.cityNoteError}`}>{citiesError}</p>}

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Дата прибытия</span>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      className={`${styles.input} ${styles.dateDisplay}`}
                      placeholder="дд.мм.гггг"
                      value={formatDateForInput(currentForm.date)}
                      onChange={(event) => handleDateChange(event.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.dateCalendarButton}
                      onClick={openCalendar}
                      aria-label="Открыть календарь"
                    >
                      <span aria-hidden="true">📅</span>
                    </button>
                    <input
                      ref={dateInputRef}
                      type="date"
                      className={styles.dateHidden}
                      value={toIsoDate(currentForm.date) ?? ""}
                      onChange={(event) => handleDateChange(event.target.value)}
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                  </div>
                </label>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Выберите размер посылки</span>
                  <div className={styles.inputWrapper}>
                    <select
                      className={`${styles.input} ${styles.select}`}
                      value={currentForm.packageId}
                      onChange={handleChange("packageId")}
                      disabled={loadingOptions || packageOptions.length === 0}
                    >
                      <option value="" disabled>
                        {loadingOptions ? "Загрузка..." : "Не выбран"}
                      </option>
                      {packageOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <ArrowDownIcon />
                  </div>
                </label>

                <label className={styles.field}>
                  <div className={styles.fieldHeader}>
                    <span className={styles.fieldLabel}>{currentCopy.descriptionLabel}</span>
                    <span className={styles.counter}>{charsLeft} / 500</span>
                  </div>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    maxLength={500}
                    placeholder={currentCopy.descriptionPlaceholder}
                    value={currentForm.description}
                    onChange={handleChange("description")}
                  />
                  <p className={styles.helper}>{currentCopy.helper}</p>
                </label>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>{currentCopy.rewardPlaceholder}</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Например: 2000 ₽ или сувенир"
                    value={currentForm.reward}
                    onChange={handleChange("reward")}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Способ связи</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="E-mail, Telegram или WhatsApp"
                    value={currentForm.contact}
                    onChange={handleChange("contact")}
                  />
                </label>

                {optionsError && <div className={styles.status}>{optionsError}</div>}
                {error && <div className={styles.status}>{error}</div>}
                {statusMessage && <div className={styles.status}>{statusMessage}</div>}

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => setStatusMessage("Черновик сохранён локально.")}
                  >
                    Сохранить как черновик
                  </button>
                  <button type="submit" className={styles.primaryButton} disabled={submitting || loadingOptions}>
                    {submitting ? "Публикуем..." : "Опубликовать"}
                  </button>
                </div>
              </form>
            </div>

            <aside className={styles.timeline}>
              <div className={styles.timelineHeader}>
                <span className={styles.timelineLabel}>Шаги</span>
                <span className={styles.timelineStatus}>
                  {completedCount}/{stepStatuses.length} заполнено
                </span>
              </div>
              <ul className={styles.stepList}>
                {stepStatuses.map((step, index) => {
                  const isDone = step.done;
                  const isActive = index === activeStepIndex && !isDone;
                  return (
                    <li key={step.label} className={styles.step}>
                      <span
                        className={`${styles.stepMarker} ${isDone ? styles.stepDone : ""} ${
                          isActive ? styles.stepActive : ""
                        }`}
                        aria-hidden="true"
                      />
                      <span className={styles.stepLabel}>{step.label}</span>
                      {index < stepStatuses.length - 1 && <span className={styles.stepLine} aria-hidden="true" />}
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CreateListingPage;
