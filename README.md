# React-слайдер отзывов (Swiper + БЭМ + CSS Modules)

Этот компонент реализует слайдер отзывов с адаптивной сеткой и поддержкой навигации.  
Использованы:

- **Swiper** (`swiper/react`, модули Navigation и Pagination)
- **CSS-модули с БЭМ-именованием**
- **JSON-данные** для отзывов

## Возможности

- Адаптивный дизайн (1 отзыв на мобилке, 2 на планшете и ПК)
- Поддержка скролла текста внутри карточки
- Кастомные цвета, стили, шрифты
- Поддержка навигации и пагинации

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
