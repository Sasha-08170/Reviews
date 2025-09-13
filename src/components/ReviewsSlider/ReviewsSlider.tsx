import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import axios, { type AxiosResponse } from 'axios';

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
  // Храним ссылку на объект Swiper, чтобы управлять им (next/prev/stop/start)
  const swiperRef = useRef<SwiperType | null>(null);

  // Состояния: список отзывов, загрузка и ошибка
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загружаем JSON с отзывами (имитация запроса через axios)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Динамический импорт JSON-файла
        const module = await import('../../data/reviews.json');

        // axios-запрос с кастомным adapter (подставляем данные напрямую из JSON)
        const response: AxiosResponse<Review[]> = await axios<Review[]>({
          method: 'get',
          url: '', // реальный URL не нужен, так как adapter возвращает данные
          adapter: async () => {
            return {
              data: module.default as Review[], // данные из JSON
              status: 200,
              statusText: 'OK',
              headers: {},
              config: {},
              request: {},
            };
          },
        });

        // Сохраняем отзывы в state
        setReviews(response.data);
      } catch (err) {
        console.error('Ошибка загрузки отзывов:', err);
        setError('Не удалось загрузить отзывы.');
      } finally {
        // Отключаем индикатор загрузки
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Анимация клика для кастомных кнопок
  const handleClickAnimation = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = e.currentTarget;
    btn.classList.add(styles.activeClick);
    setTimeout(() => btn.classList.remove(styles.activeClick), 300);
  };

  // Пока идёт загрузка
  if (loading) {
    return <div className={styles['reviews-slider']}>Загрузка отзывов...</div>;
  }

  // Если ошибка
  if (error) {
    return <div className={styles['reviews-slider']}>{error}</div>;
  }

  return (
    <div className={styles['reviews-slider']}>
      <h2>Reviews Slider</h2>

      {/* Компонент Swiper */}
      <Swiper
        modules={[Autoplay]} // модуль автопрокрутки
        spaceBetween={30} // отступ между слайдами
        slidesPerView={2} // сколько слайдов показывать одновременно
        autoplay={{
          delay: 4000, // задержка автопрокрутки
          disableOnInteraction: false, // не останавливать при ручном скролле
        }}
        loop // зацикливание
        speed={800} // скорость анимации
        breakpoints={{
          320: { slidesPerView: 1 }, // мобильный
          768: { slidesPerView: 2 }, // планшет+
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // сохраняем ссылку на swiper
        onMouseEnter={() => swiperRef.current?.autoplay.stop()} // пауза при наведении
        onMouseLeave={() => swiperRef.current?.autoplay.start()} // продолжение после ухода
      >
        {/* Перебор отзывов */}
        {reviews.map(({ id, avatar, name, source, rating, text }) => (
          <SwiperSlide key={id}>
            <div className={styles['reviews-slider__card']}>
              {/* Заголовок карточки (аватар + имя + источник) */}
              <div className={styles['reviews-slider__header']}>
                <img src={avatar} alt={name} className={styles['reviews-slider__avatar']} />
                <div>
                  <h3 className={styles['reviews-slider__name']}>{name}</h3>
                  <span className={styles['reviews-slider__source']}>{source}</span>
                </div>
              </div>

              {/* Рейтинг (звёздочки) */}
              <div className={styles['reviews-slider__rating']}>{'★'.repeat(rating)}</div>

              {/* Текст отзыва */}
              <p className={styles['reviews-slider__text']}>{text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Кастомные кнопки управления */}
      <div
        className={`${styles['swiper-button-prev']} ${styles['custom-btn']}`}
        onClick={(e) => {
          handleClickAnimation(e);
          swiperRef.current?.slidePrev(); // переключение назад
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div
        className={`${styles['swiper-button-next']} ${styles['custom-btn']}`}
        onClick={(e) => {
          handleClickAnimation(e);
          swiperRef.current?.slideNext(); // переключение вперёд
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
};

export default ReviewsSlider;
