"use client";

import { useState, ChangeEvent, useEffect } from "react"; 
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; 
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import styles from "./catalog.module.css";
import { fetchCampersData } from "@/services/campers";
import { FilterState } from "@/types/types";

import { FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BsFuelPump, BsDiagram3 } from "react-icons/bs";
import { TbAutomaticGearbox } from "react-icons/tb";

const initialFilters: FilterState = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

export default function Catalog() {
  const searchParams = useSearchParams();
  const resetTrigger = searchParams.get("reset");

  const [filterForm, setFilterForm] = useState<FilterState>(initialFilters);
  const [activeFilters, setActiveFilters] = useState<FilterState>(initialFilters);

  useEffect(() => {
    if (resetTrigger) {
      setFilterForm(initialFilters);
      setActiveFilters(initialFilters);
    }
  }, [resetTrigger]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["campers", activeFilters],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampersData({ ...activeFilters, page: pageParam, limit: 4 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    placeholderData: keepPreviousData,
  });

  const campers = data?.pages.flatMap((page) => page.campers) || [];

  const handleSearch = () => {
    setActiveFilters({ ...filterForm });
  };

  const handleClearFilters = () => {
    setFilterForm(initialFilters);
    setActiveFilters(initialFilters);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Location</label>
          <div className={styles.inputWrapper}>
            <FiMapPin className={styles.inputIcon} />
            <input
              type="text"
              name="location"
              value={filterForm.location}
              onChange={handleChange}
              placeholder="Kyiv, Ukraine"
              className={styles.input}
            />
          </div>
        </div>

        <h3 className={styles.filtersTitle}>Filters</h3>

        <div className={styles.filterGroup}>
          <h4 className={styles.groupTitle}>Camper form</h4>
          {[
            { id: "alcove", label: "Alcove" },
            { id: "panel_van", label: "Panel Van" },
            { id: "integrated", label: "Integrated" },
            { id: "semi_integrated", label: "Semi Integrated" },
          ].map((item) => (
            <label key={item.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="form"
                value={item.id}
                checked={filterForm.form === item.id}
                onChange={handleChange}
              />
              <span className={styles.radioText}>{item.label}</span>
            </label>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <h4 className={styles.groupTitle}>Engine</h4>
          {["diesel", "petrol", "hybrid", "electric"].map((engine) => (
            <label key={engine} className={styles.radioLabel}>
              <input
                type="radio"
                name="engine"
                value={engine}
                checked={filterForm.engine === engine}
                onChange={handleChange}
              />
              <span className={styles.radioText}>
                {engine.charAt(0).toUpperCase() + engine.slice(1)}
              </span>
            </label>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <h4 className={styles.groupTitle}>Transmission</h4>
          {["automatic", "manual"].map((trans) => (
            <label key={trans} className={styles.radioLabel}>
              <input
                type="radio"
                name="transmission"
                value={trans}
                checked={filterForm.transmission === trans}
                onChange={handleChange}
              />
              <span className={styles.radioText}>
                {trans.charAt(0).toUpperCase() + trans.slice(1)}
              </span>
            </label>
          ))}
        </div>

        <div className={styles.buttonsGroup}>
          <button
            className={styles.searchBtn}
            onClick={handleSearch}
            disabled={isFetching && !isFetchingNextPage}
          >
            Search
          </button>
          <button className={styles.clearBtn} onClick={handleClearFilters}>
            ✕ Clear filters
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        {status === "error" && (
          <p className={styles.errorText}>
            {error instanceof Error
              ? error.message
              : "Сталася помилка при завантаженні."}
          </p>
        )}

        <div className={styles.listContainer}>
          {isFetching && !isFetchingNextPage && (
            <div className={styles.loaderOverlay}>
              <div className={styles.spinner}></div>
            </div>
          )}

          {campers.length > 0 && (
            <div className={styles.campersList}>
              {campers.map((camper) => (
                <div key={camper.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={camper.coverImage || "/placeholder.jpg"}
                      alt={camper.name}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 290px"
                    />
                  </div>

                  <div className={styles.cardInfo}>
                    <div className={styles.cardHeader}>
                      <h2 className={styles.camperTitle}>{camper.name}</h2>
                      <p className={styles.price}>€{camper.price.toFixed(2)}</p>
                    </div>

                    <div className={styles.ratingLocation}>
                      <span className={styles.rating}>
                        <FaStar className={styles.starIcon} /> {camper.rating} (
                        {camper.totalReviews || 0} Reviews)
                      </span>
                      <span className={styles.location}>
                        <FiMapPin /> {camper.location}
                      </span>
                    </div>

                    <p className={styles.description}>{camper.description}</p>

                    <div className={styles.tags}>
                      <span className={styles.tag}>
                        <BsFuelPump /> {camper.engine}
                      </span>
                      <span className={styles.tag}>
                        {camper.transmission === "automatic" ? (
                          <TbAutomaticGearbox />
                        ) : (
                          <BsDiagram3 />
                        )}
                        {camper.transmission}
                      </span>
                    </div>

                    <Link
                      href={`/catalog/${camper.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.showMoreBtn}
                    >
                      Show more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {status === "success" && campers.length === 0 && (
            <div className={styles.emptyState}>
              <p className={styles.noResults}>
                No campers found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>

        {hasNextPage && campers.length > 0 && (
          <button
            className={styles.loadMoreBtn}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : "Load more"}
          </button>
        )}
      </main>
    </div>
  );
}