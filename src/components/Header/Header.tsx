"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoDark}>Travel</span>
          <span className={styles.logoLight}>Trucks</span>
        </Link>

        <nav className={styles.nav}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
          <Link 
            href="/catalog" 
            className={`${styles.navLink} ${pathname.startsWith("/catalog") ? styles.active : ""}`}
          >
            Catalog
          </Link>
        </nav>

        <div className={styles.placeholder}></div>
      </div>
    </header>
  );
}