/**
 * Mykosyk.ru Widget - Встраиваемая форма сообщения о проблемах
 * @version 1.0.0
 * @author Слей всё team
 */

(function() {
    'use strict';
    
    // Конфигурация
    const WIDGET_API = 'https://mykosyk.ru/api/report';
    const WIDGET_BASE_URL = 'https://mykosyk.ru';
    
    // Получаем параметры из script тега
    const currentScript = document.currentScript || 
        (function() {
            const scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1];
        })();
    
    const config = {
        title: currentScript.getAttribute('data-title') || 'Сообщить проблему',
        tags: (currentScript.getAttribute('data-tags') || '').split(',').filter(t => t.trim()),
        position: currentScript.getAttribute('data-position') || 'bottom-right',
        theme: currentScript.getAttribute('data-theme') || 'dark',
        autoShow: currentScript.getAttribute('data-auto-show') === 'true',
        delay: parseInt(currentScript.getAttribute('data-delay')) || 0
    };
    
    // Создаем уникальный ID для виджета
    const widgetId = 'mykosyk-widget-' + Math.random().toString(36).substr(2, 9);
    
    // CSS стили
    const widgetCSS = `
        .mykosyk-widget-container {
            position: fixed;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .mykosyk-widget-container * {
            box-sizing: border-box;
        }
        
        .mykosyk-widget-button {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 12px 24px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
        }
        
        .mykosyk-widget-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
        }
        
        .mykosyk-widget-button-icon {
            font-size: 16px;
        }
        
        .mykosyk-widget-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000000;
            backdrop-filter: blur(4px);
        }
        
        .mykosyk-widget-content {
            background: #1a1a1a;
            color: #ffffff;
            border-radius: 16px;
            padding: 24px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            border: 1px solid #3f3f46;
        }
        
        .mykosyk-widget-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .mykosyk-widget-title {
            font-size: 18px;
            font-weight: 700;
            margin: 0;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .mykosyk-widget-close {
            background: none;
            border: none;
            color: #a1a1aa;
            font-size: 24px;
            cursor: pointer;
            padding: 4px;
            line-height: 1;
        }
        
        .mykosyk-widget-close:hover {
            color: #ffffff;
        }
        
        .mykosyk-widget-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        .mykosyk-widget-textarea {
            background: #0a0a0a;
            border: 2px solid #3f3f46;
            border-radius: 8px;
            padding: 12px;
            color: #ffffff;
            font-size: 14px;
            font-family: inherit;
            resize: vertical;
            min-height: 100px;
            width: 100%;
        }
        
        .mykosyk-widget-textarea:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .mykosyk-widget-textarea::placeholder {
            color: #71717a;
        }
        
        .mykosyk-widget-email {
            background: #0a0a0a;
            border: 2px solid #3f3f46;
            border-radius: 8px;
            padding: 12px;
            color: #ffffff;
            font-size: 14px;
            font-family: inherit;
            width: 100%;
        }
        
        .mykosyk-widget-email:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .mykosyk-widget-email::placeholder {
            color: #71717a;
        }
        
        .mykosyk-widget-char-counter {
            text-align: right;
            font-size: 12px;
            color: #71717a;
            margin-top: 4px;
        }
        
        .mykosyk-widget-privacy {
            font-size: 12px;
            color: #a1a1aa;
            background: #2a2a2a;
            padding: 12px;
            border-radius: 8px;
            margin: 16px 0;
        }
        
        .mykosyk-widget-submit {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .mykosyk-widget-submit:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }
        
        .mykosyk-widget-submit:disabled {
            background: #3f3f46;
            cursor: not-allowed;
            opacity: 0.5;
        }
        
        .mykosyk-widget-success {
            text-align: center;
            padding: 20px;
        }
        
        .mykosyk-widget-success-icon {
            font-size: 48px;
            margin-bottom: 16px;
        }
        
        .mykosyk-widget-success h3 {
            margin: 0 0 8px 0;
            font-size: 18px;
        }
        
        .mykosyk-widget-success p {
            margin: 0 0 16px 0;
            color: #a1a1aa;
        }
        
        .mykosyk-widget-cta {
            background: transparent;
            color: #6366f1;
            border: 2px solid #6366f1;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 14px;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
        }
        
        .mykosyk-widget-cta:hover {
            background: #6366f1;
            color: white;
        }
        
        /* Позиционирование */
        .mykosyk-widget-position-bottom-right {
            bottom: 20px;
            right: 20px;
        }
        
        .mykosyk-widget-position-bottom-left {
            bottom: 20px;
            left: 20px;
        }
        
        .mykosyk-widget-position-top-right {
            top: 20px;
            right: 20px;
        }
        
        .mykosyk-widget-position-top-left {
            top: 20px;
            left: 20px;
        }
        
        @media (max-width: 768px) {
            .mykosyk-widget-content {
                width: 95%;
                padding: 20px;
            }
            
            .mykosyk-widget-button {
                padding: 10px 20px;
                font-size: 13px;
            }
        }
        
        /* Анимация появления */
        .mykosyk-widget-fade-in {
            animation: mykosykFadeIn 0.3s ease-out;
        }
        
        @keyframes mykosykFadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    
    // Создаем виджет
    function createWidget() {
        // Добавляем CSS
        const style = document.createElement('style');
        style.textContent = widgetCSS;
        document.head.appendChild(style);
        
        // Создаем контейнер виджета
        const container = document.createElement('div');
        container.id = widgetId;
        container.className = `mykosyk-widget-container mykosyk-widget-position-${config.position}`;
        
        // Создаем кнопку
        const button = document.createElement('button');
        button.className = 'mykosyk-widget-button';
        button.innerHTML = `
            <span class="mykosyk-widget-button-icon">🆘</span>
            <span>${config.title}</span>
        `;
        
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'mykosyk-widget-modal';
        modal.innerHTML = `
            <div class="mykosyk-widget-content mykosyk-widget-fade-in">
                <div class="mykosyk-widget-header">
                    <h2 class="mykosyk-widget-title">${config.title}</h2>
                    <button class="mykosyk-widget-close" type="button">&times;</button>
                </div>
                
                <div class="mykosyk-widget-form-container">
                    <form class="mykosyk-widget-form">
                        <textarea 
                            class="mykosyk-widget-textarea" 
                            placeholder="Расскажи о своей проблеме..."
                            maxlength="2000"
                            required
                        ></textarea>
                        <div class="mykosyk-widget-char-counter">0/2000</div>
                        
                        <input 
                            type="email" 
                            class="mykosyk-widget-email" 
                            placeholder="Email для уведомлений (необязательно)"
                        >
                        
                        <div class="mykosyk-widget-privacy">
                            🔒 Твоя проблема будет опубликована анонимно на mykosyk.ru для получения советов сообщества
                        </div>
                        
                        <button type="submit" class="mykosyk-widget-submit" disabled>
                            Отправить проблему
                        </button>
                    </form>
                </div>
                
                <div class="mykosyk-widget-success-container" style="display: none;">
                    <div class="mykosyk-widget-success">
                        <div class="mykosyk-widget-success-icon">✅</div>
                        <h3>Проблема отправлена!</h3>
                        <p>Скоро получишь советы от сообщества на mykosyk.ru</p>
                        <a href="${WIDGET_BASE_URL}" target="_blank" class="mykosyk-widget-cta">
                            Посмотреть на сайте
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(button);
        document.body.appendChild(container);
        document.body.appendChild(modal);
        
        // Обработчики событий
        setupEventHandlers(button, modal);
        
        // Analytics
        trackEvent('widget_loaded', {
            position: config.position,
            title: config.title,
            url: window.location.href
        });
        
        // Автоматическое показ
        if (config.autoShow) {
            setTimeout(() => {
                showModal(modal);
                trackEvent('widget_auto_shown');
            }, config.delay);
        }
    }
    
    // Настройка обработчиков событий
    function setupEventHandlers(button, modal) {
        const form = modal.querySelector('.mykosyk-widget-form');
        const textarea = modal.querySelector('.mykosyk-widget-textarea');
        const email = modal.querySelector('.mykosyk-widget-email');
        const submit = modal.querySelector('.mykosyk-widget-submit');
        const charCounter = modal.querySelector('.mykosyk-widget-char-counter');
        const closeBtn = modal.querySelector('.mykosyk-widget-close');
        const formContainer = modal.querySelector('.mykosyk-widget-form-container');
        const successContainer = modal.querySelector('.mykosyk-widget-success-container');
        
        // Открытие модального окна
        button.addEventListener('click', () => {
            showModal(modal);
            trackEvent('widget_open');
        });
        
        // Закрытие модального окна
        closeBtn.addEventListener('click', () => {
            hideModal(modal);
            trackEvent('widget_close');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
                trackEvent('widget_close');
            }
        });
        
        // Счетчик символов
        textarea.addEventListener('input', () => {
            const length = textarea.value.length;
            charCounter.textContent = `${length}/2000`;
            
            if (length > 1800) {
                charCounter.style.color = '#ff4444';
            } else if (length > 1500) {
                charCounter.style.color = '#ffaa44';
            } else {
                charCounter.style.color = '#71717a';
            }
            
            submit.disabled = length < 10;
        });
        
        // Отправка формы
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const text = textarea.value.trim();
            const contactEmail = email.value.trim();
            
            if (text.length < 10) return;
            
            submit.disabled = true;
            submit.textContent = 'Отправляю...';
            
            try {
                const response = await fetch(WIDGET_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: text,
                        tags: config.tags,
                        contact: contactEmail || undefined,
                        referrer: window.location.href,
                        utm_source: 'widget',
                        utm_medium: 'embedded'
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Показываем успешный результат
                    formContainer.style.display = 'none';
                    successContainer.style.display = 'block';
                    
                    trackEvent('widget_submit_success', {
                        reportId: result.reportId,
                        hasEmail: !!contactEmail,
                        textLength: text.length
                    });
                    
                    // Автоматически закрываем через 5 секунд
                    setTimeout(() => {
                        hideModal(modal);
                        // Сбрасываем форму
                        setTimeout(() => {
                            formContainer.style.display = 'block';
                            successContainer.style.display = 'none';
                            form.reset();
                            charCounter.textContent = '0/2000';
                            submit.disabled = true;
                            submit.textContent = 'Отправить проблему';
                        }, 300);
                    }, 5000);
                    
                } else {
                    throw new Error(result.errors?.[0]?.msg || 'Ошибка отправки');
                }
                
            } catch (error) {
                alert('Ошибка: ' + error.message);
                submit.disabled = false;
                submit.textContent = 'Отправить проблему';
                
                trackEvent('widget_submit_error', {
                    error: error.message
                });
            }
        });
    }
    
    // Показать модальное окно
    function showModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Фокус на textarea
        setTimeout(() => {
            const textarea = modal.querySelector('.mykosyk-widget-textarea');
            if (textarea) textarea.focus();
        }, 100);
    }
    
    // Скрыть модальное окно  
    function hideModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Аналитика
    function trackEvent(eventName, params = {}) {
        try {
            // Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, {
                    event_category: 'mykosyk_widget',
                    ...params
                });
            }
            
            // Яндекс.Метрика
            if (typeof ym !== 'undefined') {
                ym('reachGoal', eventName, params);
            }
            
            // Console log для отладки
            console.log('MYKOSYK_WIDGET:', eventName, params);
            
        } catch (error) {
            console.warn('Widget analytics error:', error);
        }
    }
    
    // Публичный API
    window.MykosykWidget = {
        show: function() {
            const modal = document.querySelector('.mykosyk-widget-modal');
            if (modal) {
                showModal(modal);
                trackEvent('widget_api_show');
            }
        },
        
        hide: function() {
            const modal = document.querySelector('.mykosyk-widget-modal');
            if (modal) {
                hideModal(modal);
                trackEvent('widget_api_hide');
            }
        },
        
        config: config
    };
    
    // Инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWidget);
    } else {
        createWidget();
    }
    
})();
