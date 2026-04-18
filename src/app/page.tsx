import Image from "next/image";
import Link from "next/link"; 
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <Image
          src="/hero.jpg" 
          alt="Camper van near a lake at sunset"
          fill
          priority 
          className={styles.bgImage}
        />
        
        <div className={styles.overlay}></div>

        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Campers of your dreams</h1>
            <p className={styles.subtitle}>
              You can find everything you want in our catalog
            </p>
            <Link href="/catalog" className={styles.button}>
              View Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
