// ==UserScript==
// @name           Alt Hover Reveal
// @description    Zen compact mode: sidebar/toolbar only reveal on hover while Left Alt is held
// @include        main
// ==/UserScript==

(() => {
  "use strict";

  // Zen's own switch for "reveal sidebar/toolbar when the cursor hits the edge".
  const PREF = "zen.view.compact.show-sidebar-and-toolbar-on-hover";

  if (window.__altHoverRevealInit) return;
  window.__altHoverRevealInit = true;

  const setHover = (enabled) => {
    try {
      if (Services.prefs.getBoolPref(PREF, true) !== enabled) {
        Services.prefs.setBoolPref(PREF, enabled);
      }
    } catch (e) {
      console.error("[alt-hover-reveal]", e);
    }
  };

  // Default state: hover reveal OFF.
  setHover(false);

  window.addEventListener(
    "keydown",
    (e) => {
      if (e.code === "AltLeft") setHover(true);
    },
    true
  );

  window.addEventListener(
    "keyup",
    (e) => {
      if (e.code === "AltLeft") setHover(false);
    },
    true
  );

  // If focus leaves the window while Alt is down (Alt+Tab, clicking another
  // app, opening a dialog) the keyup never arrives, so reset here.
  window.addEventListener("blur", () => setHover(false), true);
  window.addEventListener("unload", () => setHover(false));
})();
