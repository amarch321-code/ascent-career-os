"use strict";
/* Ascent — state, derived selectors, persistence (db + localStorage). */
const $=(s,r)=>(r||document).querySelector(s);
const ce=s=>document.createElement(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const skillById=id=>SKILLS.find(s=>s.id===id);
const certById=id=>CERTS.find(c=>c.id===id);
const projByPhase=p=>PROJECTS.find(x=>x.phase===p);
let ACTIVE="dashboard",DB=null,seenDb=false;

const LS_KEY="ascent.v2";
let state={profile:{targetRole:"Product / BI first, Data-Science-capable",weeklyGoal:12,startDate:null,positioned:false},
  phases:{},skills:{},certs:{},projects:{},modules:{},logs:{},jobs:{},suggestions:{}};
function loadLocal(){try{const r=localStorage.getItem(LS_KEY);if(r)Object.assign(state,JSON.parse(r));}catch(e){}
  try{const old=localStorage.getItem("ascent.v1");if(old&&!localStorage.getItem(LS_KEY)){const d=JSON.parse(old);["phases","skills","certs","projects","logs","jobs","suggestions"].forEach(k=>{if(d[k])state[k]=d[k];});}}catch(e){}}
function saveLocal(){try{localStorage.setItem(LS_KEY,JSON.stringify(state));}catch(e){}}

/* derived */
function phaseObj(id){return state.phases[id]||{weeks:[false,false,false,false],done:false};}
function phaseDone(id){const p=phaseObj(id);return p.done||(p.weeks&&p.weeks.every(Boolean));}
function phaseWeeksDone(id){const p=phaseObj(id);return p.done?4:(p.weeks?p.weeks.filter(Boolean).length:0);}
function activePhaseIndex(){for(let i=0;i<CURRICULUM.length;i++){if(!phaseDone(CURRICULUM[i].id))return i;}return CURRICULUM.length-1;}
function totalWeeksDone(){return CURRICULUM.reduce((a,p)=>a+phaseWeeksDone(p.id),0);}
function overallPct(){return Math.round(totalWeeksDone()/(CURRICULUM.length*4)*100);}
function skillState(id){const sk=skillById(id);if(!sk)return"";const ov=state.skills[id];
  if(ov&&ov.status)return ov.status;if(sk.owned)return"gained";
  if(sk.p&&phaseDone(sk.p))return"gained";
  if(sk.cert&&certEarned(sk.cert))return"gained";
  /* gained if an earned certificate or a completed leadership module teaches this skill */
  if(CERTS.some(c=>certEarned(c.id)&&c.skills&&c.skills.indexOf(id)>-1))return"gained";
  if(LEADERSHIP.some(m=>modDone(m.id)&&m.skills&&m.skills.indexOf(id)>-1))return"gained";
  if(sk.p&&CURRICULUM[activePhaseIndex()].id===sk.p)return"learning";return"";}
function skillFlags(id){const ov=state.skills[id]||{};const sk=skillById(id)||{};return{onLinkedIn:ov.onLinkedIn||false,onResume:ov.onResume|| !!sk.owned};}
function gainedCount(){return SKILLS.filter(s=>skillState(s.id)==="gained").length;}
function certEarned(id){const c=state.certs[id];return !!(c&&c.status==="earned");}
function certState(id){const c=state.certs[id];return c&&c.status?c.status:"";}
function earnedCerts(){return CERTS.filter(c=>certEarned(c.id)).length;}
function projState(id){const p=state.projects[id];return p&&p.status?p.status:"";}
function projDoneCount(){return PROJECTS.filter(p=>projState(p.id)==="done").length;}
function modDone(id){const m=state.modules[id];return !!(m&&m.done);}
function modDoneCount(){return LEADERSHIP.filter(m=>modDone(m.id)).length;}
function arcDone(st){if(st.done)return st.done();return (st.pct?st.pct():0)>=100;}
function arcCurrentIndex(){for(let i=0;i<ARC.length;i++){if(!arcDone(ARC[i]))return i;}return ARC.length-1;}

function weekIdOf(d){d=new Date(d);const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);const mon=new Date(d);
  const jan1=new Date(mon.getFullYear(),0,1);const wk=Math.floor((mon-jan1)/(7*864e5))+1;
  return{id:mon.getFullYear()+"-W"+String(wk).padStart(2,"0"),start:mon};}
function curWeek(){return weekIdOf(new Date());}
function weekTotal(id){const w=state.logs[id];if(!w||!w.byTopic)return 0;return Object.values(w.byTopic).reduce((a,b)=>a+(+b||0),0);}
function lastNWeeks(n){const out=[];let d=curWeek().start;for(let i=0;i<n;i++){const w=weekIdOf(d);out.unshift(w);d=new Date(d.getTime()-7*864e5);}return out;}
function streak(){let s=0;let d=curWeek().start;while(true){const w=weekIdOf(d);if(weekTotal(w.id)>0){s++;d=new Date(d.getTime()-7*864e5);}else break;}return s;}

/* persistence */
const timers={};
function persistDoc(name){saveLocal();if(!DB)return;clearTimeout(timers[name]);
  timers[name]=setTimeout(()=>{try{DB.doc("state/"+name).set(state[name]||{});}catch(e){}},350);}
function persistProfile(){saveLocal();if(DB){try{DB.doc("state/profile").set(state.profile);}catch(e){}}}
function persistCollDoc(coll,id){saveLocal();if(DB){try{DB.collection(coll).doc(id).set(state[coll][id]);}catch(e){}}}
function deleteCollDoc(coll,id){delete state[coll][id];saveLocal();if(DB){try{DB.collection(coll).doc(id).delete();}catch(e){}}render();}

async function initDb(){let db=null;
  try{db=(window.claude&&window.claude.use)?await window.claude.use("db"):null;}catch(e){db=null;}
  seenDb=true;DB=db;setSync();if(!db)return;
  const md=(name)=>db.doc("state/"+name).onSnapshot(s=>{if(s.exists){const d=s.data()||{};
    if(name==="profile")state.profile=Object.assign({},state.profile,d);else state[name]=d;render();}},()=>{});
  ["phases","skills","certs","projects","modules","profile"].forEach(md);
  const mc=(name)=>db.collection(name).onSnapshot(qs=>{const m={};qs.docs.forEach(d=>{if(d.exists)m[d.id]=d.data();});state[name]=m;render();},()=>{});
  ["logs","jobs","suggestions"].forEach(mc);}
function setSync(){const chip=$("#syncchip"),lbl=$("#synclabel");
  if(!seenDb){chip.className="chip local";lbl.textContent="connecting…";return;}
  if(DB){chip.className="chip sync";lbl.textContent="synced";}else{chip.className="chip local";lbl.textContent="saved on this device";}}

function toast(msg){const t=ce("div");t.className="toast";t.textContent=msg;$("#toasts").appendChild(t);
  setTimeout(()=>{t.style.opacity="0";t.style.transition="opacity .3s";setTimeout(()=>t.remove(),300);},2200);}
function copyText(txt){const done=()=>toast("Copied — paste it into LinkedIn ✓");
  try{navigator.clipboard.writeText(txt).then(done,fallback);}catch(e){fallback();}
  function fallback(){const ta=ce("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();
    try{document.execCommand("copy");done();}catch(_){toast("Copy failed — select manually");}ta.remove();}}
