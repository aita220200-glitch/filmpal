// ===== КОНФИГУРАЦИЯ ТЕЛЕГРАМ =====
const TELEGRAM_BOT_TOKEN = '8959451874:AAGy9-bOvsu_M3I5ytoHWgpUGnsk_l7-HQk';
const TELEGRAM_CHAT_ID = '6505251564';

// ===== ФУНКЦИЯ ОТПРАВКИ В ТЕЛЕГРАМ =====
async function sendToTelegram(formData) {
    const message = `
🎬 *Новая заявка с сайта FilmPal!*

👤 *Имя:* ${formData.name}
📱 *Контакт:* ${formData.contact}
📦 *Пакет:* ${formData.package}
📝 *Сообщение:* ${formData.message || 'Не указано'}
⏰ *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}
    `.trim();

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.ok;
    } catch (error) {
        console.error('Ошибка отправки:', error);
        return false;
    }
}

// ===== КОНТАКТНАЯ ФОРМА =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            contact: document.getElementById('contact-input').value,
            package: document.getElementById('package').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Показываем индикатор загрузки
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        // Отправляем в Telegram
        const sent = await sendToTelegram(formData);

        // Показываем результат
        if (sent) {
            contactForm.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <div style="font-size: 4rem; margin-bottom: 16px;">🎉</div>
                    <h3 style="margin-bottom: 12px;">Заявка отправлена!</h3>
                    <p style="color: var(--gray);">Мы свяжемся с вами в течение часа.</p>
                    <p style="color: var(--gray); font-size: 0.9rem; margin-top: 16px;">
                        Номер заявки: #${Math.floor(Math.random() * 10000)}
                    </p>
                </div>
            `;
        } else {
            // Если не удалось отправить в Telegram
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('Ошибка отправки. Попробуйте связаться с нами через WhatsApp или Telegram напрямую.');
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== КАЛЬКУЛЯТОР =====
const BASE_PRICE = 200;

const PRICES = {
    'calc-genres': 50,
    'calc-anime': 30,
    'calc-tv': 30,
    'calc-brand': 50,
    'calc-design': 40,
    'calc-animation': 30,
    'calc-analytics': 40,
    'calc-broadcast': 30,
    'calc-support': 50
};

function updateCalculator() {
    let total = BASE_PRICE;

    Object.keys(PRICES).forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox && checkbox.checked) {
            total += PRICES[id];
        }
    });

    const priceElement = document.getElementById('calc-price');
    if (priceElement) {
        priceElement.textContent = `$${total}`;
    }
}

// Инициализация калькулятора
document.addEventListener('DOMContentLoaded', function() {
    Object.keys(PRICES).forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', updateCalculator);
        }
    });
    updateCalculator();
});

// ===== FAQ АККОРДЕОН =====
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Закрываем все остальные
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Открываем/закрываем текущий
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// ===== ВИДЕО ПЛЕЙСХОЛДЕР =====
document.addEventListener('DOMContentLoaded', function() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            videoPlaceholder.innerHTML = `
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        style="border:0;border-radius:24px;" allowfullscreen></iframe>
            `;
        });
    }
});

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .why-item, .testimonial-card, .calc-group, .faq-item, .video-placeholder, .video-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});