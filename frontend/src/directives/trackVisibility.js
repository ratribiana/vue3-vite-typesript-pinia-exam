// directives/trackVisibility.js
import { event } from 'vue-gtag';
export default {
  beforeMount(el, binding, vnode) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // 10% visibility
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger the vue-gtag event
          const { eventName, eventCategory, eventLabel } = binding.value;
          event(eventName, {
            event_category: eventCategory,
            event_label: eventLabel,
          });

          // Optionally: stop observing after it's logged once
          // observer.unobserve(el);
        }
      });
    }, options);

    observer.observe(el);
  },
};
