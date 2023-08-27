// modified from https://gist.github.com/Kepler-69c/2395eafefa7199db79c70a0028f5a5f4
// # efficient & short dark mode in JavaScript
// short js snippet for dark mode, that listens to a button and to the theme change of the browser

// ## Features:
// - save preferred theme in localstorage until preferred theme and browser theme maches
// - changes theme at page load
// - short and efficient, without css classes or custom styles
// - works with all modern browsers:
//   - :white_check_mark: Chromium [Chrome, Brave, Edge, Opera]
//   - :white_check_mark: Firefox
//   - :white_check_mark: Safari [Epiphany]

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
  if (systemScheme === chosenScheme) localStorage.removeItem("scheme");
  return [chosenScheme, systemScheme];
}

// set giscus theme
function changeGiscus (theme) {
  function sendMessage(message) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (iframe) iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
  }
  sendMessage({ setConfig: { theme:theme } });
}

// Change the button icon
function changeIcon(scheme) {
  const schemeSVG = document.querySelector(".linkGrid button[aria-label='darkModeSwitcher'] svg");
  schemeSVG.innerHTML = scheme === "dark" ? feather.icons.sun.toSvg() : feather.icons.moon.toSvg();
}

// change system scheme and set localStorage
function changeScheme(reason) {
  if (reason == "browser" && scheme == getPreferred()[1]) return;
  scheme = (scheme === 'dark') ? 'light' : 'dark';
  if (reason == "button") localStorage.setItem("scheme", scheme);
  changeIcon(scheme);
  changeGiscus(scheme);
  document.documentElement.setAttribute('data-theme', scheme);
}

// if needed, change scheme on start
window.onload = () => {
  scheme = getPreferred()[0];
  document.documentElement.setAttribute('data-theme', scheme);
  changeIcon(scheme);
  changeGiscus(scheme);
}