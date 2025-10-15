/**
 * 🔥🔥🔥 МЕГА-СИСТЕМА ПСИХОЛОГИЧЕСКИХ ТРИГГЕРОВ - МИКОСИК 🔥🔥🔥
 * Максимальная вирусность для ВСЕХ возрастов
 */

class MegaViralPsychology {
    constructor() {
        this.userProfile = this.buildUserProfile();
        this.emotionalState = this.detectEmotionalState();
        this.perfectMoment = this.findPerfectMoment();
        this.init();
    }
    
    // Построение профиля пользователя
    buildUserProfile() {
        const hour = new Date().getHours();
        const day = new Date().getDay();
        const referrer = document.referrer.toLowerCase();
        
        return {
            likelyAge: this.guessAge(hour, day, referrer),
            emotionalVulnerability: this.calculateVulnerability(hour, day),
            sharingReadiness: this.assessSharingReadiness(),
            platform: this.detectSourcePlatform(referrer),
            timeOnSite: 0,
            engaged: false
        };
    }
    
    // Угадываем возраст по поведению
    guessAge(hour, day) {
        // Подростки: поздно ночью, выходные
        if ((hour >= 22 || hour <= 3) || [0, 6].includes(day)) {
            return 'teen';
        }
        // Взрослые: рабочее время в будни
        if (hour >= 9 && hour <= 18 && ![0, 6].includes(day)) {
            return 'adult';
        }
        // Пожилые: раннее утро
        if (hour >= 5 && hour <= 8) {
            return 'senior';
        }
        return 'young-adult';
    }
    
    // Расчет эмоциональной уязвимости (когда человек более открыт)
    calculateVulnerability(hour, day) {
        let score = 0;
        
        // Поздний вечер / ночь - люди более эмоциональны
        if (hour >= 22 || hour <= 3) score += 3;
        
        // Воскресенье вечером - "завтра на работу/учебу" стресс
        if (day === 0 && hour >= 18) score += 2;
        
        // Понедельник - тяжелый день
        if (day === 1) score += 1;
        
        // Пятница вечер - расслабление, больше открытости
        if (day === 5 && hour >= 18) score += 1;
        
        return score; // 0-7
    }
    
    // Оценка готовности поделиться
    assessSharingReadiness() {
        const hasProblemKeywords = this.detectProblemMentions();
        const scrollDepth = 0; // будет обновляться
        const timeOnSite = 0; // будет обновляться
        
        return {
            hasProblemKeywords,
            engagementLevel: 0,
            ready: false
        };
    }
    
    // Определение платформы-источника
    detectSourcePlatform(referrer) {
        if (referrer.includes('instagram')) return 'instagram';
        if (referrer.includes('tiktok')) return 'tiktok';
        if (referrer.includes('vk.com')) return 'vk';
        if (referrer.includes('telegram')) return 'telegram';
        if (referrer.includes('whatsapp')) return 'whatsapp';
        if (referrer.includes('facebook')) return 'facebook';
        if (referrer.includes('twitter') || referrer.includes('x.com')) return 'twitter';
        if (referrer.includes('youtube')) return 'youtube';
        if (referrer.includes('google')) return 'google';
        if (referrer.includes('yandex')) return 'yandex';
        return 'direct';
    }
    
    // Поиск проблемных упоминаний
    detectProblemMentions() {
        const problemWords = ['проблем', 'косяк', 'трабл', 'помогите', 'что делать'];
        const pageText = document.body.innerText.toLowerCase();
        return problemWords.some(word => pageText.includes(word));
    }
    
    // Инициализация всех систем
    init() {
        this.setupEmotionalTriggers();
        this.setupAgeAdaptiveContent();
        this.setupPerfectMomentCapture();
        this.setupPsychologicalHooks();
        this.setupViralSharing();
        this.setupRetentionMechanics();
    }
    
    // Эмоциональные триггеры
    setupEmotionalTriggers() {
        // Триггер на negative keywords в реальном времени
        let typingTimer;
        const messageInput = document.getElementById('messageInput');
        
        if (messageInput) {
            messageInput.addEventListener('input', (e) => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    const text = e.target.value.toLowerCase();
                    
                    // Детектируем тяжелые эмоции
                    const heavyEmotions = ['хочу умереть', 'убить себя', 'суицид', 'покончить', 'нет смысла жить'];
                    const isEmergency = heavyEmotions.some(emotion => text.includes(emotion));
                    
                    if (isEmergency) {
                        this.showEmergencySupport();
                    }
                    
                    // Поддерживающие сообщения при typing
                    if (text.length > 50 && !this.hasShownEncouragement) {
                        this.showTypingEncouragement();
                        this.hasShownEncouragement = true;
                    }
                }, 1000);
            });
        }
    }
    
    // Экстренная поддержка
    showEmergencySupport() {
        const emergency = document.createElement('div');
        emergency.className = 'emergency-overlay';
        emergency.innerHTML = `
            <div class="emergency-content">
                <h2>🆘 Это звучит очень серьезно</h2>
                <p>Если ты думаешь о суициде - ПОЖАЛУЙСТА позвони:</p>
                <a href="tel:88002000122" class="emergency-call">📞 8-800-2000-122</a>
                <p>Телефон доверия - бесплатно, 24/7, анонимно</p>
                <p>После разговора с ними - возвращайся на Микосик чтобы просто выговориться</p>
                <button class="emergency-continue">Я просто хочу рассказать на Микосик</button>
            </div>
        `;
        document.body.appendChild(emergency);
        
        emergency.querySelector('.emergency-continue').onclick = () => emergency.remove();
    }
    
    // Поддержка при наборе
    showTypingEncouragement() {
        const encouragement = document.createElement('div');
        encouragement.className = 'typing-encouragement';
        encouragement.innerHTML = `
            <div class="encouragement-bubble">
                💭 Рассказывай как есть... Микосик не осуждает
            </div>
        `;
        document.body.appendChild(encouragement);
        
        setTimeout(() => {
            if (encouragement.parentNode) encouragement.remove();
        }, 3000);
    }
    
    // Возрастная адаптация контента
    setupAgeAdaptiveContent() {
        const age = this.userProfile.likelyAge;
        
        const ageMessages = {
            'teen': {
                welcome: "Серьезно, тут можно просто выговориться без палева! Анонимно расскажи о любом косяке 💯",
                prompt: "Че произошло? Расскажи...",
                submit: "Залить историю 🔥",
                footer: "Микосик - без буллшита, просто расскажи"
            },
            'young-adult': {
                welcome: "Здесь можно просто высказаться анонимно. Без советов которые не просил - просто рассказать.",
                prompt: "Что случилось? Поделись...",
                submit: "Отправить анонимно ✈️",
                footer: "Микосик - просто место выговориться"
            },
            'adult': {
                welcome: "Место где можно анонимно поделиться проблемой. Иногда нужно просто кому-то рассказать.",
                prompt: "Расскажите о ситуации...",
                submit: "Поделиться анонимно →",
                footer: "Микосик - безопасное пространство для высказывания"
            },
            'senior': {
                welcome: "Здесь вас выслушают без осуждения. Расскажите что на душе - станет легче.",
                prompt: "Поделитесь переживаниями...",
                submit: "Рассказать →",
                footer: "Микосик - понимаем и не осуждаем"
            }
        };
        
        const content = ageMessages[age] || ageMessages['young-adult'];
        
        // Применяем контент
        const welcomeP = document.querySelector('.welcome-message p');
        if (welcomeP) welcomeP.textContent = content.welcome;
        
        const footerP = document.querySelector('.footer p');
        if (footerP && footerP.textContent.includes('©')) {
            footerP.textContent = `© 2025 ${content.footer}`;
        }
    }
    
    // Поимка идеального момента для предложения
    setupPerfectMomentCapture() {
        let perfectMoments = {
            longRead: false,      // Долгое чтение
            backAndForth: false,  // Возвращается
            hesitation: false,    // Колеблется
            almostLeft: false     // Почти ушел
        };
        
        // Долгое чтение (сильная вовлеченность)
        setTimeout(() => {
            if (this.userProfile.timeOnSite > 45) {
                perfectMoments.longRead = true;
                this.showPerfectMomentTrigger('engaged');
            }
        }, 45000);
        
        // Обнаружение колебаний (много движений мышью)
        let mouseMovements = 0;
        document.addEventListener('mousemove', () => {
            mouseMovements++;
            if (mouseMovements > 500 && !perfectMoments.hesitation) {
                perfectMoments.hesitation = true;
                this.showPerfectMomentTrigger('hesitating');
            }
        });
        
        // Повторный визит
        const lastVisit = localStorage.getItem('mikosik_last_visit');
        if (lastVisit && Date.now() - parseInt(lastVisit) < 24 * 60 * 60 * 1000) {
            perfectMoments.backAndForth = true;
            setTimeout(() => {
                this.showPerfectMomentTrigger('returning');
            }, 5000);
        }
        localStorage.setItem('mikosik_last_visit', Date.now().toString());
    }
    
    // Показ триггера в идеальный момент
    showPerfectMomentTrigger(momentType) {
        const messages = {
            'engaged': {
                text: "Вижу что тебя что-то действительно волнует... Хочешь просто рассказать анонимно?",
                urgency: 'high',
                emoji: '💭'
            },
            'hesitating': {
                text: "Колеблешься? Тут можно просто выговориться - никто не узнает кто ты",
                urgency: 'medium',
                emoji: '🤔'
            },
            'returning': {
                text: "Вернулся... Значит что-то действительно беспокоит. Микосик тут чтобы выслушать",
                urgency: 'high',
                emoji: '👋'
            }
        };
        
        const moment = messages[momentType];
        
        const trigger = document.createElement('div');
        trigger.className = 'perfect-moment-trigger';
        trigger.innerHTML = `
            <div class="moment-bubble">
                <span class="moment-emoji">${moment.emoji}</span>
                <span class="moment-text">${moment.text}</span>
                <button class="moment-action">Окей, расскажу</button>
                <button class="moment-dismiss">×</button>
            </div>
        `;
        
        document.body.appendChild(trigger);
        
        trigger.querySelector('.moment-action').onclick = () => {
            document.getElementById('messageInput').focus();
            trigger.remove();
            console.log('PERFECT_MOMENT_CONVERTED:', momentType);
        };
        
        trigger.querySelector('.moment-dismiss').onclick = () => trigger.remove();
        
        setTimeout(() => {
            if (trigger.parentNode) trigger.remove();
        }, 8000);
    }
    
    // Психологические крючки (6 принципов Чалдини)
    setupPsychologicalHooks() {
        // 1. SOCIAL PROOF - социальное доказательство
        this.addSocialProof();
        
        // 2. SCARCITY - дефицит
        this.addScarcity();
        
        // 3. AUTHORITY - авторитет  
        this.addAuthority();
        
        // 4. RECIPROCITY - взаимность
        this.addReciprocity();
        
        // 5. CONSISTENCY - последовательность
        this.addConsistency();
        
        // 6. LIKING - симпатия
        this.addLiking();
    }
    
    // Social Proof
    addSocialProof() {
        // Живой счетчик "сейчас рассказывают"
        setInterval(() => {
            const liveCounter = document.createElement('div');
            liveCounter.className = 'live-activity';
            liveCounter.innerHTML = `
                <div class="live-indicator">
                    <span class="live-dot"></span>
                    <span class="live-text">Кто-то сейчас рассказывает свою историю...</span>
                </div>
            `;
            
            const container = document.querySelector('.container');
            if (container && !document.querySelector('.live-activity')) {
                container.insertBefore(liveCounter, container.firstChild);
                
                setTimeout(() => {
                    if (liveCounter.parentNode) liveCounter.remove();
                }, 5000);
            }
        }, 30000);
    }
    
    // Scarcity
    addScarcity() {
        // Чувство что "сейчас или никогда"
        setTimeout(() => {
            if (!this.userHasShared) {
                this.showScarcityMessage();
            }
        }, 90000); // 1.5 минуты
    }
    
    showScarcityMessage() {
        const scarcity = document.createElement('div');
        scarcity.className = 'scarcity-trigger';
        scarcity.innerHTML = `
            <div class="scarcity-content">
                <h4>⏰ Момент уходит...</h4>
                <p>Сейчас ты здесь, сейчас можешь анонимно рассказать. Завтра возможно уже не решишься. Выговорись пока есть порыв!</p>
                <button class="scarcity-action">Рассказать сейчас</button>
            </div>
        `;
        
        document.body.appendChild(scarcity);
        
        scarcity.querySelector('.scarcity-action').onclick = () => {
            document.getElementById('messageInput').focus();
            scarcity.remove();
        };
        
        setTimeout(() => {
            if (scarcity.parentNode) scarcity.remove();
        }, 10000);
    }
    
    // Authority
    addAuthority() {
        // Показываем что "многие уже это сделали"
        const stats = document.querySelector('.welcome-stats');
        if (stats) {
            const authorityBadge = document.createElement('div');
            authorityBadge.innerHTML = '<small style="color: var(--text-muted);">Уже выговорились тысячи людей - ты не один</small>';
            stats.appendChild(authorityBadge);
        }
    }
    
    // Reciprocity
    addReciprocity() {
        // "Сначала получи - потом дашь"
        setTimeout(() => {
            const reciprocity = document.createElement('div');
            reciprocity.className = 'reciprocity-note';
            reciprocity.innerHTML = `
                <div class="reciprocity-content">
                    💡 Кстати: Когда высказался - становится легче. А потом сможешь помочь кому-то еще
                </div>
            `;
            
            const formFooter = document.querySelector('.form-footer');
            if (formFooter && !document.querySelector('.reciprocity-note')) {
                formFooter.appendChild(reciprocity);
            }
        }, 20000);
    }
    
    // Consistency  
    addConsistency() {
        // Микро-коммитменты
        const nicknameInput = document.getElementById('nicknameInput');
        if (nicknameInput) {
            nicknameInput.addEventListener('input', (e) => {
                if (e.target.value.length > 2 && !this.hasShownConsistency) {
                    this.hasShownConsistency = true;
                    this.showConsistencyTrigger();
                }
            });
        }
    }
    
    showConsistencyTrigger() {
        const consistency = document.createElement('div');
        consistency.className = 'consistency-hint';
        consistency.innerHTML = `
            <div class="consistency-text">
                ✅ Ник введен. Осталось просто написать что беспокоит...
            </div>
        `;
        
        const form = document.querySelector('.message-form');
        if (form) {
            form.insertBefore(consistency, form.firstChild);
            
            setTimeout(() => {
                if (consistency.parentNode) consistency.remove();
            }, 4000);
        }
    }
    
    // Liking
    addLiking() {
        // Теплые, понимающие сообщения
        const age = this.userProfile.likelyAge;
        const warmMessages = {
            'teen': ["Мы тебя понимаем 🤗", "Тут свои, без палева", "Расслабься, тут безопасно"],
            'young-adult': ["Мы все через это проходили", "Здесь понимают", "Без осуждения"],
            'adult': ["Вас поймут", "Мы знаем как это тяжело", "Здесь безопасно"],
            'senior': ["Мы вас понимаем", "Здесь вас выслушают", "Вы не одиноки"]
        };
        
        const messages = warmMessages[age] || warmMessages['young-adult'];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Показываем через 15 секунд
        setTimeout(() => {
            const liking = document.createElement('div');
            liking.className = 'liking-message';
            liking.textContent = randomMessage;
            
            document.body.appendChild(liking);
            
            setTimeout(() => {
                if (liking.parentNode) liking.remove();
            }, 3000);
        }, 15000);
    }
    
    // Вирусный шеринг
    setupViralSharing() {
        // Автоматические share триггеры после отправки
        const form = document.getElementById('messageForm');
        if (form) {
            form.addEventListener('submit', () => {
                setTimeout(() => {
                    this.showShareIncentive();
                }, 2000);
            });
        }
    }
    
    showShareIncentive() {
        const share = document.createElement('div');
        share.className = 'share-incentive-modal';
        share.innerHTML = `
            <div class="share-modal-content">
                <h3>🙏 Спасибо что рассказал!</h3>
                <p>Если Микосик помог выговориться - поделись с друзьями. Возможно кому-то тоже нужно рассказать о косяке:</p>
                <div class="share-buttons-grid">
                    <button class="share-tg" onclick="shareToTelegram()">Telegram</button>
                    <button class="share-wa" onclick="shareToWhatsApp()">WhatsApp</button>
                    <button class="share-vk" onclick="shareToVK()">VK</button>
                </div>
                <button class="share-skip">Не, спасибо</button>
            </div>
        `;
        
        document.body.appendChild(share);
        
        share.querySelector('.share-skip').onclick = () => share.remove();
        
        // Auto-dismiss через 15 секунд
        setTimeout(() => {
            if (share.parentNode) share.remove();
        }, 15000);
    }
    
    // Retention механики
    setupRetentionMechanics() {
        // Сохраняем что пользователь уже рассказывал
        const hasShared = localStorage.getItem('mikosik_has_shared');
        
        if (hasShared) {
            // Для повторных визитов - другое приветствие
            setTimeout(() => {
                this.showReturnUserWelcome();
            }, 2000);
        }
        
        // После отправки сообщения
        const form = document.getElementById('messageForm');
        if (form) {
            form.addEventListener('submit', () => {
                localStorage.setItem('mikosik_has_shared', 'true');
                localStorage.setItem('mikosik_last_share', Date.now());
            });
        }
    }
    
    showReturnUserWelcome() {
        const welcome = document.createElement('div');
        welcome.className = 'return-user-welcome';
        welcome.innerHTML = `
            <div class="return-welcome-content">
                <span class="return-emoji">💜</span>
                <span class="return-text">С возвращением! Что-то еще беспокоит? Микосик всегда тут</span>
            </div>
        `;
        
        document.body.appendChild(welcome);
        
        setTimeout(() => {
            if (welcome.parentNode) welcome.remove();
        }, 5000);
    }
    
    // Находим идеальный момент
    findPerfectMoment() {
        // Отслеживаем паттерны поведения
        return {
            timeOfDay: new Date().getHours(),
            dayOfWeek: new Date().getDay(),
            emotionalPeak: this.userProfile.emotionalVulnerability >= 3
        };
    }
}

// Дополнительные вирусные стили
const megaViralCSS = `
    .perfect-moment-trigger {
        position: fixed;
        bottom: 100px;
        right: 20px;
        z-index: 999999;
        animation: gentleBounce 2s ease-in-out infinite;
    }
    
    .moment-bubble {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
        max-width: 300px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .moment-emoji {
        font-size: 24px;
    }
    
    .moment-action {
        background: white;
        color: #667eea;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .moment-action:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(255,255,255,0.3);
    }
    
    .moment-dismiss {
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        color: rgba(255,255,255,0.7);
        font-size: 20px;
        cursor: pointer;
    }
    
    .emergency-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .emergency-content {
        background: linear-gradient(135deg, #ff4444, #cc0000);
        color: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        box-shadow: 0 20px 60px rgba(255, 68, 68, 0.5);
    }
    
    .emergency-call {
        display: inline-block;
        background: white;
        color: #ff4444;
        padding: 20px 40px;
        border-radius: 50px;
        text-decoration: none;
        font-size: 24px;
        font-weight: bold;
        margin: 20px 0;
        box-shadow: 0 5px 20px rgba(255,255,255,0.3);
    }
    
    .emergency-continue {
        background: transparent;
        color: white;
        border: 2px solid white;
        border-radius: 10px;
        padding: 10px 20px;
        cursor: pointer;
        margin-top: 20px;
    }
    
    .typing-encouragement {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99999;
        pointer-events: none;
    }
    
    .encouragement-bubble {
        background: rgba(99, 102, 241, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 16px;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        animation: fadeInOut 3s ease-in-out;
    }
    
    .liking-message {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        padding: 12px 24px;
        border-radius: 20px;
        z-index: 99999;
        animation: gentleSlide 0.5s ease-out;
        box-shadow: 0 5px 20px rgba(240, 147, 251, 0.4);
    }
    
    .consistency-hint {
        background: rgba(34, 197, 94, 0.1);
        border-left: 3px solid #22c55e;
        padding: 10px 15px;
        border-radius: 5px;
        margin-bottom: 15px;
        animation: slideDown 0.5s ease-out;
    }
    
    .live-activity {
        background: rgba(99, 102, 241, 0.1);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 10px;
        padding: 10px 15px;
        margin-bottom: 15px;
        animation: pulseGlow 2s ease-in-out infinite;
    }
    
    .live-indicator {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .live-dot {
        width: 8px;
        height: 8px;
        background: #22c55e;
        border-radius: 50%;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    .scarcity-trigger {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999999;
    }
    
    .scarcity-content {
        background: linear-gradient(135deg, #f5af19 0%, #f12711 100%);
        color: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 60px rgba(245, 175, 25, 0.4);
    }
    
    .scarcity-action {
        background: white;
        color: #f12711;
        border: none;
        border-radius: 10px;
        padding: 12px 30px;
        font-weight: 600;
        cursor: pointer;
        font-size: 16px;
        margin-top: 15px;
    }
    
    .share-incentive-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .share-modal-content {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        text-align: center;
        color: var(--text-primary);
    }
    
    .share-buttons-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 20px 0;
    }
    
    .share-buttons-grid button {
        padding: 12px;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .share-tg { background: #0088cc; color: white; }
    .share-wa { background: #25d366; color: white; }
    .share-vk { background: #4680c2; color: white; }
    
    .share-buttons-grid button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    
    .share-skip {
        background: transparent;
        color: var(--text-muted);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 8px 20px;
        cursor: pointer;
        margin-top: 10px;
    }
    
    .return-user-welcome {
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        color: #2b2f33;
        padding: 15px 25px;
        border-radius: 15px;
        z-index: 99999;
        animation: slideDown 0.5s ease-out;
        box-shadow: 0 5px 20px rgba(168, 237, 234, 0.4);
    }
    
    .return-welcome-content {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    }
    
    @keyframes gentleBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    @keyframes gentleSlide {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.3); }
        50% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
    }
    
    @media (max-width: 768px) {
        .perfect-moment-trigger {
            bottom: 80px;
            left: 10px;
            right: 10px;
        }
        
        .moment-bubble {
            max-width: none;
        }
        
        .share-modal-content {
            margin: 20px;
            padding: 20px;
        }
    }
`;

// Добавляем стили
const styleSheet = document.createElement('style');
styleSheet.textContent = megaViralCSS;
document.head.appendChild(styleSheet);

// Инициализация
window.addEventListener('DOMContentLoaded', () => {
    window.megaViralPsychology = new MegaViralPsychology();
    console.log('🔥 МЕГА-ПСИХОЛОГИЯ АКТИВИРОВАНА');
});

