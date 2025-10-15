const express = require('express');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

// Настройка статических файлов
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Инициализация базы данных
const db = new sqlite3.Database('./chat.db');

// Создание таблицы сообщений
db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, nickname TEXT NOT NULL, content TEXT NOT NULL, timestamp INTEGER NOT NULL)");
    db.run("CREATE INDEX IF NOT EXISTS idx_timestamp ON messages(timestamp DESC)");
});

// Хранение активных WebSocket соединений
const clients = new Set();

// WebSocket соединения
wss.on('connection', function(ws) {
    console.log('Новое соединение установлено');
    clients.add(ws);
    
    ws.on('message', function(data) {
        try {
            const message = JSON.parse(data);
            
            if (message.type === 'newMessage') {
                // Валидация данных
                if (!message.nickname || !message.content || 
                    message.nickname.trim().length === 0 || 
                    message.content.trim().length === 0 ||
                    message.nickname.length > 50 ||
                    message.content.length > 1000) {
                    ws.send(JSON.stringify({
                        type: 'error',
                        message: 'Неверные данные сообщения'
                    }));
                    return;
                }
                
                const messageId = uuidv4();
                const timestamp = Date.now();
                
                // Сохранение в базу данных
                db.run(
                    'INSERT INTO messages (id, nickname, content, timestamp) VALUES (?, ?, ?, ?)',
                    [messageId, message.nickname.trim(), message.content.trim(), timestamp],
                    function(err) {
                        if (err) {
                            console.error('Ошибка при сохранении сообщения:', err);
                            ws.send(JSON.stringify({
                                type: 'error',
                                message: 'Ошибка при отправке сообщения'
                            }));
                            return;
                        }
                        
                        // Отправка сообщения всем клиентам
                        const broadcastMessage = {
                            type: 'newMessage',
                            id: messageId,
                            nickname: message.nickname.trim(),
                            content: message.content.trim(),
                            timestamp: timestamp
                        };
                        
                        clients.forEach(function(client) {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify(broadcastMessage));
                            }
                        });
                    }
                );
            }
        } catch (error) {
            console.error('Ошибка при обработке сообщения:', error);
            ws.send(JSON.stringify({
                type: 'error',
                message: 'Ошибка при обработке сообщения'
            }));
        }
    });
    
    ws.on('close', function() {
        console.log('Соединение закрыто');
        clients.delete(ws);
    });
    
    ws.on('error', function(error) {
        console.error('WebSocket ошибка:', error);
        clients.delete(ws);
    });
});

// API для получения истории сообщений
app.get('/api/messages', function(req, res) {
    const limit = parseInt(req.query.limit) || 1000;
    const before = req.query.before ? parseInt(req.query.before) : Date.now() + 1;
    
    if (limit > 1000) {
        return res.status(400).json({ error: 'Максимальный лимит 1000 сообщений' });
    }
    
    db.all(
        'SELECT id, nickname, content, timestamp FROM messages WHERE timestamp < ? ORDER BY timestamp DESC LIMIT ?',
        [before, limit],
        function(err, rows) {
            if (err) {
                console.error('Ошибка при получении сообщений:', err);
                return res.status(500).json({ error: 'Ошибка сервера' });
            }
            
            // Возвращаем в правильном порядке (старые внизу)
            res.json(rows.reverse());
        }
    );
});

// Получение количества всех сообщений
app.get('/api/messages/count', function(req, res) {
    db.get('SELECT COUNT(*) as count FROM messages', function(err, row) {
        if (err) {
            console.error('Ошибка при подсчете сообщений:', err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
        res.json({ count: row.count });
    });
});

// Главная страница
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработка 404
app.use(function(req, res) {
    res.status(404).send('Страница не найдена');
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, '0.0.0.0', function() {
    console.log('🚀 Сервер "Мой косяк" запущен на порту ' + PORT);
    console.log('📱 Открой http://localhost:' + PORT + ' чтобы начать чатиться!');
});

// Graceful shutdown
process.on('SIGINT', function() {
    console.log('\n📴 Сервер останавливается...');
    
    // Закрываем все WebSocket соединения
    clients.forEach(function(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.close();
        }
    });
    
    // Закрываем базу данных
    db.close(function(err) {
        if (err) {
            console.error('Ошибка при закрытии базы данных:', err);
        }
        console.log('🔒 База данных закрыта');
        process.exit(0);
    });
});
