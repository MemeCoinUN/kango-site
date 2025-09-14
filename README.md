
# KANGO — Drop‑In Website (Ready for GitHub Pages)

**Order:** Buy links & CA (top) → About → Roadmap → Moonshot (bottom).  
Hero image: `assets/kango_hero.png` (already included).

## Upload (GitHub web UI)
1. Open your repo and delete old files if needed.
2. Upload everything from this folder (keep the same structure).
3. Ensure `.nojekyll` is in the root.
4. Settings → Pages → Source: `main` / root.
5. Visit `https://<your-username>.github.io/<repo-name>/`

## Update links / CA
Edit `config.js`:
```js
window.KANGO = {
  ca: "2xdbLNxtFCiBUZNK1QU218Xrm9ct3JGzG2MNNpJsmoon",
  moonshot: "https://moonshot.com/2xdbLNxtFCiBUZNK1QU218Xrm9ct3JGzG2MNNpJsmoon",
  dexscreener: "https://dexscreener.com/solana/2xdbLNxtFCiBUZNK1QU218Xrm9ct3JGzG2MNNpJsmoon",
  birdeye: "https://birdeye.so/token/2xdbLNxtFCiBUZNK1QU218Xrm9ct3JGzG2MNNpJsmoon?chain=solana"
};
```
