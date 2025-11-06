const MEDIA_QUERY = '(min-width: 640px)';
const OPEN_LABEL = 'Hide navigation menu';
const CLOSED_LABEL = 'Show navigation menu';

function whenMatchMediaChanges(mediaQueryList, listener) {
  if (mediaQueryList.addEventListener) {
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }

  // Fallback for older browsers (e.g., Safari < 14)
  mediaQueryList.addListener(listener);
  return () => mediaQueryList.removeListener(listener);
}

function updateIcons({ openIcon, closeIcon }, isOpen) {
  if (openIcon) {
    openIcon.hidden = isOpen;
  }

  if (closeIcon) {
    closeIcon.hidden = !isOpen;
  }
}

function updateToggleLabel(stateEl, isOpen) {
  if (!stateEl) return;

  stateEl.textContent = isOpen ? OPEN_LABEL : CLOSED_LABEL;
}

function trapFocus(event, firstEl, lastEl, toggle, isOpen) {
  if (!isOpen || event.key !== 'Tab') {
    return;
  }

  if (event.shiftKey && document.activeElement === firstEl) {
    event.preventDefault();
    toggle.focus();
  } else if (!event.shiftKey && document.activeElement === lastEl) {
    event.preventDefault();
    toggle.focus();
  }
}

export function initMobileMenu(root = document) {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const toggle = root.querySelector('[data-mobile-menu-toggle]');
  const menu = root.querySelector('[data-mobile-menu]');

  if (!toggle || !menu) {
    return undefined;
  }

  const mediaQueryList = window.matchMedia(MEDIA_QUERY);
  const stateEl = toggle.querySelector('[data-mobile-menu-state]');
  const openIcon = toggle.querySelector('[data-mobile-menu-icon-open]');
  const closeIcon = toggle.querySelector('[data-mobile-menu-icon-close]');
  const links = Array.from(menu.querySelectorAll('[data-mobile-menu-link]'));
  const firstLink = links[0] ?? null;
  const lastLink = links[links.length - 1] ?? null;

  let isOpen = true; // default open for progressive enhancement; we close during init

  const setState = (open, { returnFocus = false } = {}) => {
    isOpen = open;
    toggle.setAttribute('aria-expanded', String(open));
    menu.dataset.state = open ? 'open' : 'closed';

    updateIcons({ openIcon, closeIcon }, open);
    updateToggleLabel(stateEl, open);

    if (!open && returnFocus) {
      toggle.focus();
    }
  };

  const openMenu = () => {
    if (isOpen) return;
    setState(true);
    if (firstLink) {
      firstLink.focus({ preventScroll: true });
    }
  };

  const closeMenu = (options = {}) => {
    if (!isOpen) return;
    setState(false, options);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu({ returnFocus: true });
    } else {
      openMenu();
    }
  };

  const handleToggleClick = (event) => {
    event.preventDefault();
    toggleMenu();
  };

  const handleDocumentKeydown = (event) => {
    if (!isOpen || event.key !== 'Escape') {
      return;
    }

    event.stopPropagation();
    event.preventDefault();
    closeMenu({ returnFocus: true });
  };

  const handleLinkInteraction = (event) => {
    if (event.type === 'click') {
      closeMenu({ returnFocus: true });
    } else if (event.type === 'keydown' && event.key === 'Escape') {
      event.preventDefault();
      closeMenu({ returnFocus: true });
    }
  };

  const handleMenuKeydown = (event) => {
    if (!firstLink || !lastLink) return;
    trapFocus(event, firstLink, lastLink, toggle, isOpen);
  };

  const handleBreakpointChange = (evt) => {
    if (evt.matches) {
      closeMenu();
    }
  };

  toggle.addEventListener('click', handleToggleClick);
  menu.addEventListener('keydown', handleMenuKeydown);
  document.addEventListener('keydown', handleDocumentKeydown);
  const detachBreakpoint = whenMatchMediaChanges(mediaQueryList, handleBreakpointChange);

  links.forEach((link) => {
    link.addEventListener('click', handleLinkInteraction);
    link.addEventListener('keydown', handleLinkInteraction);
  });

  // Close immediately on init to respect progressive enhancement default markup
  closeMenu();

  return () => {
    toggle.removeEventListener('click', handleToggleClick);
    menu.removeEventListener('keydown', handleMenuKeydown);
    document.removeEventListener('keydown', handleDocumentKeydown);
    detachBreakpoint();
    links.forEach((link) => {
      link.removeEventListener('click', handleLinkInteraction);
      link.removeEventListener('keydown', handleLinkInteraction);
    });
  };
}

function start() {
  initMobileMenu(document);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}
