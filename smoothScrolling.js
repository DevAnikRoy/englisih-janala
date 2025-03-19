// smooth scrolling function
function smoothScrolling(btn, section) {
    document.getElementById(btn).addEventListener('click', () => {
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
};

// for FAQ scroll
smoothScrolling('faq-btn', 'faq-section')
// for LEARN scroll
smoothScrolling('learn-btn', 'learn-section')
