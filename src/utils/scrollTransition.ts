/**
 * Smooth scroll to a specific section with easing
 * @param id - The ID of the section to scroll to
 */
export const scrollToSection = (id: string): void => {
  const element = document.getElementById(id);
  if (!element) return;

  const header = document.querySelector('header');
  const headerRect = header?.getBoundingClientRect();
  const computedHeaderOffset = headerRect ? Math.ceil(headerRect.height) : 80;

  const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = offsetTop - computedHeaderOffset;

  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: 'smooth',
  });
};

/**
 * Add smooth scrolling behavior to all anchor links
 */
export const initSmoothScrolling = (): () => void => {
  const docClickHandler = (e: Event) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest('a') as HTMLAnchorElement | null;
    if (!anchor || !anchor.hash || !anchor.hash.startsWith('#')) return;

    const id = anchor.hash.substring(1);
    const element = document.getElementById(id);
    if (!element) return;

    e.preventDefault();
    scrollToSection(id);

    if (history.pushState) {
      history.pushState(null, '', anchor.hash);
    } else {
      location.hash = anchor.hash;
    }
  };

  document.addEventListener('click', docClickHandler);

  return () => {
    document.removeEventListener('click', docClickHandler);
  };
};