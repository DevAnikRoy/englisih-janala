document.getElementById('logout-btn').addEventListener('click', () => {

    const sections = document.querySelectorAll('.hidden');
            document.getElementById('hero-section').style.display = 'block';

            sections.forEach(section => {
                section.style.display = 'none';
            });
})