const animatedScrollObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      // If the element is in view
      if (entry.isIntersecting) {
        // Add the 'is-visible' class to trigger CSS transitions
        entry.target.classList.add('is-visible');
        
        // Stop observing the element so it doesn't animate out and in repeatedly
        observer.unobserve(entry.target);
      }
    });
  },
  {
    // Trigger when 10% of the element is visible
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
  }
);

export default {
  mounted(el) {
    // Add base class required for all animations
    el.classList.add('animate-on-scroll');
    // Start observing
    animatedScrollObserver.observe(el);
  },
  unmounted(el) {
    // Clean up observer if element is destroyed
    animatedScrollObserver.unobserve(el);
  }
};
