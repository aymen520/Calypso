// Calypso Coucou Beach - Digital Menu JavaScript

// Tab navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.menu-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');

    // Smooth scroll to content
    document.querySelector('.content').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add touch-friendly interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add touch feedback for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        item.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Prevent zoom on double tap for better mobile experience
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

// Add smooth scrolling for navigation
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Add a small delay for better visual feedback
        setTimeout(() => {
            this.blur(); // Remove focus outline on mobile
        }, 100);
    });
});

// Additional mobile optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Optimize for mobile viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(meta);
    }

    // Add loading animation for images
    const images = document.querySelectorAll('.menu-item-image');
    images.forEach(image => {
        // Add loading state
        image.style.transition = 'opacity 0.3s ease';
        
        // Check if background image loads
        const img = new Image();
        const bgImage = window.getComputedStyle(image).backgroundImage;
        const url = bgImage.slice(4, -1).replace(/"/g, "");
        
        if (url && url !== 'none') {
            img.onload = function() {
                image.style.opacity = '1';
            };
            img.onerror = function() {
                // Fallback if image fails to load
                image.style.opacity = '0.7';
            };
            img.src = url;
        }
    });

    // Add swipe navigation for mobile
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const diffX = startX - e.touches[0].clientX;
        const diffY = startY - e.touches[0].clientY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
            const tabs = document.querySelectorAll('.nav-tab');
            const activeTab = document.querySelector('.nav-tab.active');
            const currentIndex = Array.from(tabs).indexOf(activeTab);
            
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0 && currentIndex < tabs.length - 1) {
                    // Swipe left - next tab
                    tabs[currentIndex + 1].click();
                } else if (diffX < 0 && currentIndex > 0) {
                    // Swipe right - previous tab
                    tabs[currentIndex - 1].click();
                }
                
                startX = 0;
                startY = 0;
            }
        }
    });
});
