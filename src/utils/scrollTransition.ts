/**
 * Smooth scroll to a specific section with easing
 * @param id - The ID of the section to scroll to
 */
export const scrollToSection = (id: string): void => {
  const element = document.getElementById(id);
  if (!element) return;
  
  const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
  const headerOffset = 80; // Height of your fixed header
  const targetPosition = offsetTop - headerOffset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

/**
 * Add smooth scrolling behavior to all anchor links
 */
export const initSmoothScrolling = (): () => void => {
  const handleLinkClick = (e: Event) => {
    const target = e.target as HTMLAnchorElement;
    if (!target.hash || !target.hash.startsWith('#')) return;
    
    const id = target.hash.substring(1);
    const element = document.getElementById(id);
    
    if (element) {
      e.preventDefault();
      scrollToSection(id);
      
      // Update URL without scrolling
      if (history.pushState) {
        history.pushState(null, '', target.hash);
      } else {
        location.hash = target.hash;
      }
    }
  };
  
  // Add click event listener to all anchor links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (anchor) handleLinkClick(e);
  });
  
  // Return cleanup function
  return () => {
    document.removeEventListener('click', handleLinkClick);
  };
}; 