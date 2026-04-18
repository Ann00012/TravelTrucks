"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.errorHeading}>Something went wrong!</h2>
      <p className={styles.errorSubtext}>We encountered an unexpected error while loading the data.</p>
      <div className={styles.buttonGroup}>
        <button className={styles.tryAgainBtn} onClick={() => reset()}>
          Try again
        </button>
        <button className={styles.homeLink} onClick={() => (window.location.href = "/")}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
}