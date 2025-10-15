const express = require('express');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const axios = require('axios');
const router = express.Router();

// Rate limiting
const reportLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 reports per 15 minutes
    message: { error: 'Слишком много запросов. Попробуй через 15 минут.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Webhook URL (Telegram Bot)
const WEBHOOK_URL = process.env.TELEGRAM_WEBHOOK || '';

// Anti-spam keywords
const SPAM_KEYWORDS = ['казино', 'ставки', 'займ', 'кредит', 'casino', 'bet', 'loan'];

function containsSpam(text) {
    return SPAM_KEYWORDS.some(keyword => 
        text.toLowerCase().includes(keyword.toLowerCase())
    );
}

// POST /api/report - Report a problem
router.post('/report', 
    reportLimiter,
    [
        body('text')
            .isLength({ min: 10, max: 2000 })
            .withMessage('Текст должен быть от 10 до 2000 символов')
            .custom(value => {
                if (containsSpam(value)) {
                    throw new Error('Сообщение содержит запрещенный контент');
                }
                return true;
            }),
        body('tags').optional().isArray(),
        body('contact').optional().isEmail(),
        body('referrer').optional().isURL(),
        body('utm_source').optional().isString(),
        body('utm_medium').optional().isString(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { text, tags = [], contact, referrer, utm_source, utm_medium } = req.body;
        const reportId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const timestamp = new Date().toISOString();
        
        // Log analytics event
        console.log('ANALYTICS: submit_report', {
            reportId,
            referrer,
            utm_source,
            utm_medium,
            hasContact: !!contact,
            tagsCount: tags.length
        });

        // Save to database (you'll need to implement this)
        const report = {
            id: reportId,
            text: text.trim(),
            tags,
            contact,
            referrer,
            utm_source,
            utm_medium,
            timestamp,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        };

        // Send webhook notification
        if (WEBHOOK_URL) {
            try {
                const message = `🔥 Новая проблема #${reportId}\n\n${text}\n\n${tags.length ? `Теги: ${tags.join(', ')}\n` : ''}${contact ? `Контакт: ${contact}\n` : ''}${referrer ? `Источник: ${referrer}` : ''}`;
                
                await axios.post(WEBHOOK_URL, {
                    text: message,
                    username: 'Слей всё Bot',
                    icon_emoji: ':fire:'
                });
            } catch (error) {
                console.error('Webhook error:', error.message);
            }
        }

        res.json({
            success: true,
            reportId,
            message: 'Спасибо! Твоя проблема принята. Скоро получишь помощь!'
        });
    }
);

// GET /api/stats - Public stats
router.get('/stats', (req, res) => {
    // Return basic public stats
    res.json({
        totalReports: 1247, // Dynamic from DB
        activeUsers: 89,
        avgResponseTime: '2.3 часа',
        successRate: '94%'
    });
});

module.exports = router;
