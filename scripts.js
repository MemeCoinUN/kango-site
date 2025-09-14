const K = window.KANGO || {};
const byId = id => document.getElementById(id);
const setHref = (id, url) => { const a = byId(id); if (a && url) a.href = url; };

setHref("moonshotBuy", K.moonshot);
setHref("dexBtn", K.dexscreener);
setHref("birdeyeBtn", K.birdeye);

// CA bar copy
(() => {
  const ca = K.ca || "";
  const el = document.getElementById("caText");
  if (el) el.textContent = ca;
  const btn = document.getElementById("copyCA");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(ca); btn.textContent = "Copied!"; }
    catch { btn.textContent = "Failed"; }
    setTimeout(() => (btn.textContent = "Copy"), 1200);
  });
})();

// Moonshot frame
const moon = document.getElementById("moonshotFrame");
if (moon && K.moonshot) moon.src = K.moonshot;

// Subtle parallax on hero image
const heroImg = document.querySelector(".hero-figure img");
if (heroImg) {
  const onScroll = () => {
    const y = Math.min(36, scrollY * 0.05);
    const s = 1 + Math.min(0.08, scrollY / 2400);
    heroImg.style.transform = `translate3d(0, ${y}px, 0) scale(${s})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}