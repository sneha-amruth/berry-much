import styles from "./Collections.module.css";
import { Link } from "react-router-dom";
import CollectionImg1 from "../../assets/Collections/collections-img1.jpeg";
import CollectionImg2 from "../../assets/Collections/collections-img2.jpeg";
import CollectionImg3 from "../../assets/Collections/collections-img3.jpeg";
import CollectionImg4 from "../../assets/Collections/collections-img4.jpeg";

export default function Collections() {
  return (
    <>
      <div className={styles.collectionsContainer}>
        <div className={styles.card}>
          <img
            src={CollectionImg1}
            alt="skintype"
          />

          <Link to="/products">
            {" "}
            <span className={styles.badge}>Sensitive Skin </span>
          </Link>
        </div>
        <div className={styles.card}>
          <img
            src={CollectionImg2}
            alt="skintype"
          />
          <Link to="/products">
            {" "}
            <span className={styles.badge}>Oliy Skin</span>{" "}
          </Link>
        </div>
        <div className={styles.card}>
          <img
            src={CollectionImg3}
            alt="skintype"
          />
          <Link to="/products">
            {" "}
            <span className={styles.badge}>Combination Sky</span>{" "}
          </Link>
        </div>
        <div className={styles.card}>
          <img
            src={CollectionImg4}
            alt="skintype"
          />
          <Link to="/products">
            {" "}
            <span className={styles.badge}>Dry Skin</span>
          </Link>
        </div>
      </div>
    </>
  );
}
