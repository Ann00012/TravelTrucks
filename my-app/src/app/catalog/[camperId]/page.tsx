"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchCamperById } from "@/services/campers";
import styles from "./camperDetails.module.css";

// Swiper (слайдер)
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Іконки
import { FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function CamperDetails() {
  const { camperId } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const { data: camper, isLoading, isError } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => fetchCamperById(camperId as string),
    enabled: !!camperId,
  });

  if (isLoading) return <div className={styles.loader}>Loading...</div>;
  if (isError || !camper) return <div className={styles.error}>Camper not found</div>;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        
        {/* --- ЛІВА КОЛОНКА: Галерея + Відгуки --- */}
        <section className={styles.leftColumn}>
          
          {/* Галерея зображень */}
          <div className={styles.galleryWrapper}>
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Navigation, Thumbs]}
              className={styles.mainSwiper}
            >
              {camper.gallery?.map((img: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className={styles.heroImage}>
                    <Image src={img.original} alt={camper.name} fill className={styles.img} priority />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView={4}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className={styles.thumbsSwiper}
            >
              {camper.gallery?.map((img: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className={styles.thumbImage}>
                    <Image src={img.thumb} alt="thumbnail" fill className={styles.img} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Блок Відгуків */}
          <div className={styles.reviewsWrapper}>
            <h2 className={styles.sectionTitle}>Reviews</h2>
            <div className={styles.reviewsList}>
              {camper.reviews?.map((rev: any, idx: number) => (
                <div key={idx} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>{rev.reviewer_name[0]}</div>
                    <div className={styles.reviewerMeta}>
                      <p className={styles.reviewerName}>{rev.reviewer_name}</p>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < rev.reviewer_rating ? styles.starYellow : styles.starGray} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewText}>{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- ПРАВА КОЛОНКА: Опис + Деталі + Форма --- */}
        <aside className={styles.rightColumn}>
          
          <div className={styles.infoBlock}>
            <h1 className={styles.name}>{camper.name}</h1>
            <div className={styles.metaRow}>
              <span className={styles.rating}><FaStar className={styles.starYellow} /> {camper.rating}({camper.totalReviews} Reviews)</span>
              <span className={styles.location}><FiMapPin /> {camper.location}</span>
            </div>
            <p className={styles.price}>€{camper.price?.toFixed(0)}</p>
            <p className={styles.description}>{camper.description}</p>
          </div>

          <div className={styles.detailsBlock}>
            <h3 className={styles.detailsTitle}>Vehicle details</h3>
            <div className={styles.chips}>
              <span className={styles.chip}>Automatic</span>
              <span className={styles.chip}>AC</span>
              <span className={styles.chip}>Petrol</span>
              <span className={styles.chip}>Kitchen</span>
              <span className={styles.chip}>Radio</span>
              <span className={styles.chip}>Alcove</span>
            </div>
            <table className={styles.table}>
              <tbody>
                <tr><td>Form</td><td>{camper.form}</td></tr>
                <tr><td>Length</td><td>{camper.length}</td></tr>
                <tr><td>Width</td><td>{camper.width}</td></tr>
                <tr><td>Height</td><td>{camper.height}</td></tr>
                <tr><td>Tank</td><td>{camper.tank}</td></tr>
                <tr><td>Consumption</td><td>{camper.consumption}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Форма бронювання */}
          <div className={styles.bookingCard}>
            <h3 className={styles.bookingTitle}>Book your campervan now</h3>
            <p className={styles.bookingSubtitle}>Stay connected! We are always ready to help you.</p>
            <form className={styles.form}>
              <input type="text" placeholder="Name*" required className={styles.input} />
              <input type="email" placeholder="Email*" required className={styles.input} />
              <input type="date" required className={styles.input} />
              <button type="submit" className={styles.submitBtn}>Send</button>
            </form>
          </div>
        </aside>

      </main>
    </div>
  );
}