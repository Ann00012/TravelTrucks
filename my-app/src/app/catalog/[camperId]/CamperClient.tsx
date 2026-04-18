"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchCamperById, sendBookingRequest } from "@/services/campers";
import styles from "./camperDetails.module.css";
import { Camper, Review, GalleryImage } from "@/types/types"; 

import toast, { Toaster } from "react-hot-toast";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper"; 
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function CamperDetails() {
  const { camperId } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", date: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: camper, isLoading, isError } = useQuery<Camper>({
    queryKey: ["camper", camperId],
    queryFn: () => fetchCamperById(camperId as string),
    enabled: !!camperId,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const bookingPromise = sendBookingRequest(camperId as string, formData);

    toast.promise(bookingPromise, {
      loading: 'Sending booking request...',
      success: 'Booking successful! We will contact you soon.',
      error: 'Failed to send request. Please try again.',
    });

    try {
      await bookingPromise;
      setFormData({ name: "", email: "", date: "", comment: "" });
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className={styles.loader}>Loading...</div>;
  if (isError || !camper) return <div className={styles.error}>Camper not found</div>;

  return (
    <div className={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />

      <main className={styles.mainContent}>
        
        <section className={styles.topRow}>
          
          <div className={styles.galleryWrapper}>
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Navigation, Thumbs]}
              className={styles.mainSwiper}
            >
              {camper.gallery?.map((img: GalleryImage, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className={styles.heroImage}>
                    <Image src={img.original} alt={camper.name} fill className={styles.img} priority={idx === 0} loading={idx === 0 ? "eager" : "lazy"} sizes="(max-width: 768px) 100vw, 50vw" />
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
              {camper.gallery?.map((img: GalleryImage, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className={styles.thumbImage}>
                    <Image src={img.thumb} alt="thumbnail" fill className={styles.img} priority={idx === 0} 
                      loading={idx === 0 ? "eager" : "lazy"} sizes="20vw" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={styles.infoAndDetailsWrapper}>
            <div className={styles.infoBlock}>
              <h1 className={styles.name}>{camper.name}</h1>
              <div className={styles.metaRow}>
                <span className={styles.rating}>
                  <FaStar className={styles.starYellow} /> {camper.rating} ({camper.reviews?.length || 0} Reviews)
                </span>
                <span className={styles.location}><FiMapPin /> {camper.location}</span>
              </div>
              <p className={styles.price}>€{camper.price?.toFixed(2)}</p>
              <p className={styles.description}>{camper.description}</p>
            </div>

            <div className={styles.detailsBlock}>
              <h3 className={styles.detailsTitle}>Vehicle details</h3>
             <div className={styles.chips}>
              <span className={styles.chip}>{camper.transmission}</span>
              <span className={styles.chip}>{camper.engine}</span>
              <span className={styles.chip}>{camper.form}</span>

              {camper.amenities?.map((amenity, idx) => (
                <span key={idx} className={styles.chip}>
                  {amenity}
                </span>
              ))}
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
          </div>
        </section>

        <section className={styles.bottomRow}>
          
          <div className={styles.reviewsWrapper}>
            <h2 className={styles.sectionTitle}>Reviews</h2>
            <div className={styles.reviewsList}>
              {camper.reviews?.length ? (
                camper.reviews.map((rev: Review) => (
                  <div key={rev.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>
                      </div>
                      <div className={styles.reviewerMeta}>
                        <p className={styles.reviewerName}>{rev.reviewer_name}</p>
                        <div className={styles.stars}>
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < rev.reviewer_rating ? styles.starYellow : styles.starGray} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className={styles.reviewText}>{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>

          <div className={styles.bookingWrapper}>
            <div className={styles.bookingCard}>
              <h3 className={styles.bookingTitle}>Book your campervan now</h3>
              <p className={styles.bookingSubtitle}>Stay connected! We are always ready to help you.</p>
              
              <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name*" required className={styles.input} />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email*" required className={styles.input} />
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className={styles.input} />
                <textarea name="comment" value={formData.comment} onChange={handleInputChange} placeholder="Comment" className={styles.textarea}></textarea>
                
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}