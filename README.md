# React-слайдер отзывов (Swiper + БЭМ + CSS Modules)

Этот компонент реализует слайдер отзывов с адаптивной сеткой и поддержкой навигации.  
Использованы:

- **Swiper** (`swiper/react`, модули Navigation и Pagination)
- **CSS-модули с БЭМ-именованием**
- **JSON-данные** для отзывов
- 
<img width="1526" height="601" alt="Screenshot_2025_09_20-2" src="https://github.com/user-attachments/assets/68cddc03-78fc-4050-bb70-f433dc741ad1" />

## Возможности

- Адаптивный дизайн (1 отзыв на мобилке, 2 на планшете и ПК)
- Поддержка скролла текста внутри карточки
- Кастомные цвета, стили, шрифты
- Поддержка навигации

## Использование

```tsx
import ReviewsSlider from './components/ReviewsSlider/ReviewsSlider';

function App() {
  return (
    <div>
      <ReviewsSlider />
    </div>
  );
}

export default App;
```
