# 💬 Мой косяк - Анонимный чат для молодежи

Современный одностраничный чат, где можно анонимно поделиться своими проблемами и косяками. Простой, красивый и безопасный.

## ✨ Особенности

- 🔥 **Современный дизайн** - темная тема с градиентами и анимациями
- ⚡ **Real-time чат** через WebSocket
- 🔒 **Полная анонимность** - никаких регистраций и сбора данных
- 📱 **Адаптивный дизайн** - отлично работает на всех устройствах
- 🗂️ **Автосохранение истории** - все сообщения сохраняются в базе
- 📜 **Порционная подгрузка** - показ последних 1000 сообщений с подгрузкой старых при скролле
- 🚀 **Готов к продакшену** - простое развертывание на любом сервере

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
