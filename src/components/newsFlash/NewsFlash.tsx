import React from "react";
import styles from "./NewsFlash.module.css";

interface Props {
  item: any;
  newsFlashClicked: (id: number) => void;
  descritpion?: boolean;
}

const NewsFlash = (props: Props) => {
  const item = props.item;

  function newsFlashClicked() {
    props.newsFlashClicked(item.id);
  }

  return (
    <div className={styles.newsFlashContainer} onClick={newsFlashClicked}>
      <div className={styles.newsFlashSource}>{item.source}</div>
      <div className={styles.newsFlashContent}>
        <div className={styles.date}>{item.date}</div>
        <div
          className={
            props.descritpion
              ? styles.newsFlashTitle
              : styles.newsFlashNoDescription
          }
        >
          {item.title}
        </div>
        {props.descritpion && (
          <div className={styles.description}>{item.description}</div>
        )}
      </div>
    </div>
  );
};

export default NewsFlash;
