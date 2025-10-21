import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import styles from "./SearchForm.module.css";

export type TripTab = "send" | "receive";

interface RangeItem {
  startDate: Date;
  endDate: Date;
  key: string;
}

export interface SearchFormValues {
  tripType: TripTab;
  fromCity: string;
  toCity: string;
  dateFrom: Date;
  dateTo: Date;
  packageSize: string;
}

export interface SearchFormProps {
  variant?: "default" | "hero";
  className?: string;
  initialValues?: Partial<SearchFormValues>;
  onSearch?: (values: SearchFormValues) => void;
}

const cities = ["Баку", "Белград", "Ереван", "Санкт-Петербург", "Тбилиси"];
const packageTypes = ["Документы", "Посылка XS", "Посылка S", "Посылка M", "Посылка L"];

const tabs: Array<{ value: TripTab; label: string }> = [
  { value: "send", label: "Отправить посылку" },
  { value: "receive", label: "Отвезти посылку" },
];

function formatRangeLabel(start: Date, end: Date) {
  return `${format(start, "d MMM, EEE", { locale: ruLocale })} — ${format(end, "d MMM, EEE", {
    locale: ruLocale,
  })}`;
}

const SearchForm: React.FC<SearchFormProps> = ({
  variant = "default",
  className,
  initialValues,
  onSearch,
}) => {
  const [tripType, setTripType] = useState<TripTab>(initialValues?.tripType ?? "send");
  const [fromCity, setFromCity] = useState<string>(initialValues?.fromCity ?? "Баку");
  const [toCity, setToCity] = useState<string>(initialValues?.toCity ?? "Белград");
  const [packageSize, setPackageSize] = useState<string>(initialValues?.packageSize ?? "Посылка XS");
  const [range, setRange] = useState<RangeItem[]>(() => {
    const start = initialValues?.dateFrom ?? new Date();
    const maybeEnd = initialValues?.dateTo ?? start;
    const end = maybeEnd >= start ? maybeEnd : start;
    return [{ startDate: start, endDate: end, key: "selection" }];
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const handleDateChange = (item: { selection: RangeItem }) => {
    const updated = item.selection;
    setRange([updated]);
    if (updated.endDate >= updated.startDate) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    if (!initialValues) {
      return;
    }

    if (initialValues.tripType) {
      setTripType(initialValues.tripType);
    }
    if (initialValues.fromCity) {
      setFromCity(initialValues.fromCity);
    }
    if (initialValues.toCity) {
      setToCity(initialValues.toCity);
    }
    if (initialValues.packageSize) {
      setPackageSize(initialValues.packageSize);
    }
    if (initialValues.dateFrom || initialValues.dateTo) {
      setRange((prev) => {
        const current = prev[0] ?? { startDate: new Date(), endDate: new Date(), key: "selection" };
        const start = initialValues.dateFrom ?? current.startDate;
        let endCandidate = initialValues.dateTo ?? current.endDate;
        if (endCandidate < start) {
          endCandidate = start;
        }
        return [{ startDate: start, endDate: endCandidate, key: "selection" }];
      });
    }
  }, [initialValues]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentRange = range[0];
    if (!currentRange) {
      return;
    }
    onSearch?.({
      tripType,
      fromCity,
      toCity,
      packageSize,
      dateFrom: currentRange.startDate,
      dateTo: currentRange.endDate,
    });
    setShowCalendar(false);
  };

  const wrapperClassName = [
    styles.wrapper,
    variant === "hero" ? styles.heroVariant : styles.defaultVariant,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldVariantClass = variant === "hero" ? styles.fieldHero : styles.fieldDefault;
  const tabVariantClass = variant === "hero" ? styles.tabHero : styles.tabDefault;

  return (
    <div className={wrapperClassName}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={[styles.tab, tabVariantClass, tripType === tab.value ? styles.tabActive : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setTripType(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <select
          className={[styles.field, fieldVariantClass].join(" ")}
          value={fromCity}
          onChange={(event) => setFromCity(event.target.value)}
        >
          <option value="" disabled>
            Откуда
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          className={[styles.field, fieldVariantClass].join(" ")}
          value={toCity}
          onChange={(event) => setToCity(event.target.value)}
        >
          <option value="" disabled>
            Куда
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <div className={styles.datePickerWrapper} ref={calendarRef}>
          <button
            type="button"
            className={[styles.field, styles.datePicker, fieldVariantClass].join(" ")}
            onClick={() => setShowCalendar((prev) => !prev)}
          >
            {formatRangeLabel(range[0].startDate, range[0].endDate)}
          </button>
          {showCalendar && (
            <div className={styles.calendarDropdown}>
              <DateRange
                ranges={range}
                onChange={handleDateChange}
                locale={ruLocale}
                showSelectionPreview
                moveRangeOnFirstSelection={false}
                months={1}
                direction="horizontal"
                rangeColors={["#ffc947"]}
              />
            </div>
          )}
        </div>
        <select
          className={[styles.field, styles.select, fieldVariantClass].join(" ")}
          value={packageSize}
          onChange={(event) => setPackageSize(event.target.value)}
        >
          <option value="" disabled>
            Размер посылки
          </option>
          {packageTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.searchBtn}>
          Найти попутчика
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
