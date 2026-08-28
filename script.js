// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            contact: document.getElementById('contact-input').value,
            package: document.getElementById('package').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Сохраняем в localStorage (для демо)
        const leads = JSON.parse(localStorage.getItem('filmpal_leads') || '[]');
        leads.push(formData);
        localStorage.setItem('filmpal_leads', JSON.stringify(leads));

        // Показываем успех
        const form = e.target;
        form.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 4rem; margin-bottom: 16px;">🎉</div>
                <h3 style="margin-bottom: 12px;">Спасибо за заявку!</h3>
                <p style="color: var(--gray);">Мы свяжемся с вами в течение часа.</p>
                <p style="color: var(--gray); font-size: 0.9rem; margin-top: 16px;">
                    Номер заявки: #${Math.floor(Math.random() * 10000)}
                </p>
            </div>
        `;

        console.log('Новая заявка:', formData);
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

// ===== CALCULATOR =====
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

// ===== FAQ ACCORDION =====
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

// ===== VIDEO PLACEHOLDER =====
document.addEventListener('DOMContentLoaded', function() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            // Здесь можно встроить реальное видео
            videoPlaceholder.innerHTML = `
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        style="border:0;border-radius:24px;" allowfullscreen></iframe>
            `;
        });
    }
});

// ===== ANIMATIONS ON SCROLL =====
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