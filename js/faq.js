/**
 * ChiliCare - FAQ Module
 * Handles FAQ toggle functionality and show more/less features
 */

// Simple FAQ functionality
function toggleFAQ(button) {
    console.log('toggleFAQ called');
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('i');
    
    console.log('Elements found:', { faqItem, answer, icon });
    
    if (answer.style.display === 'none' || answer.classList.contains('hidden')) {
        // Show answer
        answer.classList.remove('hidden');
        answer.style.display = 'block';
        answer.style.maxHeight = '500px';
        answer.style.opacity = '1';
        icon.style.transform = 'rotate(180deg)';
        button.classList.add('bg-slate-50');
        console.log('FAQ answer shown');
    } else {
        // Hide answer
        answer.classList.add('hidden');
        answer.style.display = 'none';
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        icon.style.transform = 'rotate(0deg)';
        button.classList.remove('bg-slate-50');
        console.log('FAQ answer hidden');
    }
}

function toggleShowMoreFaq() {
    console.log('toggleShowMoreFaq called');
    const hiddenFaqs = document.getElementById('hiddenFaqs');
    const showMoreBtn = document.getElementById('showMoreFaqBtn');
    const btnIcon = showMoreBtn.querySelector('i');
    const btnText = showMoreBtn.querySelector('span');

    console.log('Show more elements:', { hiddenFaqs, showMoreBtn, btnIcon, btnText });

    if (hiddenFaqs.classList.contains('hidden')) {
        // Show more FAQs
        hiddenFaqs.classList.remove('hidden');
        btnIcon.className = 'fas fa-minus text-sm';
        btnText.textContent = 'Show Less Questions';
        console.log('More FAQs shown');
    } else {
        // Hide FAQs
        hiddenFaqs.classList.add('hidden');
        btnIcon.className = 'fas fa-plus text-sm';
        btnText.textContent = 'Show More Questions';
        console.log('FAQs hidden');
    }
}

// Make functions globally available
window.toggleFAQ = toggleFAQ;
window.toggleShowMoreFaq = toggleShowMoreFaq;

// Debug: Check if elements exist when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - checking FAQ elements...');
    
    const faqItems = document.querySelectorAll('.faq-item');
    const hiddenFaqs = document.getElementById('hiddenFaqs');
    const showMoreBtn = document.getElementById('showMoreFaqBtn');
    
    console.log('FAQ elements found:', {
        faqItems: faqItems.length,
        hiddenFaqs: hiddenFaqs,
        showMoreBtn: showMoreBtn
    });
    
    // Check first FAQ item
    if (faqItems.length > 0) {
        const firstFaq = faqItems[0];
        const firstAnswer = firstFaq.querySelector('.faq-answer');
        const firstButton = firstFaq.querySelector('.faq-question');
        
        console.log('First FAQ item:', {
            faqItem: firstFaq,
            answer: firstAnswer,
            button: firstButton,
            answerClasses: firstAnswer ? firstAnswer.className : 'no answer found',
            buttonClasses: firstButton ? firstButton.className : 'no button found'
        });
    }
});

console.log('FAQ module loaded - functions available:', {
    toggleFAQ: typeof window.toggleFAQ,
    toggleShowMoreFaq: typeof window.toggleShowMoreFaq
});


