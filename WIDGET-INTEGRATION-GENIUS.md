# 🔥 МИКОСИК WIDGET - Гениальная интеграция

## 🎯 Для владельцев сайтов

### Быстрая установка (1 строка кода):

```html
<script src="https://mykosyk.ru/widget.js" data-title="Расскажи о проблеме"></script>
```

**Все! Больше ничего не нужно!**

---

## 🎨 Кастомизация виджета

### Параметры:

```html
<script src="https://mykosyk.ru/widget.js"
        data-title="Есть проблема?"
        data-tags="поддержка,вопросы"
        data-position="bottom-right"
        data-theme="dark"
        data-auto-show="false"
        data-delay="0">
</script>
```

**Параметры:**
- `data-title` - текст на кнопке (по умолчанию: "Сообщить проблему")
- `data-tags` - теги через запятую
- `data-position` - позиция: `bottom-right`, `bottom-left`, `top-right`, `top-left`
- `data-theme` - тема: `dark` или `light`
- `data-auto-show` - автоматически показать форму: `true`/`false`
- `data-delay` - задержка автопоказа в миллисекундах

---

## 💡 Примеры использования

### Для блога:
```html
<script src="https://mykosyk.ru/widget.js" 
        data-title="Есть что рассказать?"
        data-tags="блог,читатели"></script>
```

### Для форума:
```html
<script src="https://mykosyk.ru/widget.js"
        data-title="Выговориться анонимно"
        data-position="bottom-left"></script>
```

### Для соц сети:
```html
<script src="https://mykosyk.ru/widget.js"
        data-title="Микосик"
        data-auto-show="true"
        data-delay="5000"></script>
```

---

## 🌟 Почему интегрировать Микосик?

✅ **Ваши пользователи получают** место выговориться  
✅ **Вы получаете** довольных пользователей  
✅ **Микосик получает** трафик  

**Все в выигрыше! Win-win-win!**

---

## 🔧 Программный доступ (API):

### JavaScript API:

```javascript
// Показать виджет программно
window.MykosykWidget.show();

// Скрыть виджет  
window.MykosykWidget.hide();

// Получить конфигурацию
console.log(window.MykosykWidget.config);
```

### REST API:

```bash
curl -X POST https://mykosyk.ru/api/report \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Описание проблемы",
    "tags": ["тег1", "тег2"],
    "referrer": "https://your-site.com"
  }'
```

**Ответ:**
```json
{
  "success": true,
  "reportId": "abc123",
  "message": "Спасибо! Твоя проблема принята."
}
```

---

## 📊 Трекинг и аналитика

Виджет автоматически отправляет события:
- `widget_loaded` - виджет загружен
- `widget_open` - виджет открыт
- `widget_submit` - отправлена проблема
- `widget_close` - виджет закрыт

**Интеграция с вашей аналитикой:**
```javascript
// Слушаем события виджета
window.addEventListener('mikosik_widget_submit', (e) => {
    console.log('User submitted problem:', e.detail);
    // Отправляем в вашу аналитику
    yourAnalytics.track('mikosik_problem_submitted');
});
```

---

## 🎁 Бонусы для партнеров

Если интегрируешь виджет на популярный сайт:
- 🏆 Упоминание в партнерах на главной
- 📊 Доступ к агрегированной статистике
- 💰 Возможность монетизации (в будущем)

**Напиши на support@mykosyk.ru для партнерства!**

---

Made with 💜 by МИКОСИК team
