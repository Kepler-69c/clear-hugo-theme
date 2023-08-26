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

// // improved and simplified code from https://stackoverflow.com/a/75124760
// document.querySelector('.linkGrid button[aria-label="darkModeSwitcher"]').addEventListener("click", toggleColorScheme);

// // send request to change giscus theme
// function changeGiscusTheme (theme) {
//   function sendMessage(message) {
//     const iframe = document.querySelector('iframe.giscus-frame');
//     if (!iframe) return;
//     iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
//   }

//   sendMessage({
//     setConfig: {
//       theme: theme
//     }
//   });
// }

// // get the systems color scheme
// function getPreferredColorScheme() {
//   const systemScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//   const chosenScheme = localStorage.getItem("scheme") || systemScheme;
//   if (systemScheme === chosenScheme) {
//     localStorage.removeItem("scheme");
//   }
//   return chosenScheme;
// }

// // save preferred color scheme to local storage
// function savePreferredColorScheme(scheme) {
//   const systemScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//   if (systemScheme === scheme) {
//     localStorage.removeItem("scheme");
//   } else {
//     localStorage.setItem("scheme", scheme);
//   }
// }

// // toggle the current color scheme
// function toggleColorScheme() {
//   const newScheme = getPreferredColorScheme() === "light" ? "dark" : "light";
//   changeSchemeIcon(newScheme);
//   applyPreferredColorScheme('dark');
// //   savePreferredColorScheme(newScheme);
// }

// Change the scheme icon
// function changeSchemeIcon(scheme) {
//   const schemeSVG = document.querySelector(".linkGrid button[aria-label='darkModeSwitcher'] svg");
//   schemeSVG.innerHTML = scheme === "dark" ? feather.icons.sun.toSvg() : feather.icons.moon.toSvg();
// }

// apply the scheme by traversing the stylesheet rules, and applying a medium
// function applyPreferredColorScheme(scheme) {
//   for (let s = 0; s < document.styleSheets.length; s++) {
//     if (!(document.styleSheets[s].href).includes("clear_sass")) {
//       continue;
//     } else {

//       const rules = document.styleSheets[s].cssRules;

//       for (let i = 0; i < rules.length; i++) {
//         const rule = rules[i];
//         if (rule && rule.media && rule.media.mediaText.includes("prefers-color-scheme")) {
//           switch (scheme) {
//             case "light":
//               rule.media.appendMedium("original-prefers-color-scheme");
//               if (rule.media.mediaText.includes("light")) rule.media.deleteMedium("(prefers-color-scheme: light)");
//               if (rule.media.mediaText.includes("dark")) rule.media.deleteMedium("(prefers-color-scheme: dark)");
//               break;
//             case "dark":
//               rule.media.appendMedium("(prefers-color-scheme: light)");
//               rule.media.appendMedium("(prefers-color-scheme: dark)");
//               if (rule.media.mediaText.includes("original")) rule.media.deleteMedium("original-prefers-color-scheme");
//               break;
//             default:
//               rule.media.appendMedium("(prefers-color-scheme: dark)");
//               if (rule.media.mediaText.includes("light")) rule.media.deleteMedium("(prefers-color-scheme: light)");
//               if (rule.media.mediaText.includes("original")) rule.media.deleteMedium("original-prefers-color-scheme");
//               break;
//           }
//         }
//       }
//     }
//   }
// //   changeGiscusTheme(scheme);
// }

// window.onload = function() {
//   const startScheme = getPreferredColorScheme();
//   changeSchemeIcon(startScheme);
//   applyPreferredColorScheme(startScheme);
//   changeGiscusTheme(startScheme);
// }