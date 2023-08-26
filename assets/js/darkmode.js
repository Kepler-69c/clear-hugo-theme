// short code for dark mode, that listens to a button and to the theme change of the browser
// features:
// - save preferred theme in localstorage until preferred theme and browser theme maches
// - change theme at page load
// - short and efficient, without css classes or custom styles
// - works with all modern browsers:
//   - Chromium [Chrome, Brave, Edge, Opera]
//   - Firefox
//   - Safari [Epiphany]

// button listener
document.querySelector('.linkGrid button[aria-label="darkModeSwitcher"]').addEventListener("click", () => changeScheme('button'));

// OS listener
const schemeChange = e => e.matches && changeScheme('browser');
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", schemeChange);
window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", schemeChange);

// return systemScheme unless localStorage is set;
function getPreferred() {
  const systemScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const chosenScheme = localStorage.getItem("scheme") || systemScheme;
  if (systemScheme === chosenScheme) {
    localStorage.removeItem("scheme");
  }
  return chosenScheme;
}

// change system scheme and set localStorage
function changeScheme(reason) {
  scheme = (scheme === 'dark') ? 'light' : 'dark';
  if (reason == "button") {localStorage.setItem("scheme", scheme)};
  // console.log(scheme);
  document.documentElement.setAttribute('data-theme', scheme);
}

// if needed, change scheme on start
window.onload = () => {
  scheme = getPreferred();
  document.documentElement.setAttribute('data-theme', scheme);
}