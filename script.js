document.addEventListener('DOMContentLoaded', () => {
    // Modal Selectors
    const modal = document.getElementById('investment-modal');
    const investmentCard = document.getElementById('investment-sector');
    const closeBtn = document.getElementById('modal-close-btn');

    // Open Modal
    if (investmentCard && modal) {
        // Accessibility support: click or Enter key
        investmentCard.addEventListener('click', openModal);
        investmentCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });
    }

    function openModal() {
        modal.style.display = 'block';
        // Add a tiny delay to allow display:block to apply before adding class for transition
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        closeBtn.focus(); // Accessibility: focus close button
    }

    // Close Modal
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        // Wait for CSS transition before hiding
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = ''; // Restore scrolling
        if (investmentCard) investmentCard.focus(); // Accessibility: return focus
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on outside click (backdrop)
    window.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Micro-interactions

    // 1. Sector Item selection (visual only for simple frontend)
    const sectorItems = document.querySelectorAll('.sector-item');
    sectorItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active state from all
            sectorItems.forEach(s => s.style.borderColor = 'transparent');
            // Add active state to clicked
            this.style.borderColor = 'var(--gold)';
        });
    });

    // 2. Buttons click effect
    const buttons = document.querySelectorAll('button:not(.modal-close)');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.animation = 'ripple-effect 0.6s linear';
            
            // Adjust relative position
            let rect = btn.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            
            // Ensure button has relative positioning and overflow hidden for ripple
            if (getComputedStyle(btn).position === 'static') {
                btn.style.position = 'relative';
            }
            btn.style.overflow = 'hidden';

            btn.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add dynamic CSS for the ripple effect injected via JS
const style = document.createElement('style');
style.innerHTML = `
@keyframes ripple-effect {
    0% {
        width: 0px;
        height: 0px;
        opacity: 0.5;
    }
    100% {
        width: 500px;
        height: 500px;
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
