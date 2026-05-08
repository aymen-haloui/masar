document.addEventListener('DOMContentLoaded', () => {
    // --- Modal Logic ---
    const modals = {
        investment: {
            el: document.getElementById('investment-modal'),
            trigger: document.getElementById('investment-sector'),
            close: document.getElementById('modal-close-btn')
        },
        service: {
            el: document.getElementById('service-modal'),
            close: document.getElementById('service-modal-close-btn'),
            title: document.getElementById('service-modal-title'),
            desc: document.getElementById('service-modal-desc'),
            container: document.getElementById('sub-services-container')
        }
    };

    // Sub-service Data
    const serviceData = {
        'legal-consult': {
            title: 'الاستشارات القانونية',
            desc: 'نخبة من المستشارين القانونيين في خدمتكم',
            actionLabel: 'ابدأ الاستشارة',
            subs: [
                { icon: '⚖️', title: 'القانون العقاري', desc: 'منازعات العقار والتوثيق' },
                { icon: '📜', title: 'القانون المدني', desc: 'العقود والالتزامات المدنية' },
                { icon: '🏛️', title: 'القانون الجزائي', desc: 'القضايا الجنائية والتمثيل القضائي' }
            ]
        },
        'financial-consult': {
            title: 'الاستشارات المالية',
            desc: 'تحليل مالي دقيق لمشاريعكم الاستثمارية',
            actionLabel: 'ابدأ الاستشارة',
            subs: [
                { icon: '📊', title: 'تكاليف التنفيذ', desc: 'دراسة وتحليل ميزانية التنفيذ' },
                { icon: '⚙️', title: 'تكاليف الإنتاج', desc: 'تحسين كفاءة وتكاليف الإنتاج' },
                { icon: '🚚', title: 'تكاليف التوزيع', desc: 'تخطيط وتوفير تكاليف اللوجستيك' }
            ]
        },
        'investment-ads': {
            title: 'الإعلانات الاستثمارية',
            desc: 'انشر إعلانك الاستثماري مقابل 2000 دج في القطاعات الأكثر طلبا على المنصة',
            actionLabel: 'احجز إعلانك الآن',
            subs: [
                { icon: '🏢', title: 'إعلانات عقارية', desc: 'شقق ومجمعات ومحلات ومشاريع تطوير عقاري' },
                { icon: '🏥', title: 'إعلانات صحية', desc: 'مصحات وعيادات وتجهيزات وخدمات طبية' },
                { icon: '🌾', title: 'إعلانات فلاحية', desc: 'مزارع وبيوت بلاستيكية وتجهيزات وسقي' },
                { icon: '🚛', title: 'إعلانات النقل', desc: 'شاحنات ولوجستيك ونقل بضائع ومسافرين' },
                { icon: '🏭', title: 'إعلانات صناعية', desc: 'ورشات ومصانع وخطوط إنتاج وشراكات' },
                { icon: '🏨', title: 'إعلانات خدماتية', desc: 'سياحة وتعليم وتقنية وخدمات مهنية' }
            ]
        }
    };

    function openModal(modalKey, dataKey = null) {
        const modal = modals[modalKey];
        if (!modal || !modal.el) return;

        // Populate dynamic content if needed
        if (modalKey === 'service' && dataKey && serviceData[dataKey]) {
            const data = serviceData[dataKey];
            modal.title.textContent = data.title;
            modal.desc.textContent = data.desc;
            const actionButton = document.getElementById('btn-service-action');
            if (actionButton && data.actionLabel) {
                actionButton.textContent = data.actionLabel;
            }
            
            modal.container.innerHTML = data.subs.map(sub => `
                <div class="sub-service-item">
                    <div class="sub-service-icon">${sub.icon}</div>
                    <div class="sub-service-title">${sub.title}</div>
                    <div class="sub-service-desc">${sub.desc}</div>
                </div>
            `).join('');

            // Add item click effect
            const items = modal.container.querySelectorAll('.sub-service-item');
            items.forEach(item => {
                item.addEventListener('click', function() {
                    items.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

        modal.el.style.display = 'block';
        setTimeout(() => modal.el.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
        if (modal.close) modal.close.focus();
    }

    function closeModal(modalKey) {
        const modal = modals[modalKey];
        if (!modal || !modal.el) return;

        modal.el.classList.remove('active');
        setTimeout(() => {
            modal.el.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }

    // Set up Investment Modal
    if (modals.investment.trigger) {
        modals.investment.trigger.addEventListener('click', () => openModal('investment'));
    }

    // Set up dynamic service cards
    ['legal-consult', 'financial-consult', 'investment-ads'].forEach(id => {
        const card = document.getElementById(id);
        if (card) {
            card.addEventListener('click', () => openModal('service', id));
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal('service', id);
                }
            });
        }
    });

    // Global Close handlers
    Object.keys(modals).forEach(key => {
        const m = modals[key];
        if (m.close) m.close.addEventListener('click', () => closeModal(key));
        
        m.el.addEventListener('click', (e) => {
            if (e.target === m.el || e.target.classList.contains('modal-backdrop')) {
                closeModal(key);
            }
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            Object.keys(modals).forEach(key => closeModal(key));
        }
    });

    // --- Star Rating Interactivity ---
    const starContainers = document.querySelectorAll('.star-rating');
    starContainers.forEach(container => {
        // Only make interactive if not explicitly static
        container.classList.add('interactive');
        const stars = container.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => {
                stars.forEach((s, i) => {
                    if (i <= index) s.classList.add('hover');
                    else s.classList.remove('hover');
                });
            });

            star.addEventListener('click', () => {
                stars.forEach((s, i) => {
                    if (i <= index) s.classList.add('active');
                    else s.classList.remove('active');
                });
            });
        });

        container.addEventListener('mouseleave', () => {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });

    // --- Button Ripples ---
    const buttons = document.querySelectorAll('button:not(.modal-close)');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            let rect = btn.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            
            if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
            btn.style.overflow = 'hidden';

            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Ripple CSS
const style = document.createElement('style');
style.innerHTML = `
.ripple {
    position: absolute;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    width: 20px;
    height: 20px;
    animation: ripple-anim 0.6s linear;
}
@keyframes ripple-anim {
    to { width: 500px; height: 500px; opacity: 0; }
}
.star.hover { color: var(--gold-dark) !important; scale: 1.1; }
`;
document.head.appendChild(style);
