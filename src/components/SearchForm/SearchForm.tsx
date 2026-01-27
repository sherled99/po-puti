import React, { useEffect, useMemo, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { ru as ruLocale } from "date-fns/locale";
import styles from "./SearchForm.module.css";
import { getPackageTypes } from "../../utils/api";
import type { IPackageType } from "../../services/types/data";
import { useCitiesOptions } from "../../hooks/useCitiesOptions";
import CityCombo from "../CityCombo/CityCombo";

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
  packageId: string;
  packageName: string;
}

export interface SearchFormProps {
  variant?: "default" | "hero";
  className?: string;
  initialValues?: Partial<SearchFormValues>;
  onSearch?: (values: SearchFormValues) => void;
}

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
  const [fromCity, setFromCity] = useState<string>(initialValues?.fromCity ?? "");
  const [toCity, setToCity] = useState<string>(initialValues?.toCity ?? "");
  const [selectedPackageId, setSelectedPackageId] = useState<string>(initialValues?.packageId ?? "");
  const [packageOptions, setPackageOptions] = useState<IPackageType[]>([]);
  const [range, setRange] = useState<RangeItem[]>(() => {
    const start = initialValues?.dateFrom ?? new Date();
    const maybeEnd = initialValues?.dateTo ?? start;
    const end = maybeEnd >= start ? maybeEnd : start;
    return [{ startDate: start, endDate: end, key: "selection" }];
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { cities: cityOptions, loading: citiesLoading, error: citiesError } = useCitiesOptions();
  const limitedCities = useMemo(() => {
    return cityOptions;
  }, [cityOptions]);

  useEffect(() => {
    let cancelled = false;

    const loadPackages = async () => {
      try {
        const packages = await getPackageTypes();
        if (cancelled) {
          return;
        }
        setPackageOptions(packages);
        setSelectedPackageId((current) => {
          if (current && packages.some((option) => option.id === current)) {
            return current;
          }
          if (initialValues?.packageId && packages.some((option) => option.id === initialValues.packageId)) {
            return initialValues.packageId;
          }
          return packages[0]?.id ?? "";
        });
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load package types", error);
        }
      }
    };

    loadPackages();

    return () => {
      cancelled = true;
    };
  }, [initialValues]);

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
    if (updated.endDate > updated.startDate) {
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
    if (initialValues.packageId) {
      setSelectedPackageId(initialValues.packageId);
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
    const matchedPackage =
      packageOptions.find((option) => option.id === selectedPackageId) || packageOptions[0];
    if (!matchedPackage) {
      return;
    }
    onSearch?.({
      tripType,
      fromCity,
      toCity,
      packageId: matchedPackage.id,
      packageName: matchedPackage.name,
      dateFrom: currentRange.startDate,
      dateTo: currentRange.endDate,
    });
    setSelectedPackageId(matchedPackage.id);
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
        <CityCombo
          value={fromCity}
          onChange={setFromCity}
          placeholder="Откуда"
          options={limitedCities}
          loading={citiesLoading}
          className={styles.comboWrapper}
          inputClassName={[styles.field, styles.comboInput, fieldVariantClass].join(" ")}
          dropdownMaxItems={8}
        />
        <CityCombo
          value={toCity}
          onChange={setToCity}
          placeholder="Куда"
          options={limitedCities}
          loading={citiesLoading}
          className={styles.comboWrapper}
          inputClassName={[styles.field, styles.comboInput, fieldVariantClass].join(" ")}
          dropdownMaxItems={8}
        />
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
          value={selectedPackageId}
          onChange={(event) => setSelectedPackageId(event.target.value)}
          disabled={packageOptions.length === 0}
        >
          <option value="" disabled>
            Размер посылки
          </option>
          {packageOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.searchBtn}>
          Найти попутчика
        </button>
      </form>
      {citiesError && <p className={styles.citiesMessage}>{citiesError}</p>}
    </div>
  );
};

export default SearchForm;
