/* Dark/light theme toggle using the `pullcord` React component (https://www.npmjs.com/package/pullcord).
 * The site is static HTML, so React + pullcord are loaded as pinned ES modules from esm.sh. */
import { createElement as h, useState, useEffect } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client?deps=react@18.3.1';
import { PullCord } from 'https://esm.sh/pullcord@0.1.0?deps=react@18.3.1,react-dom@18.3.1';

var KEY = 'ff-theme';

function initial() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function App() {
  var state = useState(initial);
  var dark = state[0], setDark = state[1];
  useEffect(function () {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch (e) {}
  }, [dark]);
  return h(PullCord, {
    onPull: function () { setDark(function (d) { return !d; }); },
    pulled: dark,
    ariaLabel: 'Toggle dark theme'
  });
}

var mount = document.createElement('div');
mount.id = 'ff-pullcord';
document.body.appendChild(mount);
createRoot(mount).render(h(App));
