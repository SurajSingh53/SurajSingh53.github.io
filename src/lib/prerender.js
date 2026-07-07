// Small helpers that keep the app's first client render identical to the
// pre-rendered HTML snapshot (so React hydration stays flash- and warning-free).
//
// Two distinct signals:
//  - IS_PRERENDER  : we are *currently* running inside the headless-Chrome
//                    snapshot pass (set via window.__PRERENDER__ in the
//                    prerender script). Used to skip client-only visuals like
//                    the WebGL background so they never land in the snapshot.
//  - wasPrerendered: the HTML we just loaded in the browser was produced by the
//                    prerender pass (marked with <html data-prerendered>). Used
//                    so the client's first paint matches the baked snapshot.

export const IS_PRERENDER =
  typeof window !== 'undefined' && window.__PRERENDER__ === true

export function wasPrerendered() {
  return (
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-prerendered') === 'true'
  )
}

// Entrance animations (opacity 0 -> 1) may only run when we are NOT snapshotting
// and the current HTML was NOT pre-rendered. Otherwise the content is already
// painted, so animating from opacity:0 would cause a visible flash / hydration
// mismatch. Evaluated once, synchronously, on first render.
export function shouldAnimateEntrance() {
  return !IS_PRERENDER && !wasPrerendered()
}
