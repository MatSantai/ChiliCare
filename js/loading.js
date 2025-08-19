/**
 * ChiliCare - Loading Module
 * Handles skeleton screens, loading states, and lazy loading
 */

const Loading = {
    // Initialize loading functionality
    init: function() {
        this.setupLazyLoading();
        this.setupGalleryLoading();
        console.log('Loading module initialized');
    },

    // Setup lazy loading for images
    setupLazyLoading: function() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            });

            // Observe all images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    },

    // Load a single image
    loadImage: function(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        // Show loading state
        this.showImageLoading(img);

        // Create new image to preload
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.classList.remove('lazy');
            this.hideImageLoading(img);
        };
        tempImg.onerror = () => {
            this.hideImageLoading(img);
            img.classList.add('error');
        };
        tempImg.src = src;
    },

    // Load all images (fallback)
    loadAllImages: function() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.loadImage(img);
        });
    },

    // Show image loading state
    showImageLoading: function(img) {
        img.classList.add('loading');
        if (!img.parentElement.querySelector('.skeleton')) {
            const skeleton = this.createImageSkeleton();
            img.parentElement.appendChild(skeleton);
        }
    },

    // Hide image loading state
    hideImageLoading: function(img) {
        img.classList.remove('loading');
        const skeleton = img.parentElement.querySelector('.skeleton');
        if (skeleton) {
            skeleton.remove();
        }
    },

    // Create image skeleton
    createImageSkeleton: function() {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton image-skeleton';
        skeleton.innerHTML = `
            <div class="skeleton-shimmer"></div>
        `;
        return skeleton;
    },

    // Setup gallery loading states
    setupGalleryLoading: function() {
        // This will be called after Gallery module is loaded
        if (window.Gallery) {
            this.integrateWithGallery();
        } else {
            // Wait for Gallery to be available
            setTimeout(() => {
                this.integrateWithGallery();
            }, 100);
        }
    },

    // Integrate with Gallery module
    integrateWithGallery: function() {
        if (!window.Gallery) return;
        
        // Override the existing gallery functions to include loading states
        const originalShowImage = Gallery.showImage;
        Gallery.showImage = function(index) {
            Loading.showGalleryLoading();
            originalShowImage.call(this, index);
        };

        const originalOpenGallery = Gallery.openGallery;
        Gallery.openGallery = function(section, sectionName, imageNumbers) {
            Loading.showGalleryLoading();
            originalOpenGallery.call(this, section, sectionName, imageNumbers);
        };
    },

    // Show gallery loading state
    showGalleryLoading: function() {
        const galleryImage = document.getElementById('galleryImage');
        if (galleryImage) {
            galleryImage.classList.add('loading');
            this.showGallerySkeleton();
        }
    },

    // Hide gallery loading state
    hideGalleryLoading: function() {
        const galleryImage = document.getElementById('galleryImage');
        if (galleryImage) {
            galleryImage.classList.remove('loading');
            this.hideGallerySkeleton();
        }
    },

    // Show gallery skeleton
    showGallerySkeleton: function() {
        const galleryContainer = document.getElementById('galleryContainer');
        if (galleryContainer && !galleryContainer.querySelector('.gallery-skeleton')) {
            const skeleton = this.createGallerySkeleton();
            galleryContainer.appendChild(skeleton);
        }
    },

    // Hide gallery skeleton
    hideGallerySkeleton: function() {
        const skeleton = document.querySelector('.gallery-skeleton');
        if (skeleton) {
            skeleton.remove();
        }
    },

    // Create gallery skeleton
    createGallerySkeleton: function() {
        const skeleton = document.createElement('div');
        skeleton.className = 'gallery-skeleton absolute inset-0 bg-white';
        skeleton.innerHTML = `
            <div class="skeleton-shimmer h-full w-full"></div>
        `;
        return skeleton;
    },

    // Create content skeleton
    createContentSkeleton: function(type = 'default') {
        const skeletons = {
            card: `
                <div class="skeleton-card bg-white rounded-2xl border p-5 shadow-card">
                    <div class="skeleton-image h-36 w-full rounded-xl mb-4"></div>
                    <div class="skeleton-title h-4 w-3/4 mb-2"></div>
                    <div class="skeleton-text h-3 w-full mb-1"></div>
                    <div class="skeleton-text h-3 w-2/3"></div>
                </div>
            `,
            testimonial: `
                <div class="skeleton-testimonial rounded-2xl border p-5 shadow-card">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="skeleton-avatar h-10 w-10 rounded-full"></div>
                        <div>
                            <div class="skeleton-name h-3 w-20 mb-1"></div>
                            <div class="skeleton-location h-2 w-24"></div>
                        </div>
                    </div>
                    <div class="skeleton-text h-3 w-full mb-1"></div>
                    <div class="skeleton-text h-3 w-5/6 mb-1"></div>
                    <div class="skeleton-text h-3 w-4/5"></div>
                </div>
            `,
            team: `
                <div class="skeleton-team bg-white rounded-lg shadow p-6 text-center">
                    <div class="skeleton-avatar mx-auto rounded-full mb-4 w-36 h-36"></div>
                    <div class="skeleton-name h-4 w-24 mx-auto mb-1"></div>
                    <div class="skeleton-role h-3 w-20 mx-auto mb-3"></div>
                    <div class="flex justify-center space-x-4">
                        <div class="skeleton-social h-4 w-4 rounded"></div>
                        <div class="skeleton-social h-4 w-4 rounded"></div>
                        <div class="skeleton-social h-4 w-4 rounded"></div>
                    </div>
                </div>
            `,
            default: `
                <div class="skeleton-default">
                    <div class="skeleton-title h-6 w-3/4 mb-4"></div>
                    <div class="skeleton-text h-4 w-full mb-2"></div>
                    <div class="skeleton-text h-4 w-5/6 mb-2"></div>
                    <div class="skeleton-text h-4 w-4/5"></div>
                </div>
            `
        };

        const template = document.createElement('template');
        template.innerHTML = skeletons[type] || skeletons.default;
        return template.content.firstElementChild;
    },

    // Show section loading
    showSectionLoading: function(sectionId, type = 'default') {
        const section = document.querySelector(sectionId);
        if (section) {
            const skeleton = this.createContentSkeleton(type);
            skeleton.classList.add('section-skeleton');
            section.appendChild(skeleton);
        }
    },

    // Hide section loading
    hideSectionLoading: function(sectionId) {
        const skeleton = document.querySelector(`${sectionId} .section-skeleton`);
        if (skeleton) {
            skeleton.remove();
        }
    }
};

// Export for use in other modules
window.Loading = Loading;
