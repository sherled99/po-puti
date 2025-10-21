import React from "react";
import styles from "./HeroSection.module.css";
import background from "../../img/heroSection.jpg";
import SearchForm from "../SearchForm/SearchForm";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Попутчик рядом: найдём того, кто доставит вашу посылку!</h1>
        <SearchForm variant="hero" />
      </div>
    </section>
  );
};

export default HeroSection;
