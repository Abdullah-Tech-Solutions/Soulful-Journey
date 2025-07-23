// Amazing Souls Guide - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSmoothScrolling();
    initImageLazyLoading();
    initTestimonialAnimation();
    initPurchaseTracking();
    initVideoPlayer();
    
    console.log('Amazing Souls Guide - Page loaded successfully');
});

// Video player functionality
function initVideoPlayer() {
    const videoContainer = document.querySelector('.video-container');
    const video = document.querySelector('.main-video');
    const overlay = document.querySelector('.video-overlay');
    
    if (video && overlay) {
        // Hide video controls initially
        video.controls = false;
        
        // Add click event to overlay
        overlay.addEventListener('click', playVideo);
        
        // Handle video events
        video.addEventListener('play', function() {
            videoContainer.classList.add('playing');
            trackEvent('video_play', 'engagement');
        });
        
        video.addEventListener('pause', function() {
            videoContainer.classList.remove('playing');
            video.controls = false;
            trackEvent('video_pause', 'engagement');
        });
        
        video.addEventListener('ended', function() {
            videoContainer.classList.remove('playing');
            video.controls = false;
            trackEvent('video_complete', 'engagement');
            
            // Show completion message
            showVideoCompletionMessage();
        });
        
        // Track video progress
        let quartiles = [25, 50, 75];
        video.addEventListener('timeupdate', function() {
            const progress = (video.currentTime / video.duration) * 100;
            
            quartiles.forEach((quartile, index) => {
                if (progress >= quartile && !video.dataset[`q${quartile}`]) {
                    video.dataset[`q${quartile}`] = 'true';
                    trackEvent(`video_${quartile}`, 'engagement');
                }
            });
        });
    }
}

// Play video function
function playVideo() {
    const video = document.querySelector('.main-video');
    const videoContainer = document.querySelector('.video-container');
    
    if (video) {
        video.controls = true;
        video.play().then(() => {
            videoContainer.classList.add('playing');
        }).catch(error => {
            console.error('Error playing video:', error);
            // Fallback for autoplay restrictions
            video.controls = true;
            videoContainer.classList.add('playing');
        });
    }
}

// Show video completion message
function showVideoCompletionMessage() {
    const message = document.createElement('div');
    message.className = 'video-completion-message';
    message.innerHTML = `
        <div class="completion-content">
            <i class="fas fa-heart"></i>
            <h4>Ready to Transform Your Love Life?</h4>
            <p>You've just experienced a glimpse of the powerful healing techniques inside the guide.</p>
            <button class="btn btn-primary" onclick="scrollToOrder(); this.parentElement.parentElement.remove();">
                Get Your Complete Guide Now
            </button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .video-completion-message {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .completion-content {
            background: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
        }
        .completion-content i {
            font-size: 3rem;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        .completion-content h4 {
            margin-bottom: 15px;
            color: var(--text-primary);
        }
        .completion-content p {
            margin-bottom: 25px;
            color: var(--text-secondary);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(message);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        if (message.parentElement) {
            message.remove();
            style.remove();
        }
    }, 10000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to order section
function scrollToOrder() {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // If no order section, scroll to final CTA
        const finalCTA = document.querySelector('.final-cta-section');
        if (finalCTA) {
            finalCTA.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Track scroll action
    trackEvent('scroll_to_order', 'engagement');
}

// Initialize purchase process
function initiatePurchase() {
    // Track purchase initiation
    trackEvent('purchase_initiated', 'conversion');
    
    // Add visual feedback
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Processing...';
    button.disabled = true;
    
    // Simulate processing time
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        
        // In a real implementation, this would redirect to payment processor
        showPurchaseModal();
    }, 1500);
}

// Show purchase modal (mock functionality)
function showPurchaseModal() {
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Secure Checkout</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>You're about to purchase:</p>
                <h4>The Inner Work of Relationships Guide</h4>
                <div class="price-display">
                    <span class="current-price">$19.90</span>
                    <span class="original-price">$58.00</span>
                </div>
                <p><strong>60-Day Money-Back Guarantee</strong></p>
                <p>Instant download after purchase</p>
                <button class="btn btn-primary proceed-btn" onclick="proceedToPayment()">
                    Proceed to Secure Payment
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .purchase-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            padding: 0;
            max-width: 400px;
            width: 90%;
            max-height: 90vh;
            overflow: auto;
            animation: slideIn 0.3s ease;
        }
        .modal-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h3 {
            margin: 0;
            color: var(--text-primary);
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--text-muted);
            transition: color 0.3s ease;
        }
        .close-modal:hover {
            color: var(--text-primary);
        }
        .modal-body {
            padding: 20px;
            text-align: center;
        }
        .price-display {
            margin: 20px 0;
        }
        .current-price {
            font-size: 1.8rem;
            font-weight: bold;
            color: var(--primary-color);
            margin-right: 10px;
        }
        .original-price {
            text-decoration: line-through;
            color: var(--text-muted);
        }
        .proceed-btn {
            margin-top: 20px;
            width: 100%;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', function() {
        closeModal(modal, style);
    });
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal, style);
        }
    });
    
    // Close on escape key
    const handleEscape = function(e) {
        if (e.key === 'Escape') {
            closeModal(modal, style);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Close modal function
function closeModal(modal, style) {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (modal.parentElement) {
            document.body.removeChild(modal);
        }
        if (style.parentElement) {
            document.head.removeChild(style);
        }
    }, 300);
}

// Proceed to payment (mock)
function proceedToPayment() {
    alert('In a real implementation, this would redirect to the secure payment processor (Stripe, PayPal, etc.)');
    trackEvent('payment_page_accessed', 'conversion');
}

// Lazy loading for images
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        imageObserver.observe(img);
    });
}

// Testimonial animation on scroll
function initTestimonialAnimation() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(20px)';
        testimonial.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        testimonialObserver.observe(testimonial);
    });
}

// Purchase tracking and analytics
function initPurchaseTracking() {
    // Track page views
    trackEvent('page_view', 'engagement');
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track milestone scroll depths
            if (maxScroll >= 25 && maxScroll < 30) {
                trackEvent('scroll_25', 'engagement');
            } else if (maxScroll >= 50 && maxScroll < 55) {
                trackEvent('scroll_50', 'engagement');
            } else if (maxScroll >= 75 && maxScroll < 80) {
                trackEvent('scroll_75', 'engagement');
            } else if (maxScroll >= 90) {
                trackEvent('scroll_90', 'engagement');
            }
        }
    });
    
    // Track time on page
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage += 10;
        
        // Track time milestones
        if (timeOnPage === 30) {
            trackEvent('time_30s', 'engagement');
        } else if (timeOnPage === 60) {
            trackEvent('time_60s', 'engagement');
        } else if (timeOnPage === 120) {
            trackEvent('time_2min', 'engagement');
        }
    }, 10000);
    
    // Track button interactions
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cta-btn') || e.target.classList.contains('cta-btn-large')) {
            trackEvent('cta_click', 'engagement', e.target.textContent.trim());
        }
    });
}

// Event tracking function
function trackEvent(eventName, category, value = null) {
    // In a real implementation, this would send data to analytics service
    console.log(`Event tracked: ${eventName} (${category})`, value ? `Value: ${value}` : '');
    
    // You could integrate with Google Analytics, Facebook Pixel, etc.
    // Example for Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, {
    //         event_category: category,
    //         value: value
    //     });
    // }
}

// Button hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('cta-btn') || e.target.classList.contains('cta-btn-large')) {
        e.target.style.transform = 'translateY(-2px) scale(1.02)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('cta-btn') || e.target.classList.contains('cta-btn-large')) {
        e.target.style.transform = 'translateY(0) scale(1)';
    }
});

// Form validation for future contact forms
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function for smooth animations
function animateElement(element, property, from, to, duration = 300) {
    const start = performance.now();
    
    function animate(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = from + (to - from) * progress;
        element.style[property] = current + (property.includes('opacity') ? '' : 'px');
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Mobile menu toggle (if needed for future enhancements)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const modal = document.querySelector('.purchase-modal');
        if (modal) {
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.click();
            }
        }
    }
    
    // Navigate buttons with keyboard
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('cta-btn') || e.target.classList.contains('cta-btn-large')) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Performance monitoring
function measurePerformance() {
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Track performance metrics
        trackEvent('page_load_time', 'performance', Math.round(loadTime));
    });
}

// Initialize performance monitoring
measurePerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    trackEvent('js_error', 'error', e.filename + ':' + e.lineno);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    trackEvent('promise_rejection', 'error');
});

// Add fadeOut animation for modals
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);
