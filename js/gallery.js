/**
 * ChiliCare - Gallery Module
 * Handles phone mockup gallery, hover previews, and image navigation
 */

const Gallery = {
    // Initialize gallery functionality
    init: function() {
        this.setupHoverPreviews();
        this.setupKeyboardNavigation();
        this.setupTouchSupport();
        console.log('Gallery module initialized');
    },

    // Setup hover preview functionality for feature sections
    setupHoverPreviews: function() {
        const featureSections = document.querySelectorAll('.feature-hover');
        
        featureSections.forEach(section => {
            const sectionType = section.getAttribute('data-section');
            const imageNumbers = this.getImageNumbersForSection(sectionType);
            
            section.addEventListener('mouseenter', () => {
                this.showHoverPreview(sectionType, imageNumbers);
            });
            
            section.addEventListener('mouseleave', () => {
                this.hideHoverPreview();
            });
        });
    },

    // Get image numbers for each section
    getImageNumbersForSection: function(sectionType) {
        const imageMap = {
            'fertilizer': [1, 2],
            'soil': [3, 4],
            'plot-finder': [5, 6, 7, 8, 9, 10],
            'pest-detection': [11, 12],
            'microclimate': [13, 14]
        };
        
        return imageMap[sectionType] || [];
    },

    // Show hover preview
    showHoverPreview: function(section, imageNumbers) {
        if (currentSection === null) {
            const imageNumber = imageNumbers[0];
            const imagePath = `images/app-screenshot/${imageNumber}.png`;
            const galleryImage = document.getElementById('galleryImage');

            // Show preview image
            document.getElementById('defaultScreen').classList.add('hidden');
            document.getElementById('galleryContainer').classList.remove('hidden');
            galleryImage.src = imagePath;

            // Hide navigation controls for preview
            const navControls = document.querySelector('#galleryContainer .absolute');
            if (navControls) {
                navControls.style.display = 'none';
            }
        }
    },

    // Hide hover preview
    hideHoverPreview: function() {
        if (currentSection === null) {
            // Show default screen
            document.getElementById('galleryContainer').classList.add('hidden');
            document.getElementById('defaultScreen').classList.remove('hidden');

            // Show navigation controls again
            const navControls = document.querySelector('#galleryContainer .absolute');
            if (navControls) {
                navControls.style.display = 'flex';
            }
        }
    },

    // Open gallery for a specific section
    openGallery: function(section, sectionName, imageNumbers) {
        currentSection = section;
        currentImageIndex = 0;
        currentImages = imageNumbers;

        // Show first image
        this.showImage(0);

        // Show gallery, hide default screen
        document.getElementById('defaultScreen').classList.add('hidden');
        document.getElementById('galleryContainer').classList.remove('hidden');

        // Ensure navigation controls are visible
        const navControls = document.querySelector('#galleryContainer .absolute');
        if (navControls) {
            navControls.style.display = 'flex';
        }

        // Update navigation buttons
        this.updateNavigationButtons();

        // Highlight active section
        this.highlightActiveSection(section);
    },

    // Show specific image in gallery
    showImage: function(index) {
        const imageNumber = currentImages[index];
        const imagePath = `images/app-screenshot/${imageNumber}.png`;
        const galleryImage = document.getElementById('galleryImage');

        // Show loading state if Loading module is available
        if (window.Loading) {
            Loading.showGalleryLoading();
        }

        // Create new image to preload
        const tempImg = new Image();
        tempImg.onload = () => {
            galleryImage.src = imagePath;
            currentImageIndex = index;
            
            // Update counter
            document.getElementById('imageCounter').textContent = `${index + 1}/${currentImages.length}`;
            
            // Update navigation buttons
            this.updateNavigationButtons();
            
            // Hide loading state if Loading module is available
            if (window.Loading) {
                Loading.hideGalleryLoading();
            }
        };
        tempImg.onerror = () => {
            if (window.Loading) {
                Loading.hideGalleryLoading();
            }
            console.error('Failed to load image:', imagePath);
        };
        tempImg.src = imagePath;
    },

    // Navigate to next image
    nextImage: function() {
        if (currentImageIndex < currentImages.length - 1) {
            this.showImage(currentImageIndex + 1);
        }
    },

    // Navigate to previous image
    previousImage: function() {
        if (currentImageIndex > 0) {
            this.showImage(currentImageIndex - 1);
        }
    },

    // Update navigation button states
    updateNavigationButtons: function() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentImageIndex === 0;
            nextBtn.disabled = currentImageIndex === currentImages.length - 1;

            prevBtn.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentImageIndex === currentImages.length - 1 ? '0.5' : '1';
        }
    },

    // Close gallery
    closeGallery: function() {
        document.getElementById('galleryContainer').classList.add('hidden');
        document.getElementById('defaultScreen').classList.remove('hidden');

        // Reset current section to allow hover previews again
        currentSection = null;
        currentImageIndex = 0;
        currentImages = [];

        // Remove active section highlighting
        this.removeActiveSectionHighlight();
    },

    // Back to home (reset gallery)
    backToHome: function() {
        this.closeGallery();
    },

    // Highlight active section
    highlightActiveSection: function(section) {
        // Remove previous highlights
        this.removeActiveSectionHighlight();

        // Add highlight to current section
        const activeElement = document.querySelector(`[data-section="${section}"]`);
        if (activeElement) {
            activeElement.classList.add('ring-2', 'ring-primary', 'bg-primary/10', 'shadow-lg');
            // Force immediate visual feedback
            activeElement.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
            activeElement.style.borderColor = 'rgb(34, 197, 94)';
        }
    },

    // Remove active section highlighting
    removeActiveSectionHighlight: function() {
        const allSections = document.querySelectorAll('[data-section]');
        allSections.forEach(section => {
            section.classList.remove('ring-2', 'ring-primary', 'bg-primary/10', 'shadow-lg');
            // Remove inline styles
            section.style.backgroundColor = '';
            section.style.borderColor = '';
        });
    },

    // Setup keyboard navigation
    setupKeyboardNavigation: function() {
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('galleryContainer').classList.contains('hidden')) {
                return;
            }

            switch (e.key) {
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
                case 'Escape':
                    this.closeGallery();
                    break;
            }
        });
    },

    // Setup touch/swipe support for mobile
    setupTouchSupport: function() {
        let touchStartX = 0;
        let touchEndX = 0;

        const galleryContainer = document.getElementById('galleryContainer');
        
        if (galleryContainer) {
            galleryContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            galleryContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
            });
        }
    },

    // Handle swipe gestures
    handleSwipe: function(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                this.nextImage();
            } else {
                // Swipe right - previous image
                this.previousImage();
            }
        }
    }
};

// Make functions globally available for onclick handlers
window.openGallery = (section, sectionName, imageNumbers) => Gallery.openGallery(section, sectionName, imageNumbers);
window.nextImage = () => Gallery.nextImage();
window.previousImage = () => Gallery.previousImage();
window.closeGallery = () => Gallery.closeGallery();
window.backToHome = () => Gallery.backToHome();

// Export for use in other modules
window.Gallery = Gallery;
