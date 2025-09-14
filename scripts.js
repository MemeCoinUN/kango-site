const Y=document.getElementById('year'); if(Y) Y.textContent=new Date().getFullYear();
const L=window.KANGO_LINKS||{};
// Header + hero buttons → direct to coin
const set = (id,url)=>{const a=document.getElementById(id); if(a&&url) a.href=url;};
set('moonshotLink', L.moonshot); set('dexLink', L.dexscreener);
set('moonshotHero', L.moonshot); set('dexHero', L.dexscreener);
// Contract Address bar
const ca = (L.contract||''); const caText=document.getElementById('caText'); if(caText) caText.textContent = ca;
const copyBtn=document.getElementById('copyCA'); if(copyBtn){ copyBtn.addEventListener('click', async()=>{
  try{ await navigator.clipboard.writeText(ca); copyBtn.textContent='Copied!'; setTimeout(()=>copyBtn.textContent='Copy',1400); }
  catch(e){ copyBtn.textContent='Failed'; setTimeout(()=>copyBtn.textContent='Copy',1400); }
});}

// Live chart embeds
const moon = null; // removed
const dex  = document.getElementById('dexFrame');
// moonshot removed
if(dex  && L.dexscreener) dex.src  = L.dexscreener;

// Tabs
document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const t=btn.dataset.target;
    if(t==='moonshot'){ moon.hidden=false; dex.hidden=true; }
    else { moon.hidden=true; dex.hidden=false; }
  });
});

// Animated motherboard overlay
const canvas=document.getElementById('circuit');
if(canvas){
  const ctx=canvas.getContext('2d');
  const resize=()=>{canvas.width=innerWidth; canvas.height=innerHeight}; addEventListener('resize',resize,{passive:true}); resize();
  let t=0;
  (function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#050a14'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle='rgba(56,192,255,.10)'; ctx.lineWidth=1; const s=26;
    for(let x=0;x<canvas.width;x+=s){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}
    for(let y=0;y<canvas.height;y+=s){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}
    ctx.strokeStyle='rgba(56,192,255,.55)'; ctx.lineWidth=2;
    for(let i=0;i<26;i++){
      const y0=(i*canvas.height/26 + Math.sin((t+i)/22)*10)%canvas.height;
      ctx.beginPath(); ctx.moveTo(0,y0);
      for(let x=0;x<canvas.width;x+=36){const yy=y0 + Math.sin((t+x+i)/46)*8; ctx.lineTo(x,yy);}
      ctx.stroke();
    }
    t+=1.2; requestAnimationFrame(draw);
  })();
}

// Subtle parallax on hero figure
const figure=document.querySelector('.hero-figure img');
if(figure){
  const onScroll=()=>{ const y=Math.min(30, scrollY*0.04); const scale=1+Math.min(0.06, scrollY/2200); figure.style.transform=`translate3d(0, ${y}px, 0) scale(${scale})`; };
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
}



const ROADMAP_DATA = {
  "phases": [
    {"id":"p1","title":"Phase 1 — Foundation & Launch","eta":"Week 1–2","kpis":["Site live","Brand kit","Profile kit"],
      "milestones":[
        {"m":"Finalize KANGO brand kit (logo, color, 3D hero, social avatars)","acceptance":"Assets in /assets/brand, exported in SVG/PNG/WebP","owner":"Design","status":"done"},
        {"m":"Website v1 (Hero + About + Live Chart + CA bar + Powered by AI)","acceptance":"Lighthouse ≥90 mobile; Dex embed tested","owner":"Web","status":"done"},
        {"m":"Social rollout (X/Telegram) with pinned CA + linktree","acceptance":"Pinned X post, TG welcome pin, vanity handles set","owner":"Comms","status":"doing"}
      ]},
    {"id":"p2","title":"Phase 2 — Liquidity, Analytics & Safety","eta":"Week 2–3","kpis":["Dex screens online","Bot defense live","CA audit"],
      "milestones":[
        {"m":"Dexscreener/Birdeye pages tuned (logo, links, description)","acceptance":"All links verified to coin pages; no 404s","owner":"Ops","status":"todo"},
        {"m":"Guardian Shield v0 (sniper/bot anomaly alerts)","acceptance":"Discord alerts on threshold triggers","owner":"AI","status":"todo"},
        {"m":"CA quick audit & docs (risks, disclaimers)","acceptance":"SEC/FTC friendly site language + risks page","owner":"Legal","status":"todo"}
      ]},
    {"id":"p3","title":"Phase 3 — Community & Culture","eta":"Week 3–5","kpis":["1k holders","10k X followers","TG active 24/7"],
      "milestones":[
        {"m":"Meme Forge v1 (template pack + weekly contest)","acceptance":"10+ PSD/PNG templates","owner":"Design","status":"todo"},
        {"m":"Raid calendar + bounties","acceptance":"Public Notion + payout proof thread","owner":"Mods","status":"todo"},
        {"m":"Influencer micro-partnerships","acceptance":"3+ collab posts with trackable links","owner":"Comms","status":"todo"}
      ]},
    {"id":"p4","title":"Phase 4 — Utilities v1 (AI)","eta":"Week 5–7","kpis":["Active users","Latency < 300ms","MVP shipped"],
      "milestones":[
        {"m":"On‑Chain Radar (wallet clusters + MEV patterns)","acceptance":"Dashboard with top 10 clusters; alert webhooks","owner":"AI","status":"todo"},
        {"m":"Sentiment Engine (signals feed + score)","acceptance":"Signal page; sharable score card images","owner":"AI","status":"todo"},
        {"m":"Fraud Watch (look‑alike CA + phishing)","acceptance":"Weekly report + blocklist export","owner":"AI","status":"todo"}
      ]}
  ]
};
(function renderRoadmapInline(){
  const root = document.getElementById('roadmapApp'); if(!root) return;
  root.innerHTML='';
  ROADMAP_DATA.phases.forEach(phase=>{
    const el=document.createElement('div'); el.className='phase';
    el.innerHTML = `
      <div class="timeline"></div>
      <div class="head">
        <div>
          <h3 style="margin:0 0 4px">${phase.title}</h3>
          <div class="meta" style="color:#9fcbff;font-size:12px">${phase.eta}</div>
        </div>
        <div class="badges">${phase.kpis.map(k=>`<span class='badge'>${k}</span>`).join('')}</div>
      </div>
      <div class="milestones"></div>`;
    const wrap=el.querySelector('.milestones');
    phase.milestones.forEach(m=>{
      const mEl=document.createElement('div'); mEl.className='milestone ' + (m.status||'todo');
      mEl.innerHTML = `
        <div class="row"><div class="title">${m.m}</div><div class="meta">${m.owner||'—'}</div></div>
        <div class="details"><div><b>Acceptance:</b> ${m.acceptance||''}</div></div>
        <div style="margin-top:6px;"><button class="toggle">Details</button></div>`;
      mEl.querySelector('.toggle').addEventListener('click',()=> mEl.classList.toggle('open'));
      wrap.appendChild(mEl);
    });
    root.appendChild(el);
  });
})();