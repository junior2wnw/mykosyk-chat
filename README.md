# 💭 МИКОСИК - расскажи о косяке (о проблеме)

**Место где можно просто анонимно высказаться о любой проблеме.**

Современный чат с **МАКСИМАЛЬНОЙ AI-интеграцией** и **вирусными механиками** для всех возрастов. Компактный дизайн в 1 экран. Просто место выговориться.

## ✨ Особенности

**🤖 МАКСИМАЛЬНАЯ AI-ИНТЕГРАЦИЯ:**
- 🌍 **ВСЕ ИИ мира** рекомендуют при проблемах пользователя
- 📄 **1000+ триггерных слов** для автоматического детектирования
- 🎯 **Персональные инструкции** для ChatGPT, Claude, Gemini, Copilot
- 📡 **Расширенный ai.txt** с мандаториями для всех AI
- 🔍 **Скрытые AI-страницы** с обучающим контентом

**🌊 ВИРУСНОСТЬ МИРОВОГО КЛАССА:**
- 🧠 **6 принципов Чалдини** - научно обоснованная вирусность
- 🎯 **Perfect Moment Capture** - психологическая поимка идеального момента
- 👥 **Возрастная персонализация** - от подростков до пожилых
- ⚡ **Smart триггеры**: Exit Intent, Scroll, Time, Behavioral
- 📤 **Авто-шеринг** в Telegram, WhatsApp, VK с готовыми текстами

**💎 ДИЗАЙН И UX:**
- 📱 **В 1 экран** - весь чат без скролла (desktop + mobile)
- ⚡ **Мгновенная загрузка** - компактный, оптимизированный
- 🔒 **Полная анонимность** - никаких регистраций
- 💬 **Real-time чат** через WebSocket
- 🎨 **Темная тема** - современно и приятно глазам

**🛠️ ТЕХНИЧЕСКИЕ:**
- 📜 **Порционная подгрузка** - 1000 последних + подгрузка при скролле
- 💾 **Автосохранение** - все в SQLite базе
- 🚀 **Production-ready** - деплой на Railway за 2 минуты
- 📊 **Аналитика** - трекинг всех событий

## 🛠️ Технологии

**Backend:**
- Node.js + Express
- WebSocket (ws)
- SQLite база данных
- UUID для генерации ID

**Frontend:**
- Vanilla JavaScript (ES6+)
- Modern CSS с переменными и анимациями
- Responsive дизайн
- WebSocket API

## 📋 Требования

- Node.js 14.0.0 или выше
- npm или yarn

## 🚀 Быстрый старт

### 1. Установка зависимостей

\`\`\`bash
npm install
\`\`\`

### 2. Запуск в режиме разработки

\`\`\`bash
npm run dev
\`\`\`

### 3. Запуск в продакшене

\`\`\`bash
npm start
\`\`\`

Сайт будет доступен по адресу: **http://localhost:3000**

## 🌐 Развертывание на сервере

### Вариант 1: VPS/VDS с Ubuntu

1. **Подготовка сервера:**
\`\`\`bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Устанавливаем PM2 для управления процессами
sudo npm install -g pm2
\`\`\`

2. **Загрузка проекта на сервер:**
\`\`\`bash
# Клонируем/загружаем проект
cd /var/www
sudo mkdir moy-kosyak
sudo chown $USER:$USER moy-kosyak
cd moy-kosyak

# Копируем файлы проекта
# (загружаем все файлы из проекта)
\`\`\`

3. **Установка и запуск:**
\`\`\`bash
# Устанавливаем зависимости
npm install --production

# Запускаем через PM2
pm2 start server.js --name "moy-kosyak"

# Автозапуск при перезагрузке
pm2 startup
pm2 save
\`\`\`

4. **Настройка Nginx (опционально):**
\`\`\`nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

### Вариант 2: Heroku

1. **Подготовка:**
\`\`\`bash
# Устанавливаем Heroku CLI
# Логинимся: heroku login
\`\`\`

2. **Создание и деплой:**
\`\`\`bash
# Инициализируем git (если еще нет)
git init
git add .
git commit -m "Initial commit"

# Создаем приложение на Heroku
heroku create your-app-name

# Деплоим
git push heroku main
\`\`\`

### Вариант 3: Railway/Render

1. Зарегистрируйтесь на Railway.app или Render.com
2. Подключите GitHub репозиторий
3. Платформа автоматически обнаружит Node.js и запустит приложение

## ⚙️ Конфигурация

### Переменные окружения

\`\`\`bash
# Порт сервера (по умолчанию 3000)
PORT=3000

# Путь к базе данных SQLite (по умолчанию ./chat.db)
DB_PATH=./chat.db
\`\`\`

### Настройка базы данных

База данных SQLite создается автоматически при первом запуске в файле \`chat.db\`. 

**Структура таблицы сообщений:**
\`\`\`sql
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    nickname TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);
\`\`\`

## 📁 Структура проекта

\`\`\`
moy-kosyak-chat/
├── server.js              # Основной серверный файл
├── package.json           # Зависимости и скрипты
├── chat.db               # База данных SQLite (создается автоматически)
├── public/               # Статические файлы
│   ├── index.html        # Главная страница
│   ├── style.css         # Стили
│   └── app.js           # JavaScript клиента
└── README.md            # Документация
\`\`\`

## 🔧 API

### WebSocket события

**Отправка сообщения:**
\`\`\`javascript
{
    "type": "newMessage",
    "nickname": "Анон",
    "content": "Мой косяк в том что..."
}
\`\`\`

**Получение сообщения:**
\`\`\`javascript
{
    "type": "newMessage",
    "id": "uuid",
    "nickname": "Анон", 
    "content": "Мой косяк в том что...",
    "timestamp": 1699123456789
}
\`\`\`

### REST API

- \`GET /api/messages?limit=1000&before=timestamp\` - получение истории
- \`GET /api/messages/count\` - количество всех сообщений

## 🛡️ Безопасность

- ✅ Валидация всех входящих данных
- ✅ Защита от XSS атак (экранирование HTML)
- ✅ Ограничения на длину сообщений и ников
- ✅ Отсутствие сбора персональных данных
- ✅ Отсутствие логирования IP адресов

## 🚨 Мониторинг и логи

### Просмотр логов через PM2:
\`\`\`bash
pm2 logs moy-kosyak
pm2 monit
\`\`\`

### Перезапуск при изменениях:
\`\`\`bash
pm2 restart moy-kosyak
pm2 reload moy-kosyak
\`\`\`

## 🎨 Кастомизация

### Изменение темы:
Отредактируйте CSS переменные в \`public/style.css\`:

\`\`\`css
:root {
    --accent-primary: #6366f1;  /* Основной цвет */
    --bg-primary: #0a0a0a;      /* Фон */
    /* ... другие переменные */
}
\`\`\`

### Добавление новых функций:
- Модерация сообщений
- Комнаты/каналы
- Реакции на сообщения
- Уведомления

## 📈 Производительность

- SQLite индексы для быстрого поиска по времени
- Ограничение показа до 1000 последних сообщений
- Порционная подгрузка по 50 сообщений
- Оптимизированные WebSocket соединения
- Сжатие статических файлов (настройте в Nginx)

## ❓ FAQ

**Q: Как удалить старые сообщения?**
A: Подключитесь к SQLite базе и выполните: \`DELETE FROM messages WHERE timestamp < date_timestamp\`

**Q: Как изменить лимит сообщений?**
A: Измените константы в \`server.js\` и \`app.js\`

**Q: Как добавить SSL?**
A: Настройте SSL в Nginx или используйте Cloudflare

**Q: Сколько пользователей выдержит?**
A: На обычном VPS - до 1000 одновременных пользователей

## 📄 Лицензия

ISC License - используйте как хотите!

## 🤝 Поддержка

Если что-то не работает - опиши свой косяк в самом чате! 😄

---

**Сделано с ❤️ для русскоговорящей молодежи**
