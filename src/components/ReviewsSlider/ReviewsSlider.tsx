import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
// Стили Swiper
import 'swiper/css';

// Стили компонента (CSS-модуль)
import styles from './ReviewsSlider.module.css';

// Иконки (FontAwesome)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Типизация Swiper (нужно, чтобы работать с ref)
import type { Swiper as SwiperType } from 'swiper';

// Типизация одного отзыва
type Review = {
  id: number;
  avatar: string;
  name: string;
  source: string;
  rating: number;
  text: string;
};

const ReviewsSlider: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Динамический импорт JSON-файла
        const module = await import('../../data/reviews.json');

        // axios-запрос с кастомным adapter
        const response: AxiosResponse<Review[]> = await axios.request<Review[]>({
          method: 'get',
          url: '', // фиктивный URL
          adapter: async (config: InternalAxiosRequestConfig): Promise<AxiosResponse<Review[]>> => {
            return {
              data: module.default as Review[],
              status: 200,
              statusText: 'OK',
              headers: {},
              config,
              request: {},
            };
          },
        });

        setReviews(response.data);
      } catch (err) {
        console.error('Ошибка загрузки отзывов:', err);
        setError('Не удалось загрузить отзывы.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleClickAnimation = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = e.currentTarget;
    btn.classList.add(styles.activeClick);
    setTimeout(() => btn.classList.remove(styles.activeClick), 300);
  };

  if (loading) {
    return <div className={styles['reviews-slider']}>Загрузка отзывов...</div>;
  }

  if (error) {
    return <div className={styles['reviews-slider']}>{error}</div>;
  }

  return (
    <div className={styles['reviews-slider']}>
      <h2>Reviews Slider</h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop
        speed={800}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay.start()}
      >
        {reviews.map(({ id, name, source, rating, text }) => (
          <SwiperSlide key={id}>
            <div className={styles['reviews-slider__card']}>
              <div className={styles['reviews-slider__header']}>
                <div>
                  <h3 className={styles['reviews-slider__name']}>
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['reviews-slider__link']}
                    >
                      {name}
                    </a>
                  </h3>
                </div>
              </div>

              <div className={styles['reviews-slider__rating']}>{'★'.repeat(rating)}</div>

              <p className={styles['reviews-slider__text']}>{text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={`${styles['swiper-button-prev']} ${styles['custom-btn']}`}
        onClick={(e) => {
          handleClickAnimation(e);
          swiperRef.current?.slidePrev();
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div
        className={`${styles['swiper-button-next']} ${styles['custom-btn']}`}
        onClick={(e) => {
          handleClickAnimation(e);
          swiperRef.current?.slideNext();
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
};

export default ReviewsSlider;
