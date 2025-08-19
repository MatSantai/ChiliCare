/**
 * ChiliCare - Navigation Module
 * Handles smooth scrolling, mobile menu, and navigation interactions
 */

const Navigation = {
    // Initialize navigation functionality
    init: function() {
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        console.log('Navigation module initialized');
    },

    // Setup smooth scrolling for all navigation links
    setupSmoothScrolling: function() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigationClick(link);
            });
        });
    },

    // Handle navigation link clicks
    handleNavigationClick: function(link) {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetId === '#top') {
            // Scroll to top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (targetSection) {
            // Special handling for features section to center the phone
            if (targetId === '#features') {
                const phoneElement = document.getElementById('phone');
                if (phoneElement) {
                    Utils.smoothScrollTo(phoneElement);
                }
            } else {
                // For other sections, center the entire section
                Utils.smoothScrollTo(targetSection);
            }
        }

        // Close mobile menu if open
        this.closeMobileMenu();
    },

    // Setup mobile menu functionality
    setupMobileMenu: function() {
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    },

    // Close mobile menu
    closeMobileMenu: function() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    },

    // Update active navigation link based on scroll position
    updateActiveNavLink: function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        const scrollPosition = window.pageYOffset + 300; // Increased offset for better detection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            // Check if the scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary');
            }
        });
    }
};

// Add scroll event listener for active navigation highlighting
window.addEventListener('scroll', Utils.debounce(() => {
    Navigation.updateActiveNavLink();
}, 100));

// Export for use in other modules
window.Navigation = Navigation;
