import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./CityCombo.module.css";

interface CityComboProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: string[];
  loading?: boolean;
  className?: string;
  inputClassName?: string;
  dropdownMaxItems?: number;
}

const CityCombo: React.FC<CityComboProps> = ({
  value,
  onChange,
  placeholder = "",
  options,
  loading = false,
  className,
  inputClassName,
  dropdownMaxItems = 12,
}) => {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    const list = q ? options.filter((city) => city.toLowerCase().includes(q)) : options;
    return list.slice(0, dropdownMaxItems);
  }, [dropdownMaxItems, options, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
        setHoveredIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && ["ArrowDown", "ArrowUp"].includes(event.key)) {
      setOpen(true);
    }
    if (!filtered.length) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHoveredIndex((prev) => (prev + 1) % filtered.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHoveredIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
    } else if (event.key === "Enter") {
      if (hoveredIndex >= 0 && filtered[hoveredIndex]) {
        event.preventDefault();
        onChange(filtered[hoveredIndex]);
        setOpen(false);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleSelect = (city: string) => {
    onChange(city);
    setOpen(false);
  };

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")} ref={wrapperRef}>
      <input
        type="text"
        className={[styles.input, inputClassName].filter(Boolean).join(" ")}
        placeholder={loading ? "Загружаем города..." : placeholder}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setHoveredIndex(0);
        }}
        onFocus={() => {
          setOpen(true);
          setHoveredIndex(0);
        }}
        onKeyDown={handleKey}
        autoComplete="off"
      />
      <span className={styles.arrow} aria-hidden="true" />
      {open && filtered.length > 0 && (
        <ul className={styles.list} role="listbox">
          {filtered.map((city, index) => (
            <li
              key={city}
              className={`${styles.option} ${hoveredIndex === index ? styles.optionActive : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseDown={(event) => {
                event.preventDefault();
                handleSelect(city);
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityCombo;
