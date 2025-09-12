import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Стили Swiper
import 'swiper/css';

// Стили компонента
import styles from './ReviewsSlider.module.css';

// Данные
import reviews from '../../data/reviews.json';

// Иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Типизация Swiper
import type { Swiper as SwiperType } from 'swiper';

const ReviewsSlider: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  // Анимация клика
  const handleClickAnimation = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = e.currentTarget;
    btn.classList.add(styles.activeClick);
    setTimeout(() => btn.classList.remove(styles.activeClick), 300);
  };

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
        {reviews.map(({ id, avatar, name, source, rating, text }) => (
          <SwiperSlide key={id}>
            <div className={styles['reviews-slider__card']}>
              <div className={styles['reviews-slider__header']}>
                <img src={avatar} alt={name} className={styles['reviews-slider__avatar']} />
                <div>
                  <h3 className={styles['reviews-slider__name']}>{name}</h3>
                  <span className={styles['reviews-slider__source']}>{source}</span>
                </div>
              </div>
              <div className={styles['reviews-slider__rating']}>{'★'.repeat(rating)}</div>
              <p className={styles['reviews-slider__text']}>{text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Кастомные кнопки */}
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
