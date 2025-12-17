const SELECTOR = '[data-zoomable="true"]';
const BODY_ACTIVE_CLASS = 'zoom-active';

const state = {
  active: false,
  scrollY: 0,
  trigger: null,
};

const gestureListeners = [];

function qs(root, selector) {
  return root ? root.querySelector(selector) : null;
}



function applyGestureListener(target, event, handler, options) {
  target.addEventListener(event, handler, options);
  gestureListeners.push(() => target.removeEventListener(event, handler, options));
}

function unbindGestures() {
  while (gestureListeners.length) {
    const dispose = gestureListeners.pop();
    dispose();
  }
}

function createOverlayController() {
  const overlay = document.querySelector('[data-zoom-overlay]');
  if (!overlay) return null;

  const overlayImage = qs(overlay, '[data-zoom-image]');

  const closeOverlay = () => {
    if (!state.active) return;
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove(BODY_ACTIVE_CLASS);
    if (overlayImage) {
      overlayImage.removeAttribute('src');
      overlayImage.removeAttribute('alt');
    }
    window.scrollTo(0, state.scrollY);
    if (state.trigger) {
      state.trigger.setAttribute('aria-expanded', 'false');
      state.trigger.focus({ preventScroll: true });
    }
    state.active = false;
    state.trigger = null;
    unbindGestures();
  };

  const gestureDismiss = (event) => {
    event.preventDefault();
    closeOverlay();
  };

  const scrollDismiss = () => {
    closeOverlay();
  };

  const openOverlay = (img) => {
    if (!img || !overlayImage) return;
    state.active = true;
    state.trigger = img;
    state.scrollY = window.scrollY || window.pageYOffset;
    const originalSrc = img.getAttribute('data-original-src') || img.currentSrc || img.src;
    overlayImage.src = originalSrc;
    overlayImage.alt = img.alt || '';
    overlay.classList.add('is-visible');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add(BODY_ACTIVE_CLASS);
    overlay.focus({ preventScroll: true });
    img.setAttribute('aria-expanded', 'true');

    applyGestureListener(window, 'wheel', gestureDismiss, { passive: false });
    applyGestureListener(window, 'touchmove', gestureDismiss, { passive: false });
    applyGestureListener(window, 'scroll', scrollDismiss, { passive: true });
  };

  const handleTrigger = (event) => {
    event.preventDefault();
    const trigger = event.currentTarget;
    if (state.active) {
      closeOverlay();
    } else {
      openOverlay(trigger);
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      closeOverlay();
    }
  };

  const handleOverlayClick = (event) => {
    // Close unless clicking directly on the image
    if (event.target !== overlayImage) {
      closeOverlay();
    }
  };

  const bind = () => {
    const triggers = document.querySelectorAll(SELECTOR);
    if (!triggers.length) {
      return;
    }
    triggers.forEach((img) => {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-expanded', 'false');
      img.addEventListener('click', handleTrigger);
      img.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleTrigger(event);
        }
      });
    });

    overlay.addEventListener('keydown', handleKeydown);
    overlay.addEventListener('click', handleOverlayClick);
  };

  return { bind };
}

function initImageZoom() {
  if (typeof window === 'undefined') return;
  const controller = createOverlayController();
  if (controller) {
    controller.bind();
  }
}

document.addEventListener('DOMContentLoaded', initImageZoom);
