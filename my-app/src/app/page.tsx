import Image from "next/image";
import Link from "next/link"; // Додав Link для кнопки
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        {/* Фонове зображення */}
        <Image
          src="/hero.jpg" /* Заміни на шлях до твого зображення в папці public */
          alt="Camper van near a lake at sunset"
          fill /* Розтягує зображення на весь контейнер */
          priority /* Завантажує зображення першим, бо це головний екран */
          className={styles.bgImage}
        />
        
        {/* Темний оверлей для кращої читабельності тексту */}
        <div className={styles.overlay}></div>

        {/* Контент */}
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Campers of your dreams</h1>
            <p className={styles.subtitle}>
              You can find everything you want in our catalog
            </p>
            {/* Кнопка (використовуємо Link для переходу на сторінку каталогу) */}
            <Link href="/catalog" className={styles.button}>
              View Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
