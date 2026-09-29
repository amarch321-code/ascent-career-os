"use strict";
/* Ascent — views, interactions, boot. */
function miniRing(pct){const size=50,stroke=5,r=(size-stroke)/2,c=2*Math.PI*r,off=c*(1-pct/100);
  return `<svg class="mini-prog" viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--ring-track)" stroke-width="${stroke}"/>
   <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="url(#dawnGrad)" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 ${size/2} ${size/2})"/>
   <text x="50%" y="50%" text-anchor="middle" dy=".35em" font-family="Hanken Grotesk" font-size="14" font-weight="700" fill="var(--ink)">${pct}</text></svg>`;}
function svgIcon(name,cls){return `<svg class="${cls||""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ARCICON[name]||""}</svg>`;}

/* ===================================================================== */
function renderNav(){
  const mk=(mobile)=>NAV.map(n=>`<button class="navitem" data-nav="${n.id}" aria-current="${ACTIVE===n.id}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[n.id]}</svg>
    <span class="lbl">${mobile?(n.short||n.label):n.label}</span>${!mobile&&n.tag?`<span class="tag">${n.tag}</span>`:""}</button>`).join("");
  $("#rail").innerHTML=mk(false)+`<div class="rail-note">Everything saves as you go. Tell Claude what you finished — it reads this journal and writes your next steps.</div>`;
  $("#tabbar").innerHTML=mk(true);
}

/* DASHBOARD — career arc map */
function renderDashboard(){
  const ci=arcCurrentIndex();
  const stations=ARC.map((st,i)=>{
    const done=arcDone(st),current=i===ci&&!done;
    const pct=st.pct?st.pct():(done?100:0);
    const cls=st.summit?"summit":done?"done":current?"current":"";
    const showpct=!st.done&&!st.summit;
    return `<div class="station ${cls}">
      ${current&&i>0?'<span class="youhere">✎ you are here</span>':''}
      <div class="pin"><div class="knob">${st.done?svgIcon(st.icon):st.summit?svgIcon("trophy"):done?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12l4 4 10-10"/></svg>':svgIcon(st.icon)}</div></div>
      <button class="stbtn" data-nav="${st.nav}">
        <span class="si"><span class="st">${esc(st.title)}${st.summit?' <span class="pill pay">high pay</span>':''}</span><span class="ss">${esc(st.sub)}</span></span>
        ${showpct?`<span class="prog">${pct}%<small>${done?"done":current?"in progress":"ahead"}</small></span>`:st.summit?'<span class="prog">🏁</span>':'<span class="prog" style="color:var(--good)">✓<small>banked</small></span>'}
      </button></div>`;
  }).join("");

  const sugg=Object.keys(state.suggestions).length?Object.entries(state.suggestions).map(([id,s])=>({id,...s})):DEFAULT_SUGGESTIONS.map(s=>({...s,by:"claude"}));
  const order={hi:0,med:1,low:2};
  sugg.sort((a,b)=>(order[a.prio]-order[b.prio])||((a.done?1:0)-(b.done?1:0)));
  const list=sugg.filter(s=>!s.done).concat(sugg.filter(s=>s.done)).slice(0,6);
  const openCount=sugg.filter(s=>!s.done).length;
  const wk=curWeek(),wkT=weekTotal(wk.id),goal=state.profile.weeklyGoal||12;

  $("#v-dashboard").innerHTML=`
  <div class="hero anim d1">
    <svg class="contours" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="var(--line-2)" stroke-width="1.3" opacity=".5">
        <path d="M-20 120 C 200 60, 420 180, 640 110 S 980 40, 1040 130"/>
        <path d="M-20 210 C 220 150, 440 260, 660 200 S 980 130, 1040 220"/>
        <path d="M-20 320 C 220 260, 460 360, 680 300 S 980 240, 1040 320"/>
        <path d="M-20 440 C 240 380, 460 480, 700 420 S 980 360, 1040 440"/>
      </g></svg>
    <div class="hero-inner">
      <div class="top">
        <div>
          <div class="youare">◎ Base Camp · Amarjeet Choudhary</div>
          <h1>From <span class="mark">operator<svg viewBox="0 0 200 12" preserveAspectRatio="none" style="--ml:210"><path d="M3 8 C 50 2, 150 2, 197 7"/></svg></span> to a high-paying role.</h1>
          <p class="lede">Your whole route on one map — the stages from where you stand today (CEO, P&amp;L, teams) to hired in a data, BI or product role that pays what the market pays.</p>
        </div>
        <div style="text-align:center;min-width:120px">
          <div style="font-family:var(--disp);font-weight:900;font-size:48px;line-height:1;color:var(--amber-ink)">${overallPct()}<span style="font-size:22px">%</span></div>
          <div class="hand" style="font-size:12px;color:var(--muted)">of the climb</div>
          <div class="pill pine" style="margin-top:8px">Stage ${activePhaseIndex()+1} of 12</div>
        </div>
      </div>
      <div class="trail">${stations}</div>
      <div class="readouts">
        <div class="ro"><div class="k">This week</div><div class="v">${wkT}<small> / ${goal} hrs</small></div></div>
        <div class="ro"><div class="k">Streak</div><div class="v">${streak()}<small> wk${streak()===1?"":"s"}</small></div></div>
        <div class="ro"><div class="k">Skills</div><div class="v">${gainedCount()}<small> / ${SKILLS.length}</small></div></div>
        <div class="ro"><div class="k">Certificates</div><div class="v">${earnedCerts()}<small> / ${CERTS.length}</small></div></div>
        <div class="ro"><div class="k">Projects</div><div class="v">${projDoneCount()}<small> / ${PROJECTS.length}</small></div></div>
      </div>
    </div>
  </div>

  <div class="grid g2 anim d2" style="margin-top:16px">
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div><div class="eyebrow">Next moves</div><h2 style="font-size:21px;font-weight:700">What to do now</h2></div>
        <span class="pill active">${openCount} open</span></div>
      <div class="next">${list.map(s=>`<label class="action ${s.done?"done":""}">
        <input type="checkbox" class="cbx" data-act="suggdone" data-id="${esc(s.id)}" ${s.done?"checked":""}>
        <span class="prio ${s.prio||"low"}"></span>
        <span class="body"><span class="t">${esc(s.text)}</span><span class="d">${esc(s.detail||"")}</span></span></label>`).join("")}</div>
      <div style="margin-top:12px;font-size:12.5px;color:var(--muted)">These refresh when you tell Claude what you've finished.</div>
    </div>
    <div class="card" style="display:flex;flex-direction:column;gap:14px">
      <div><div class="eyebrow">Grow right, not just technical</div><h2 style="font-size:21px;font-weight:700;margin-top:2px">Two skills, one climb</h2></div>
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px"><span class="pill pay">🔥 top-paid</span><b>The AI &amp; data edge</b></div>
        <p style="color:var(--muted);font-size:13px;margin:0">Agent orchestration (~$209k), LLMs/RAG, ML (+40% pay). The differentiator that gets you the interview.</p></div>
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px"><span class="pill pine">people &amp; leadership</span><b>The management layer</b></div>
        <p style="color:var(--muted);font-size:13px;margin:0">7 of LinkedIn's top-10 2026 skills are soft skills. AI literacy, strategy, data-driven decisions, storytelling — what gets you promoted and paid.</p></div>
      <button class="btn primary" data-nav="roadmap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Open the roadmap</button>
    </div>
  </div>

  <div class="datastamp anim d3" style="margin-top:16px;justify-content:center">
    <span class="stamp">✦ market data reviewed ${MARKET_ASOF}</span>
    <span style="font-size:12px;color:var(--faint)">Sources: LinkedIn Skills on the Rise 2026 · WEF Future of Jobs · PM / analyst / AI salary reports 2026</span>
  </div>`;
}

/* ROADMAP (technical stages + leadership track) */
function renderRoadmap(){
  const track=renderRoadmap._track||"tech";
  const head=`<div class="section-head anim d1"><h2>Your roadmap</h2>
    <p>Two tracks that run together: the 12-month technical climb, and the leadership growth that makes you a hire employers fight for.</p></div>
    <div class="tracktabs anim d1" role="tablist">
      <button role="tab" aria-selected="${track==='tech'}" data-act="track" data-track="tech">🧗 Technical · 12 stages</button>
      <button role="tab" aria-selected="${track==='lead'}" data-act="track" data-track="lead">👑 Leadership · 6 modules</button></div>`;
  if(track==="lead"){$("#v-roadmap").innerHTML=head+renderLeadTrack();return;}
  const apIdx=activePhaseIndex(),pct=overallPct(),openId=renderRoadmap._open||CURRICULUM[apIdx].id;
  const cards=CURRICULUM.map((p,i)=>{
    const done=phaseDone(p.id),active=i===apIdx&&!done,wd=phaseWeeksDone(p.id),pp=Math.round(wd/4*100);
    const pr=projByPhase(p.id),open=openId===p.id,scls=done?"done":active?"active":"";
    return `<div class="node ${scls}"><div class="dot"></div>
      <div class="pcard ${active?"active":""} ${open?"open":""}">
        <button class="head" data-act="togphase" data-phase="${p.id}">
          <div class="mo">M<b>${p.month}</b></div>
          <div class="htxt"><div class="ttl">${esc(p.title)}</div><div class="foc">${esc(p.focus)}</div></div>
          <div class="hmeta">${done?'<span class="pill done">done</span>':active?'<span class="pill active">now</span>':i>apIdx?'<span class="pill locked">soon</span>':'<span class="pill">review</span>'}
            ${miniRing(pp)}<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></div>
        </button>
        <div class="pbody">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:4px">
            <span class="pill">⏱ ${p.hours} hrs/week</span>
            <button class="btn sm ${done?"":"primary"}" data-act="markphase" data-phase="${p.id}">${done?"✓ Stage complete — undo":"Mark stage complete"}</button></div>
          <h4>Weekly plan</h4>
          ${p.weeks.map((w,wi)=>{const wdone=done||(phaseObj(p.id).weeks&&phaseObj(p.id).weeks[wi]);
            return `<label class="weekrow"><input type="checkbox" class="cbx" data-act="togweek" data-phase="${p.id}" data-week="${wi}" ${wdone?"checked":""}>
              <span class="wl">${esc(w)}</span><span class="wn">W${wi+1}</span></label>`;}).join("")}
          <h4>Learn from</h4>
          <div class="reslist">${p.res.map(r=>`<div class="res">${r.k===YT?`<a class="ry" href="${r.u}" target="_blank" rel="noopener" aria-label="Open on YouTube"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.1-2.1C18.5 3.5 12 3.5 12 3.5s-6.5 0-8.4.6A3 3 0 0 0 1.5 6.2C1 8.1 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 8.4.6 8.4.6s6.5 0 8.4-.6a3 3 0 0 0 2.1-2.1C23 15.9 23 12 23 12z"/><path d="M9.8 15.5v-7l6 3.5z" fill="#fff"/></svg></a>`:`<span class="ry srch">🔎</span>`}
            <div class="rb"><div class="rt">${r.k===YT?`<a href="${r.u}" target="_blank" rel="noopener">${esc(r.t)} ↗</a>`:esc(r.t)}</div><div class="ra">${r.k===YT?esc(r.a):"YouTube — "+esc(r.a)}</div></div></div>`).join("")}</div>
          ${pr?`<h4>Build this</h4><div class="projbox"><div class="pjh">${pr.num?`<span class="pill active">Portfolio #${pr.num}${pr.flagship?" · flagship":""}</span>`:'<span class="pill">milestone</span>'}<span class="pjt">${esc(pr.title)}</span></div>
            <div style="font-size:12.5px;color:var(--muted);margin-top:6px">${esc(pr.sub)} — open <a href="#" data-nav="projects">Projects</a> to track the build.</div></div>`:""}
          ${p.skills.length?`<h4>Skills you unlock</h4><div class="tagset">${p.skills.map(s=>{const sk=skillById(s);return sk?`<span class="pill">${esc(sk.n)}</span>`:"";}).join("")}</div>`:""}
          ${p.certs.length?`<div class="callout"><div class="ct">🏅 When this stage is done</div><ul>${p.certs.map(c=>{const ct=certById(c);return ct?`<li>Claim <b>${esc(ct.n)}</b> — <a href="#" data-nav="certs">Certificates</a> has the exact LinkedIn text.</li>`:"";}).join("")}</ul></div>`:""}
        </div></div></div>`;
  }).join("");
  $("#v-roadmap").innerHTML=head+`<div class="timeline anim d2"><div class="fill" style="height:0"></div>${cards}</div>`;
  requestAnimationFrame(()=>{const f=$("#v-roadmap .fill");if(f)f.style.height="calc((100% - 28px) * "+(pct/100)+")";});
}
function renderLeadTrack(){
  const done=modDoneCount();
  return `<div class="card anim d1" style="margin-bottom:14px;border-style:dashed;border-color:var(--pine)">
    <div class="eyebrow" style="color:var(--pine-ink)">Why this track exists</div>
    <p style="margin:6px 0 0;font-size:13.5px;color:var(--muted)">You don't need technical skills to grow — you need to grow <em>right</em>. In LinkedIn's Skills on the Rise 2026, <b>7 of the top 10 are soft skills</b>, and AI literacy is #1. This track builds the management edge on top of the operator experience you already have. <b>${done} of ${LEADERSHIP.length}</b> modules done.</p></div>
    <div class="grid anim d2" style="gap:12px">${LEADERSHIP.map(m=>{
      const md=modDone(m.id),applied=state.modules[m.id]&&state.modules[m.id].applied;const cert=m.learn.cert?certById(m.learn.cert):null;
      return `<div class="lmod ${md?"done":""}">
        <div class="lh"><div class="knob" style="width:38px;height:38px;border-radius:11px;flex:0 0 auto;display:grid;place-items:center;background:${md?"var(--good)":"var(--pine-soft)"};color:${md?"#fff":"var(--pine-ink)"};border:0">${md?'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12l4 4 10-10"/></svg>':svgIcon("crown")}</div>
          <div class="li2"><div class="lt">${esc(m.title)}</div><div class="lg">${esc(m.goal)}</div></div></div>
        <div class="steps2">
          <label class="l-row"><input type="checkbox" class="cbx" data-act="modlearn" data-id="${m.id}" ${md?"checked":""}>
            <span class="lrl"><b>Learn:</b> ${esc(m.learn.t)} <span style="color:var(--muted)">— ${esc(m.learn.a)}</span>${cert?` · <a href="#" data-nav="certs">get the certificate ↗</a>`:""}</span></label>
          <label class="l-row"><input type="checkbox" class="cbx" data-act="modapply" data-id="${m.id}" ${applied?"checked":""}>
            <span class="lrl apply">Apply at work: ${esc(m.apply)}</span></label>
        </div>
        <div class="tagset" style="margin-top:10px">${m.skills.map(s=>{const sk=skillById(s);return sk?`<span class="pill">${esc(sk.n)}</span>`:"";}).join("")}</div>
      </div>`;}).join("")}</div>`;
}

/* SKILLS */
function renderSkills(){
  const groups=SKILL_GROUPS.map(g=>{
    const items=SKILLS.filter(s=>s.g===g.id);const gained=items.filter(s=>skillState(s.id)==="gained").length;
    const pct=Math.round(gained/items.length*100);
    return `<div class="skillgroup">
      <div class="gh"><h3>${esc(g.name)}${g.badge?`<span class="badge">${esc(g.badge)}</span>`:""}</h3>
        <div class="bar"><i style="width:${pct}%"></i></div><span class="cnt">${gained}/${items.length}</span></div>
      <div class="skills">${items.map(s=>{const st=skillState(s.id),fl=skillFlags(s.id);
        return `<button class="skill ${st}" data-act="togskill" data-id="${s.id}" title="Click to cycle: not started → learning → gained">
          <span class="sk-ic">${st==="gained"?'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12l4 4 10-10"/></svg>':st==="learning"?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg>':''}</span>
          <span class="sn"><span class="snm">${esc(s.n)}${s.fire?' <span class="fire">🔥</span>':''}${s.owned?' <span class="own">yours</span>':''}</span>${s.tag?`<span class="stag">${esc(s.tag)}</span>`:s.p?`<span class="stag">unlocks in Stage ${s.p.slice(1)}</span>`:s.cert?`<span class="stag">via certificate</span>`:''}</span>
        </button>`;}).join("")}</div></div>`;
  }).join("");
  $("#v-skills").innerHTML=`
    <div class="section-head anim d1"><h2>Skills checklist</h2>
      <p>Grouped by what the 2026 market actually pays for. Ticks fill in automatically as you finish stages, modules and certificates — click any skill to override. Your leadership skills start ticked.</p></div>
    <div class="datastamp anim d1"><span class="stamp">✦ market-tagged · ${MARKET_ASOF}</span>
      <span style="font-size:12px;color:var(--faint)">🔥 = a highest-paid / fastest-rising skill in 2026 reports · ${gainedCount()} of ${SKILLS.length} acquired</span></div>
    <div class="anim d2">${groups}</div>`;
}

/* CERTS */
function renderCerts(){
  const filt=renderCerts._filter||"all";
  const tracks=["all","Leadership","Product","Data / BI","Data Science","Generative AI"];
  const filtered=CERTS.filter(c=>filt==="all"||c.track===filt);
  const cards=filtered.map(c=>{
    const st=certState(c.id),cs=state.certs[c.id]||{},ready=phaseDone(c.after)||c.after==="p1";
    const skillNames=c.skills.map(s=>{const sk=skillById(s);return sk?sk.n:s;});
    return `<div class="certcard ${st==="earned"?"earned":""}">
      <div class="top"><div class="medal">${st==="earned"?'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12l4 4 10-10"/></svg>':'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="9" r="5"/><path d="M9 13l-2 8 5-3 5 3-2-8"/></svg>'}</div>
        <div class="ci"><div class="cn">${esc(c.n)}</div><div class="cp">${esc(c.prov)}${c.optional?" · optional":""}</div></div>
        <span class="pill track-tag">${esc(c.track)}</span></div>
      <div class="why">${esc(c.why)}</div>
      <div class="why" style="padding-top:0;color:var(--faint);font-family:var(--hand);font-weight:600;font-size:12px">Best taken ${c.after==="p1"?"from week 1 (parallel)":"around / after Stage "+c.after.slice(1)}. ${ready?'<span style="color:var(--good)">✓ you\'re ready</span>':""}</div>
      ${st==="earned"?`<div class="snip"><div class="sh">📋 LinkedIn — Licenses &amp; certifications</div><div class="sc">${esc(c.li)}</div></div>
        <div class="snip"><div class="sh">📋 Résumé — skills to add</div><div class="sc">${esc(skillNames.join(" · "))}</div></div>`:""}
      <div class="act">
        <button class="btn sm ${st==="earned"?"":"primary"}" data-act="certstatus" data-id="${c.id}" data-to="${st==="earned"?"":"earned"}">${st==="earned"?"✓ Earned":"Mark earned"}</button>
        <button class="btn sm" data-act="certstatus" data-id="${c.id}" data-to="${st==="inprogress"?"":"inprogress"}">${st==="inprogress"?"● In progress":"In progress"}</button>
        ${st==="earned"?`<button class="btn sm" data-act="copyli" data-id="${c.id}">Copy LinkedIn text</button>
          <button class="btn sm" data-act="markli" data-id="${c.id}">${cs.li?"✓ Added to LinkedIn":"I added it"}</button>`:""}</div>
    </div>`;
  }).join("");
  $("#v-certs").innerHTML=`
    <div class="section-head anim d1"><h2>Certificates &amp; credentials</h2>
      <p>The brand-name proof your CV is missing — leadership, product and data tracks together. Mark one earned and you get the exact text to paste into LinkedIn and your résumé.</p></div>
    <div class="trackfilter anim d1">${tracks.map(t=>`<button data-act="certfilter" data-track="${esc(t)}" aria-pressed="${filt===t}">${t==="all"?"All":esc(t)}</button>`).join("")}</div>
    <div class="grid g2 anim d2">${cards}</div>`;
}

/* PROJECTS */
function renderProjects(){
  const cards=PROJECTS.map(p=>{
    const ps=state.projects[p.id]||{},st=ps.status||"",steps=ps.steps||{},ph=CURRICULUM.find(x=>x.id===p.phase);
    const stepsDone=p.steps.filter((_,i)=>steps[i]).length,open=renderProjects._open===p.id;
    return `<div class="proj ${p.flagship?"flagship":""} ${open?"open":""}">
      <button class="ph" data-act="togproj" data-id="${p.id}">
        <span class="pnum">${p.num?"#"+p.num:"M"+ph.month}</span>
        <span class="pt"><span class="pttl">${esc(p.title)}</span><span class="psub">${esc(p.sub)} · Stage ${ph.month}</span></span>
        ${st==="done"?'<span class="pill done">shipped</span>':st==="building"?'<span class="pill active">building</span>':`<span class="pill">${stepsDone}/${p.steps.length}</span>`}
        <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="margin-left:6px"><path d="M6 9l6 6 6-6"/></svg></button>
      <div class="pbody2">
        <div class="steps">${p.steps.map((s,i)=>`<label class="step"><input type="checkbox" class="cbx" data-act="projstep" data-id="${p.id}" data-step="${i}" ${steps[i]?"checked":""}><span>${esc(s)}</span></label>`).join("")}</div>
        <div class="gh-input"><input class="inp" style="flex:1;min-width:180px" placeholder="GitHub repo URL…" value="${esc(ps.url||"")}" data-act="projurl" data-id="${p.id}">
          ${ps.url?`<a class="btn sm" href="${esc(ps.url)}" target="_blank" rel="noopener">Open repo ↗</a>`:""}
          <button class="btn sm ${st==="done"?"":"primary"}" data-act="projdone" data-id="${p.id}">${st==="done"?"✓ Shipped — undo":"Mark shipped"}</button></div>
        <div style="font-size:12.5px;color:var(--muted);margin-top:10px">Stuck? Ask Claude: <em>"guide me through building ${esc(p.title.toLowerCase())}"</em> — resources, a case study and a step-by-step.</div>
      </div></div>`;
  }).join("");
  $("#v-projects").innerHTML=`
    <div class="section-head anim d1"><h2>Projects &amp; GitHub</h2>
      <p>Certificates open doors; <b>projects get offers</b>. Each stage ends in one. Tick the steps, paste your repo link, and ask Claude to guide any build.</p></div>
    <div class="grid anim d2" style="gap:12px">${cards}</div>`;
}

/* WEEKLY LOG */
const SAMPLE_LOG=(()=>{const w=lastNWeeks(6);const vals=[6,9,0,11,8,13];return{weeks:w,vals};})();
function SAMPLE_LOG_MAP(){const m={};SAMPLE_LOG.weeks.forEach((w,i)=>{m[w.id]=SAMPLE_LOG.vals[i];});return m;}
function renderLog(){
  const weeks=lastNWeeks(10),real=Object.keys(state.logs).length>0,smap=SAMPLE_LOG_MAP();
  const data=weeks.map(w=>({id:w.id,start:w.start,total:real?weekTotal(w.id):(smap[w.id]||0)}));
  const goal=state.profile.weeklyGoal||12,maxV=Math.ceil(Math.max(goal,...data.map(d=>d.total),10)*1.18);
  const W=680,H=220,padL=34,padB=30,padT=12,padR=10,cw=W-padL-padR,ch=H-padT-padB,gap=cw/data.length,bw=gap*0.62;
  const yFor=v=>padT+ch-(v/maxV)*ch,ticks=[0,Math.round(maxV/2),maxV],gy=yFor(goal);
  const bars=data.map((d,i)=>{const x=padL+i*gap+(gap-bw)/2,y=yFor(d.total),h=padT+ch-y;
    return `<rect x="${x}" y="${y}" width="${bw}" height="${Math.max(h,0)}" rx="4" fill="${d.total===0?'var(--ring-track)':'url(#dawnGrad)'}" opacity="${d.total===0?.6:1}"/>
     ${d.total>0?`<text x="${x+bw/2}" y="${y-5}" text-anchor="middle" font-family="Hanken Grotesk" font-size="10" font-weight="600" fill="var(--muted)">${d.total}</text>`:""}
     <text x="${x+bw/2}" y="${H-padB+15}" text-anchor="middle" font-family="Hanken Grotesk" font-size="9" fill="var(--faint)">${d.start.getDate()}/${d.start.getMonth()+1}</text>`;}).join("");
  const chart=`<svg class="barchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Weekly study hours">
    ${ticks.map(t=>`<line x1="${padL}" y1="${yFor(t)}" x2="${W-padR}" y2="${yFor(t)}" stroke="var(--line)" stroke-width="1"/><text x="${padL-8}" y="${yFor(t)+3}" text-anchor="end" font-family="Hanken Grotesk" font-size="9" fill="var(--faint)">${t}</text>`).join("")}
    <line x1="${padL}" y1="${gy}" x2="${W-padR}" y2="${gy}" stroke="var(--amber)" stroke-width="1.4" stroke-dasharray="5 4"/>
    <text x="${W-padR}" y="${gy-5}" text-anchor="end" font-family="Hanken Grotesk" font-size="9.5" font-weight="600" fill="var(--amber-ink)">goal ${goal}h</text>${bars}</svg>`;
  const wk=curWeek(),cur=state.logs[wk.id],byTopic=cur&&cur.byTopic?cur.byTopic:{};
  const topicRows=Object.keys(byTopic).length?Object.entries(byTopic).sort((a,b)=>b[1]-a[1]).map(([t,h])=>`<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--line);font-size:13.5px"><span>${esc(t)}</span><b class="tnum">${h}h</b></div>`).join(""):`<div class="empty" style="padding:14px">No hours logged this week yet.</div>`;
  const strip=lastNWeeks(12).map(w=>{const on=weekTotal(w.id)>0,isCur=w.id===wk.id;return `<span class="wk ${on?"on":""} ${isCur?"cur":""}" title="${w.id}: ${weekTotal(w.id)}h"></span>`;}).join("");
  const topicOpts=["Python / foundations","Data analysis (Pandas/EDA)","SQL & BI","Machine learning","Deep learning","Cloud & FastAPI","Generative AI / RAG","Agentic AI / MCP","Coursera certificate","Leadership module","Project / GitHub build"].map(t=>`<option>${esc(t)}</option>`).join("");
  $("#v-log").innerHTML=`
    <div class="section-head anim d1" style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px">
      <div><h2>Weekly log</h2><p>Consistency beats intensity — 10–14 hrs a week for a year wins. Log what you studied every Sunday.</p></div>
      <div style="text-align:right"><div class="eyebrow">Streak</div><div style="font-family:var(--disp);font-weight:700;font-size:28px">${streak()} <span style="font-size:14px;color:var(--muted)">wk${streak()===1?"":"s"}</span></div></div></div>
    <div class="card anim d2">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <div class="eyebrow">Hours per week — last 10${real?"":' <span class="samp-tag">sample</span>'}</div>
        <span class="tnum" style="font-size:12.5px;color:var(--muted);font-weight:600">this week: ${weekTotal(wk.id)} / ${goal}h</span></div>
      ${chart}<div class="streakstrip" title="last 12 weeks">${strip}</div></div>
    <div class="grid g2 anim d3" style="margin-top:14px">
      <div class="card"><div class="eyebrow">Log hours — this week (${wk.id})</div>
        <form class="logform" data-act="logform" style="margin-top:10px">
          <label>Topic<select class="inp" name="topic">${topicOpts}</select></label>
          <label>Hours<input class="inp" type="number" name="hours" min="0" max="80" step="0.5" style="width:82px" placeholder="e.g. 4"></label>
          <button class="btn primary" type="submit">Add</button></form>
        <div style="display:flex;align-items:center;gap:8px;margin-top:12px"><span class="eyebrow">Weekly goal</span>
          <input class="inp" type="number" min="4" max="40" value="${goal}" style="width:76px" data-act="setgoal"><span style="font-size:12px;color:var(--muted)">hrs</span></div></div>
      <div class="card"><div class="eyebrow">This week by topic</div><div style="margin-top:8px">${topicRows}</div></div></div>`;
}

/* JOBS */
const JOB_STAGES=["Saved","Applied","Screening","Interview","Offer","Rejected"];
const SAMPLE_JOBS={ex1:{company:"(example) Zomato",role:"Business Analyst",source:"Naukri",status:"Applied",applied:"2026-09-20",url:"",notes:"",sample:true}};
function renderJobs(){
  const real=Object.keys(state.jobs).length>0,jobs=real?state.jobs:SAMPLE_JOBS;
  const positioned=!!state.profile.positioned;
  const arr=Object.entries(jobs).map(([id,j])=>({id,...j}));
  const statArr=arr.filter(j=>!j.sample);   /* the example row never counts toward stats */
  const counts=JOB_STAGES.map(s=>statArr.filter(j=>j.status===s).length);
  const applied=statArr.filter(j=>["Applied","Screening","Interview","Offer","Rejected"].includes(j.status)).length;
  const responses=statArr.filter(j=>["Screening","Interview","Offer"].includes(j.status)).length;
  const rate=applied?Math.round(responses/applied*100):0;
  const pipe=JOB_STAGES.map((s,i)=>`<div class="pipecol"><div class="pch"><span>${s}</span><span class="pcn">${counts[i]}</span></div></div>`).join("");
  const rows=arr.map(j=>`<tr${j.sample?' style="opacity:.72"':""}>
      <td><b>${esc(j.company)}</b>${j.sample?' <span class="samp-tag">example</span>':""}<div style="font-size:12px;color:var(--muted)">${esc(j.role||"")}</div></td>
      <td style="font-size:12px" class="hand">${esc(j.source||"—")}</td><td class="tnum" style="font-size:12px">${esc(j.applied||"—")}</td>
      <td>${j.sample?`<span class="pill">${esc(j.status)}</span>`:`<select class="statussel" data-act="jobstatus" data-id="${esc(j.id)}">${JOB_STAGES.map(s=>`<option ${j.status===s?"selected":""}>${s}</option>`).join("")}</select>`}</td>
      <td>${j.url?`<a href="${esc(j.url)}" target="_blank" rel="noopener">link ↗</a>`:'<span style="color:var(--faint)">—</span>'}</td>
      <td>${j.sample?"":`<button class="btn ghost sm" data-act="jobdel" data-id="${esc(j.id)}" aria-label="Delete">✕</button>`}</td></tr>`).join("");
  $("#v-jobs").innerHTML=`
    <div class="section-head anim d1"><h2>Job hunt</h2>
      <p>Track every application, response and interview. Add roles as you apply — Naukri, LinkedIn or referrals — and watch your response rate climb.</p></div>
    <div class="grid g4 anim d2" style="margin-bottom:4px">
      <div class="tile"><div class="k">Applied</div><div class="v tnum">${applied}</div></div>
      <div class="tile"><div class="k">Responses</div><div class="v tnum">${responses}</div></div>
      <div class="tile"><div class="k">Response rate</div><div class="v tnum">${rate}<small>%</small></div></div>
      <div class="tile"><div class="k">Interviews</div><div class="v tnum">${statArr.filter(j=>j.status==="Interview").length}</div></div></div>
    <div class="jobpipe anim d3">${pipe}</div>
    <div class="card anim d3"><div class="eyebrow" style="margin-bottom:10px">Add an application</div>
      <form data-act="jobform" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <input class="inp" name="company" placeholder="Company" style="min-width:150px" required>
        <input class="inp" name="role" placeholder="Role" style="min-width:150px">
        <select class="inp" name="source"><option>Naukri</option><option>LinkedIn</option><option>Referral</option><option>Company site</option><option>Instahyre</option><option>Other</option></select>
        <input class="inp" name="url" placeholder="Job URL (optional)" style="min-width:150px">
        <button class="btn primary" type="submit">+ Add</button></form></div>
    <div class="card anim d4" style="margin-top:14px"><div class="tablescroll"><table class="jobtable">
      <thead><tr><th>Company / role</th><th>Source</th><th>Applied</th><th>Status</th><th>Link</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
      ${real?"":'<div style="font-size:12.5px;color:var(--muted);margin-top:10px">Showing one example row. Add your first real application above and it clears.</div>'}</div>
    <div class="card anim d4" style="margin-top:14px;border-style:dashed">
      <div class="eyebrow">Profile optimisation</div>
      <p style="color:var(--muted);font-size:13.5px;margin:8px 0 0">Each time you earn a skill or certificate, ask Claude to <b>rewrite your LinkedIn headline, About and Naukri skills</b> to match. When you're ready to apply, Claude can open your browser and optimise your profile and shortlist roles <em>with you</em> — you approve every change and every application.</p>
      <div style="margin-top:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <button class="btn sm ${positioned?"":"primary"}" data-act="posit">${positioned?"✓ Profile rebuilt — undo":"Mark my LinkedIn / Naukri / résumé rebuilt"}</button>
        <span style="font-size:12px;color:var(--muted)">Completes the <b>Positioned to apply</b> stage on your map.</span></div></div>`;
}

const RENDERERS={dashboard:renderDashboard,roadmap:renderRoadmap,skills:renderSkills,certs:renderCerts,projects:renderProjects,log:renderLog,jobs:renderJobs};
function render(){renderNav();if(RENDERERS[ACTIVE])RENDERERS[ACTIVE]();}
function go(view){if(!RENDERERS[view])return;ACTIVE=view;
  ["dashboard","roadmap","skills","certs","projects","log","jobs"].forEach(v=>{$("#v-"+v).hidden=(v!==ACTIVE);});
  RENDERERS[ACTIVE]();renderNav();window.scrollTo({top:0,behavior:"smooth"});}

/* interactions */
document.addEventListener("click",e=>{
  const nav=e.target.closest("[data-nav]");if(nav){e.preventDefault();go(nav.getAttribute("data-nav"));return;}
  const a=e.target.closest("[data-act]");if(!a)return;const act=a.getAttribute("data-act"),id=a.getAttribute("data-id");
  if(act==="track"){renderRoadmap._track=a.getAttribute("data-track");renderRoadmap();return;}
  if(act==="togphase"){const ph=a.getAttribute("data-phase");renderRoadmap._open=(renderRoadmap._open===ph?null:ph);renderRoadmap();return;}
  if(act==="togproj"){renderProjects._open=(renderProjects._open===id?null:id);renderProjects();return;}
  if(act==="certfilter"){renderCerts._filter=a.getAttribute("data-track");renderCerts();return;}
  if(act==="markphase"){const ph=a.getAttribute("data-phase"),cur=phaseDone(ph);state.phases[ph]=state.phases[ph]||{weeks:[false,false,false,false]};
    state.phases[ph].done=!cur;state.phases[ph].weeks=[!cur,!cur,!cur,!cur];persistDoc("phases");toast(!cur?"Stage complete — skills updated ✓":"Stage reopened");renderRoadmap();renderNav();return;}
  if(act==="certstatus"){const to=a.getAttribute("data-to");state.certs[id]=state.certs[id]||{};state.certs[id].status=to;persistDoc("certs");if(to==="earned")toast("🏅 Earned — scroll down for your LinkedIn text");renderCerts();return;}
  if(act==="copyli"){copyText(certById(id).li);return;}
  if(act==="markli"){state.certs[id]=state.certs[id]||{};state.certs[id].li=!state.certs[id].li;persistDoc("certs");renderCerts();return;}
  if(act==="projdone"){const cur=projState(id)==="done";state.projects[id]=state.projects[id]||{};state.projects[id].status=cur?"":"done";persistDoc("projects");toast(cur?"Reopened":"🚀 Shipped — add it to LinkedIn!");renderProjects();return;}
  if(act==="jobdel"){deleteCollDoc("jobs",id);return;}
  if(act==="posit"){state.profile.positioned=!state.profile.positioned;persistProfile();toast(state.profile.positioned?"Marked rebuilt — 'Positioned' stage complete ✓":"Reopened");renderJobs();return;}
});
document.addEventListener("change",e=>{
  const a=e.target.closest("[data-act]");if(!a)return;const act=a.getAttribute("data-act"),id=a.getAttribute("data-id");
  if(act==="togweek"){const ph=a.getAttribute("data-phase"),wi=+a.getAttribute("data-week");state.phases[ph]=state.phases[ph]||{weeks:[false,false,false,false]};
    if(!state.phases[ph].weeks)state.phases[ph].weeks=[false,false,false,false];state.phases[ph].weeks[wi]=e.target.checked;
    state.phases[ph].done=state.phases[ph].weeks.every(Boolean);persistDoc("phases");renderRoadmap();renderNav();return;}
  if(act==="modlearn"){state.modules[id]=state.modules[id]||{};state.modules[id].done=e.target.checked;persistDoc("modules");renderRoadmap();return;}
  if(act==="modapply"){state.modules[id]=state.modules[id]||{};state.modules[id].applied=e.target.checked;persistDoc("modules");renderRoadmap();return;}
  if(act==="projstep"){const si=+a.getAttribute("data-step");state.projects[id]=state.projects[id]||{steps:{}};state.projects[id].steps=state.projects[id].steps||{};state.projects[id].steps[si]=e.target.checked;persistDoc("projects");return;}
  if(act==="suggdone"){const s=state.suggestions[id];if(s){s.done=e.target.checked;persistCollDoc("suggestions",id);}
    else{const d=DEFAULT_SUGGESTIONS.find(x=>x.id===id);if(d){state.suggestions[id]={...d,by:"claude",done:e.target.checked};persistCollDoc("suggestions",id);}}renderDashboard();return;}
  if(act==="jobstatus"){state.jobs[id]=state.jobs[id]||{};state.jobs[id].status=e.target.value;state.jobs[id].updated=new Date().toISOString().slice(0,10);persistCollDoc("jobs",id);renderJobs();return;}
  if(act==="setgoal"){state.profile.weeklyGoal=Math.max(1,+e.target.value||12);persistProfile();renderLog();return;}
});
document.addEventListener("click",e=>{const a=e.target.closest('[data-act="togskill"]');if(!a)return;
  const id=a.getAttribute("data-id"),cur=skillState(id),order=["","learning","gained"],next=order[(order.indexOf(cur)+1)%order.length];
  state.skills[id]=state.skills[id]||{};state.skills[id].status=next;if(next==="gained")state.skills[id].onResume=true;
  persistDoc("skills");renderSkills();});
document.addEventListener("input",e=>{const a=e.target.closest('[data-act="projurl"]');if(!a)return;
  const id=a.getAttribute("data-id");state.projects[id]=state.projects[id]||{};state.projects[id].url=e.target.value.trim();
  clearTimeout(timers["u"+id]);timers["u"+id]=setTimeout(()=>persistDoc("projects"),500);});
document.addEventListener("submit",e=>{const f=e.target.closest("[data-act]");if(!f)return;const act=f.getAttribute("data-act");e.preventDefault();
  if(act==="logform"){const topic=f.topic.value,hrs=+f.hours.value;if(!hrs){toast("Enter hours first");return;}
    const wk=curWeek(),w=state.logs[wk.id]||{weekStart:wk.start.toISOString().slice(0,10),byTopic:{}};w.byTopic[topic]=(w.byTopic[topic]||0)+hrs;
    state.logs[wk.id]=w;persistCollDoc("logs",wk.id);f.hours.value="";toast("+"+hrs+"h logged ✓");renderLog();return;}
  if(act==="jobform"){const c=f.company.value.trim();if(!c)return;const gid="j"+Date.now().toString(36);
    state.jobs[gid]={company:c,role:f.role.value.trim(),source:f.source.value,url:f.url.value.trim(),status:"Applied",applied:new Date().toISOString().slice(0,10),notes:""};
    persistCollDoc("jobs",gid);f.reset();toast("Application added ✓");renderJobs();return;}});

/* theme */
function initTheme(){let t=null;try{t=localStorage.getItem("ascent.theme");}catch(e){}if(t)document.documentElement.setAttribute("data-theme",t);updateThemeIcon();}
function isDark(){const a=document.documentElement.getAttribute("data-theme");if(a)return a==="dark";return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;}
function updateThemeIcon(){const i=$("#themeicon");i.innerHTML=isDark()?'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>':'<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19"/>';}
$("#themebtn").addEventListener("click",()=>{const d=!isDark();document.documentElement.setAttribute("data-theme",d?"dark":"light");try{localStorage.setItem("ascent.theme",d?"dark":"light");}catch(e){}updateThemeIcon();});

/* boot */
loadLocal();initTheme();render();
document.body.classList.add("boot");
setTimeout(()=>document.body.classList.remove("boot"),1500);
initDb();
