/**
 * ChiliCare - Main JavaScript File
 * Core functionality and initialization
 */

// Global variables
let currentSection = null;
let currentImageIndex = 0;
let currentImages = [];

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('ChiliCare initialized');
    
    // Initialize all modules
    Navigation.init();
    Gallery.init();
    Loading.init();
    
    // Add any additional initialization here
});

// Utility functions
const Utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Smooth scroll utility
    smoothScrollTo: function(element, offset = 0) {
        if (!element) return;
        
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        
        const scrollTo = elementTop - (windowHeight - elementHeight) / 2 - offset;
        
        window.scrollTo({
            top: Math.max(0, scrollTo),
            behavior: 'smooth'
        });
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for use in other modules
window.Utils = Utils;
