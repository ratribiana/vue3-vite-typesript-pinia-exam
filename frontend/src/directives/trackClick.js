// directives/trackClick.js
import { event } from 'vue-gtag';

export default {
  beforeMount(el, binding, vnode) {
    el.addEventListener('click', () => {
      // Extract the details from the directive's binding value
      const { eventName, eventCategory, eventLabel } = binding.value;

      event(eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
      });
    });
  },
};
