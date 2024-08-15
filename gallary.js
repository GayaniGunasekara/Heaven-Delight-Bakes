document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll('.slider-wrapper');
    
    sliders.forEach(slider => {
        const imageList = slider.querySelector('.image-list');
        const prevButton = slider.querySelector('#prev-slide');
        const nextButton = slider.querySelector('#next-slide');
        
        let scrollAmount = 0;
        const scrollStep = 325 + 18; // image width + gap
        
        prevButton.addEventListener('click', () => {
            scrollAmount = Math.max(0, scrollAmount - scrollStep);
            imageList.scrollTo({
                top: 0,
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextButton.addEventListener('click', () => {
            const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
            scrollAmount = Math.min(maxScrollLeft, scrollAmount + scrollStep);
            imageList.scrollTo({
                top: 0,
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    });
});





