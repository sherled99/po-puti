import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";
import background from "../../img/heroSection.jpg";
import SearchForm, { SearchFormValues } from "../SearchForm/SearchForm";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (values: SearchFormValues) => {
    const { dateFrom, dateTo, ...rest } = values;

    navigate("/search", {
      state: {
        searchValues: {
          ...rest,
          dateFrom: dateFrom.toISOString(),
          dateTo: dateTo.toISOString(),
        },
      },
    });
  };

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Найди попутчика: отправляйся легко, быстро и безопасно!</h1>
        <SearchForm variant="hero" onSearch={handleSearch} />
      </div>
    </section>
  );
};

export default HeroSection;
