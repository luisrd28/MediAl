import React from "react";
import styles from "./CustomCard.module.css"; // using CSS Modules

interface CustomCardProps {
  children: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card2}>
        {children}
      </div>
    </div>
  );
};

export default CustomCard;