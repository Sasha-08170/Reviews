import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './ReviewsSlider.module.css';
import reviews from '../../data/reviews.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ReviewsSlider: React.FC = () => {
  return (
    <div className={styles['reviews-slider']}>
      <h2>Reviews Slider</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={2}
        navigation={{
          nextEl: `.${styles['swiper-button-next']}`,
          prevEl: `.${styles['swiper-button-prev']}`,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className={styles['reviews-slider__card']}>
              <div className={styles['reviews-slider__header']}>
                <img
                  src={review.avatar}
                  alt={review.name}
                  className={styles['reviews-slider__avatar']}
                />
                <div>
                  <h3 className={styles['reviews-slider__name']}>{review.name}</h3>
                  <span className={styles['reviews-slider__source']}>{review.source}</span>
                </div>
              </div>
              <div className={styles['reviews-slider__rating']}>{'★'.repeat(review.rating)}</div>
              <p className={styles['reviews-slider__text']}>{review.text}</p>
              <span className={styles['reviews-slider__date']}>{review.date}</span>
            </div>
          </SwiperSlide>
        ))}
        {/* Кастомные кнопки навигации для Swiper */}
        <div className={styles['swiper-button-prev']}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className={styles['swiper-button-next']}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Swiper>
    </div>
  );
};

export default ReviewsSlider;
