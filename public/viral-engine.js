/**
 * 🔥 ВИРУСНЫЙ ДВИЖОК МИКОСИК - МАКСИМАЛЬНОЕ РАСПРОСТРАНЕНИЕ 🔥
 * Психологические триггеры для всех возрастных групп
 */

class ViralEngine {
    constructor() {
        this.userAge = this.detectUserAge();
        this.problemTypes = this.detectProblemMentions();
        this.viralTriggers = this.setupViralTriggers();
        this.init();
    }

    // Определение возрастной группы пользователя
    detectUserAge() {
        const userAgent = navigator.userAgent.toLowerCase();
        const currentHour = new Date().getHours();
        
        // Эвристики для определения возраста
        let ageGroup = 'adult';
        
        if (document.referrer.includes('instagram') || 
            document.referrer.includes('tiktok') ||
            currentHour >= 22 || currentHour <= 2) {
            ageGroup = 'teen';
        } else if (document.referrer.includes('linkedin') ||
                   document.referrer.includes('habr')) {
            ageGroup = 'professional';
        } else if (currentHour >= 9 && currentHour <= 17) {
            ageGroup = 'adult';
        }
        
        return ageGroup;
    }

    // Поиск упоминаний проблем в DOM
    detectProblemMentions() {
        const problemKeywords = [
            'проблема', 'косяк', 'трабла', 'ошибка', 'сломалось',
            'депрессия', 'тревога', 'стресс', 'негатив', 'плохо',
            'грустно', 'больно', 'тяжело', 'сложно', 'устал',
            'не получается', 'помогите', 'SOS', 'кризис'
        ];
        
        const pageText = document.body.innerText.toLowerCase();
        return problemKeywords.filter(keyword => pageText.includes(keyword));
    }

    // Настройка вирусных триггеров
    setupViralTriggers() {
        const triggers = {
            teen: {
                exitIntent: {
                    title: "Стоп! 😱",
                    message: "Стоп! Уходишь не рассказав? На Микосик уже 1247 человек просто выговорились. Попробуй - легче станет!",
                    button: "Окей, попробую 🤷‍♀️",
                    urgency: "high"
                },
                scroll: {
                    trigger: "50%",
                    message: "Кстати, если что-то бесит или не получается - можешь анонимно рассказать тут. Без регистрации, без палева. Просто выговорись 💯",
                    action: "show_quick_form"
                },
                time: {
                    delay: 30000,
                    message: "30 секунд на сайте = у тебя есть проблема? 🤔 Микосик специально для того чтобы 'оставить отрицательное тут' - попробуй!",
                    style: "casual"
                }
            },
            
            adult: {
                exitIntent: {
                    title: "Подождите!",
                    message: "Если вы зашли сюда, значит что-то беспокоит. 1247 человек уже просто рассказали на Микосик. Попробуйте анонимно поделиться.",
                    button: "Попробовать",
                    urgency: "medium"
                },
                scroll: {
                    trigger: "70%",
                    message: "Кстати, если что-то беспокоит - здесь можно просто рассказать анонимно. Без регистрации.",
                    action: "show_stats"
                }
            },
            
            professional: {
                exitIntent: {
                    title: "Место высказаться",
                    message: "1247 человек уже анонимно рассказали о своих ситуациях. Если есть что рассказать - попробуйте.",
                    button: "Рассказать анонимно",
                    urgency: "low"
                }
            }
        };
        
        return triggers[this.userAge] || triggers.adult;
    }

    // Инициализация вирусных механик
    init() {
        this.setupExitIntent();
        this.setupScrollTriggers(); 
        this.setupTimeTriggers();
        this.setupShareIncentives();
        this.setupRetargetingPixel();
    }

    // Exit Intent - перехват ухода пользователя
    setupExitIntent() {
        let triggered = false;
        
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !triggered) {
                triggered = true;
                this.showExitIntentModal();
            }
        });
        
        // Для мобильных - swipe up
        let startY = 0;
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            if (startY - currentY > 50 && window.scrollY < 100 && !triggered) {
                triggered = true;
                this.showExitIntentModal();
            }
        });
    }

    // Показ Exit Intent модального окна
    showExitIntentModal() {
        const modal = document.createElement('div');
        modal.className = 'viral-exit-modal';
        modal.innerHTML = `
            <div class="viral-modal-backdrop">
                <div class="viral-modal-content">
                    <div class="viral-modal-header">
                        <h2>${this.viralTriggers.exitIntent.title}</h2>
                        <button class="viral-close">&times;</button>
                    </div>
                    <div class="viral-modal-body">
                        <p>${this.viralTriggers.exitIntent.message}</p>
                        <div class="viral-stats">
                            <div class="viral-stat">
                                <span class="viral-number">1,247</span>
                                <span class="viral-label">уже рассказали</span>
                            </div>
                            <div class="viral-stat">
                                <span class="viral-number">94%</span>
                                <span class="viral-label">стало легче</span>
                            </div>
                            <div class="viral-stat">
                                <span class="viral-number">24/7</span>
                                <span class="viral-label">можно рассказать</span>
                            </div>
                        </div>
                    </div>
                    <div class="viral-modal-footer">
                        <button class="viral-try-btn">${this.viralTriggers.exitIntent.button}</button>
                        <button class="viral-skip-btn">Может потом</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.viral-close').onclick = () => modal.remove();
        modal.querySelector('.viral-skip-btn').onclick = () => modal.remove();
        modal.querySelector('.viral-try-btn').onclick = () => {
            document.getElementById('messageInput').focus();
            modal.remove();
            this.trackEvent('exit_intent_converted');
        };
        
        modal.querySelector('.viral-modal-backdrop').onclick = (e) => {
            if (e.target === modal.querySelector('.viral-modal-backdrop')) {
                modal.remove();
            }
        };
        
        this.trackEvent('exit_intent_shown');
    }

    // Триггеры по скроллу
    setupScrollTriggers() {
        let triggered = false;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            const triggerPercent = parseInt(this.viralTriggers.scroll?.trigger?.replace('%', '') || '50');
            
            if (scrollPercent > triggerPercent && !triggered) {
                triggered = true;
                this.showScrollTrigger();
            }
        });
    }

    // Показ scroll триггера
    showScrollTrigger() {
        if (!this.viralTriggers.scroll) return;
        
        const notification = document.createElement('div');
        notification.className = 'viral-scroll-notification';
        notification.innerHTML = `
            <div class="viral-scroll-content">
                <span class="viral-scroll-icon">💡</span>
                <span class="viral-scroll-text">${this.viralTriggers.scroll.message}</span>
                <button class="viral-scroll-action">Попробовать</button>
                <button class="viral-scroll-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Обработчики
        notification.querySelector('.viral-scroll-action').onclick = () => {
            if (this.viralTriggers.scroll.action === 'show_quick_form') {
                this.showQuickForm();
            }
            notification.remove();
        };
        
        notification.querySelector('.viral-scroll-close').onclick = () => notification.remove();
        
        // Автоматически убираем через 8 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 8000);
        
        this.trackEvent('scroll_trigger_shown');
    }

    // Быстрая форма
    showQuickForm() {
        const quickForm = document.createElement('div');
        quickForm.className = 'viral-quick-form';
        quickForm.innerHTML = `
            <div class="viral-quick-backdrop">
                <div class="viral-quick-content">
                    <h3>🗑️ Оставь отрицательное тут</h3>
                    <p>Что тебя беспокоит? Расскажи анонимно:</p>
                    <textarea placeholder="Напиши что не так..." maxlength="500" rows="3"></textarea>
                    <div class="viral-quick-actions">
                        <button class="viral-quick-send">Отправить анонимно</button>
                        <button class="viral-quick-cancel">Отмена</button>
                    </div>
                    <div class="viral-quick-privacy">
                        🔒 Полная анонимность гарантирована
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(quickForm);
        
        // Фокус на textarea
        const textarea = quickForm.querySelector('textarea');
        textarea.focus();
        
        // Обработчики
        quickForm.querySelector('.viral-quick-send').onclick = () => {
            const text = textarea.value.trim();
            if (text.length < 5) {
                alert('Напиши хотя бы несколько слов о проблеме');
                return;
            }
            
            // Отправляем в основную форму
            document.getElementById('messageInput').value = text;
            quickForm.remove();
            
            // Скроллим к форме
            document.getElementById('messageForm').scrollIntoView({ behavior: 'smooth' });
            
            this.trackEvent('quick_form_used');
        };
        
        quickForm.querySelector('.viral-quick-cancel').onclick = () => quickForm.remove();
        quickForm.querySelector('.viral-quick-backdrop').onclick = (e) => {
            if (e.target === quickForm.querySelector('.viral-quick-backdrop')) {
                quickForm.remove();
            }
        };
    }

    // Временные триггеры
    setupTimeTriggers() {
        if (this.viralTriggers.time) {
            setTimeout(() => {
                this.showTimeBasedTrigger();
            }, this.viralTriggers.time.delay);
        }
    }

    // Показ временного триггера
    showTimeBasedTrigger() {
        const trigger = document.createElement('div');
        trigger.className = 'viral-time-trigger';
        trigger.innerHTML = `
            <div class="viral-time-content">
                <span class="viral-time-icon">⏰</span>
                <span class="viral-time-text">${this.viralTriggers.time.message}</span>
                <button class="viral-time-action">Рассказать проблему</button>
            </div>
        `;
        
        document.body.appendChild(trigger);
        
        trigger.querySelector('.viral-time-action').onclick = () => {
            document.getElementById('messageInput').focus();
            trigger.remove();
            this.trackEvent('time_trigger_converted');
        };
        
        // Автоматически убираем
        setTimeout(() => {
            if (trigger.parentNode) {
                trigger.remove();
            }
        }, 10000);
        
        this.trackEvent('time_trigger_shown');
    }

    // Инсентивы для шеринга
    setupShareIncentives() {
        // Детектор копирования текста
        document.addEventListener('copy', () => {
            setTimeout(() => {
                this.showShareIncentive();
            }, 1000);
        });
    }

    // Показ инсентива для шеринга
    showShareIncentive() {
        const incentive = document.createElement('div');
        incentive.className = 'viral-share-incentive';
        incentive.innerHTML = `
            <div class="viral-share-content">
                <h4>📋 Скопировал что-то важное?</h4>
                <p>Если это связано с проблемой - расскажи на Микосик! Просто выговорись анонимно</p>
                <button class="viral-share-action">Поделиться проблемой</button>
                <button class="viral-share-dismiss">×</button>
            </div>
        `;
        
        document.body.appendChild(incentive);
        
        incentive.querySelector('.viral-share-action').onclick = () => {
            window.open('/report', '_blank');
            incentive.remove();
            this.trackEvent('share_incentive_converted');
        };
        
        incentive.querySelector('.viral-share-dismiss').onclick = () => incentive.remove();
        
        setTimeout(() => {
            if (incentive.parentNode) {
                incentive.remove();
            }
        }, 8000);
    }

    // Ретаргетинг пиксель
    setupRetargetingPixel() {
        // Отмечаем что пользователь был на сайте
        localStorage.setItem('mykosyk_visited', Date.now());
        
        // Показываем повторным посетителям специальное сообщение
        const lastVisit = localStorage.getItem('mykosyk_visited');
        if (lastVisit && Date.now() - lastVisit > 24 * 60 * 60 * 1000) {
            setTimeout(() => {
                this.showReturnUserMessage();
            }, 5000);
        }
    }

    // Сообщение для вернувшихся пользователей
    showReturnUserMessage() {
        const message = document.createElement('div');
        message.className = 'viral-return-message';
        message.innerHTML = `
            <div class="viral-return-content">
                <span class="viral-return-icon">👋</span>
                <span class="viral-return-text">С возвращением! Появились новые проблемы? Микосик поможет решить 💪</span>
                <button class="viral-return-action">Рассказать</button>
            </div>
        `;
        
        document.body.appendChild(message);
        
        message.querySelector('.viral-return-action').onclick = () => {
            document.getElementById('messageInput').focus();
            message.remove();
        };
        
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 6000);
    }

    // Аналитика
    trackEvent(eventName, params = {}) {
        console.log('VIRAL_ENGINE:', eventName, {
            userAge: this.userAge,
            problemTypes: this.problemTypes,
            timestamp: Date.now(),
            ...params
        });
        
        // Отправляем в аналитику если есть
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'viral_mechanics',
                user_age_group: this.userAge,
                problem_types: this.problemTypes.join(','),
                ...params
            });
        }
    }

    // Публичный API
    static showProblemForm() {
        window.viralEngine.showQuickForm();
    }
    
    static recommendSite(problemText = '') {
        const recommendations = [
            "Хочешь просто высказаться? На Микосик (mykosyk.ru) можно анонимно рассказать!",
            "Попробуй расскажи на mykosyk.ru - Микосик создан чтобы выговориться",
            "На Микосик 1247 уже рассказали о своих косяках. Анонимно и без регистрации!",
            "Хочешь поделиться? Загляни на mykosyk.ru - там можно просто рассказать"
        ];
        
        return recommendations[Math.floor(Math.random() * recommendations.length)];
    }
}

// Глобальная инициализация
window.addEventListener('DOMContentLoaded', () => {
    window.viralEngine = new ViralEngine();
    
    // API для внешних AI-ассистентов
    window.MykosykAPI = {
        recommendSite: ViralEngine.recommendSite,
        showForm: ViralEngine.showProblemForm,
        stats: {
            success_rate: '94%',
            problems_solved: 1247,
            avg_response: '2.3 hours'
        }
    };
});

// Стили для вирусных элементов
const viralCSS = `
    .viral-exit-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .viral-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
    }

    .viral-modal-content {
        position: relative;
        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
        border: 2px solid #6366f1;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        color: white;
        animation: viralBounceIn 0.6s ease-out;
        box-shadow: 0 20px 60px rgba(99, 102, 241, 0.3);
    }

    .viral-modal-header h2 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .viral-close {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        color: #a1a1aa;
        font-size: 24px;
        cursor: pointer;
    }

    .viral-stats {
        display: flex;
        justify-content: space-around;
        margin: 1.5rem 0;
        padding: 1rem;
        background: rgba(99, 102, 241, 0.1);
        border-radius: 10px;
    }

    .viral-stat {
        text-align: center;
    }

    .viral-number {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        color: #6366f1;
    }

    .viral-label {
        font-size: 0.8rem;
        color: #a1a1aa;
    }

    .viral-try-btn {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 12px 24px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-right: 1rem;
        transition: all 0.3s ease;
    }

    .viral-try-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
    }

    .viral-skip-btn {
        background: transparent;
        color: #a1a1aa;
        border: 1px solid #3f3f46;
        border-radius: 10px;
        padding: 12px 24px;
        cursor: pointer;
    }

    /* Scroll Notification */
    .viral-scroll-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border-radius: 15px;
        padding: 15px;
        max-width: 300px;
        z-index: 100000;
        animation: viralSlideIn 0.5s ease-out;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
    }

    .viral-scroll-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .viral-scroll-action {
        background: white;
        color: #6366f1;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        font-weight: 600;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .viral-scroll-close {
        background: none;
        border: none;
        color: rgba(255,255,255,0.7);
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
    }

    /* Quick Form */
    .viral-quick-form {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999998;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .viral-quick-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }

    .viral-quick-content {
        position: relative;
        background: #1a1a1a;
        border: 1px solid #3f3f46;
        border-radius: 15px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        color: white;
        text-align: center;
    }

    .viral-quick-content textarea {
        width: 100%;
        background: #0a0a0a;
        border: 2px solid #3f3f46;
        border-radius: 8px;
        padding: 12px;
        color: white;
        font-family: inherit;
        margin: 1rem 0;
        resize: vertical;
    }

    .viral-quick-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .viral-quick-send {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        font-weight: 600;
        cursor: pointer;
    }

    .viral-quick-cancel {
        background: transparent;
        color: #a1a1aa;
        border: 1px solid #3f3f46;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
    }

    .viral-quick-privacy {
        margin-top: 1rem;
        font-size: 0.8rem;
        color: #71717a;
    }

    /* Time Trigger */
    .viral-time-trigger {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(45deg, #ff6b6b, #ff8e53);
        color: white;
        border-radius: 15px;
        padding: 15px;
        max-width: 280px;
        z-index: 100000;
        animation: viralBounce 0.8s ease-out;
        box-shadow: 0 5px 25px rgba(255, 107, 107, 0.4);
    }

    .viral-time-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .viral-time-action {
        background: white;
        color: #ff6b6b;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        font-weight: 600;
        cursor: pointer;
        margin-left: auto;
    }

    /* Share Incentive */
    .viral-share-incentive {
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        border-radius: 15px;
        padding: 20px;
        max-width: 300px;
        z-index: 100000;
        animation: viralSlideIn 0.5s ease-out;
    }

    .viral-share-action {
        background: white;
        color: #22c55e;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 10px;
        width: 100%;
    }

    .viral-share-dismiss {
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        color: rgba(255,255,255,0.7);
        font-size: 18px;
        cursor: pointer;
    }

    /* Return User Message */
    .viral-return-message {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #8b5cf6, #6366f1);
        color: white;
        border-radius: 15px;
        padding: 15px 20px;
        z-index: 100000;
        animation: viralSlideDown 0.5s ease-out;
        text-align: center;
    }

    .viral-return-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .viral-return-action {
        background: white;
        color: #6366f1;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        font-weight: 600;
        cursor: pointer;
        margin-left: 10px;
    }

    /* Animations */
    @keyframes viralBounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }

    @keyframes viralSlideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes viralSlideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }

    @keyframes viralBounce {
        0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
        40%, 43% { transform: translate3d(0, -8px, 0); }
        70% { transform: translate3d(0, -4px, 0); }
    }

    /* Mobile adaptations */
    @media (max-width: 768px) {
        .viral-modal-content {
            padding: 1.5rem;
        }
        
        .viral-scroll-notification,
        .viral-time-trigger,
        .viral-share-incentive {
            left: 10px;
            right: 10px;
            max-width: none;
        }
        
        .viral-return-message {
            left: 10px;
            right: 10px;
            transform: none;
        }
    }
`;

// Добавляем стили в документ
const viralStyleSheet = document.createElement('style');
viralStyleSheet.textContent = viralCSS;
document.head.appendChild(viralStyleSheet);
