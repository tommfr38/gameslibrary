// Tiny helper for per-game best scores, stored in localStorage.
// Every access is wrapped because storage can be blocked (private mode, file:// quirks).
const Scores = {
  get(key) {
    try {
      const v = localStorage.getItem('gl_' + key);
      return v === null ? null : Number(v);
    } catch (e) {
      return null;
    }
  },
  // Saves `value` if it beats the stored best. Returns the (possibly new) best.
  submit(key, value, lowerIsBetter = false) {
    const best = this.get(key);
    const better = best === null || (lowerIsBetter ? value < best : value > best);
    if (!better) return best;
    try { localStorage.setItem('gl_' + key, String(value)); } catch (e) {}
    return value;
  },
};
