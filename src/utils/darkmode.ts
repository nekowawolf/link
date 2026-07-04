export function toggleDarkMode() {
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);
  const isDark = document.documentElement.classList.toggle('darkmode');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');

  if (isDark) {
    localStorage.setItem('darkmode', 'active');
    moonIcon?.classList.add('hidden');
    sunIcon?.classList.remove('hidden');
  } else {
    localStorage.removeItem('darkmode');
    moonIcon?.classList.remove('hidden');
    sunIcon?.classList.add('hidden');
  }

  const _ = window.getComputedStyle(css).opacity;
  document.head.removeChild(css);
}