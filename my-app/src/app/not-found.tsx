import Link from "next/link";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorTitle}>Oops! Page not found</h2>
      <p className={styles.errorMessage}>
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link href="/" className={styles.backHomeBtn}>
        Back to Home
      </Link>
    </div>
  );
}