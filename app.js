/* ============================================================================
   Scaling & Retaining Canada's Champions — SHARED SHELL BEHAVIOUR (app.js)
   Mission Control design system. Extracted from Report Flagship Demo v3.

   Every feature is in its own try/catch and is ENHANCEMENT ONLY: with JS disabled
   every page is fully legible (static-first). No external scripts, no localStorage.

   Features:
     · boot intro (#boot — reads each page's own data-boot text; falls back to a
                   built-in default string if a page omits the attribute)
     · scroll progress bar (#prog)
     · scroll-reveal observer (.rv inside section[data-rev], plus bare .rv)
     · count-ups (.fig-n[data-count] · #issuerNum · #leakNum — all with
                   optional data-prefix/data-suffix/data-dec, read generically)
     · sticky-scene step observer (#ipoScene or any .sticky-scene)
     · source-drawer machinery (per-page provenance supplied via window.PROV)
     · theme toggle (#themeToggle — in-page state only, NO localStorage)

   PER-PAGE PROVENANCE: each page defines, BEFORE loading this script,
       <script>window.PROV = { key:{ t:"title", meta:"html", conf:"high" }, ... };</script>
   Every .provpill is a real <a href="#sources"> anchor; JS upgrades it into a drawer
   trigger only when window.PROV[key] exists, else the native #sources jump fires.
   ============================================================================ */
"use strict";
(function(){
  var RM=false;
  try{RM=(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(e){RM=false;}

  /* ---- count-up helper ---- */
  function fmt(v,dec,pre,suf){var s=(dec?v.toFixed(dec):Math.round(v).toLocaleString());return (pre||"")+s+(suf||"");}
  function countUp(el,target,dec,pre,suf){
    try{
      if(el==null||isNaN(target)){return;}
      if(RM){el.textContent=fmt(target,dec,pre,suf);return;}
      var dur=1150,t0=null;
      function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=fmt(target*e,dec,pre,suf);if(p<1){requestAnimationFrame(step);}else{el.textContent=fmt(target,dec,pre,suf);}}
      requestAnimationFrame(step);
    }catch(e){ try{el.textContent=fmt(target,dec,pre,suf);}catch(e2){} }
  }

  /* (Removed July 7 2026: the hardcoded #sigNum C$210B hero count-up. No current page uses the
     #sigNum id — growth-prize's hero numeral is a generic .fig-n[data-count] handled by the
     generic runner below. Verified: grep of all 10 pages returns zero #sigNum references.) */

  /* ---- issuer big-number count-up (fires on reveal) ---- */
  try{
    var iss=document.getElementById("issuerNum");
    if(iss){
      if(RM||!("IntersectionObserver" in window)){ iss.textContent="672"; }
      else{
        var io0=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){countUp(iss,672,0,"","");io0.disconnect();}});},{threshold:.4});
        io0.observe(iss);
      }
    }
  }catch(e){ try{var i0=document.getElementById("issuerNum"); if(i0) i0.textContent="672";}catch(e2){} }

  /* ---- leakage numeral count-up ---- */
  try{
    var leakEl=document.getElementById("leakNum");
    if(leakEl){
      if(RM){leakEl.textContent=">US$680B";}
      else{
        var lt0=null;
        var lstep=function(ts){if(!lt0)lt0=ts;var p=Math.min(1,(ts-lt0)/1200),e=1-Math.pow(1-p,3);leakEl.textContent=">US$"+Math.round(680*e)+"B";if(p<1){requestAnimationFrame(lstep);}else{leakEl.textContent=">US$680B";}};
        var startedLeak=false;
        var fire=function(){if(startedLeak)return;startedLeak=true;requestAnimationFrame(lstep);};
        try{
          if("IntersectionObserver" in window){
            var lo=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){fire();lo.disconnect();}});},{threshold:.3});
            lo.observe(leakEl);
          }else{fire();}
        }catch(e2){fire();}
      }
    }
  }catch(e){ try{var l2=document.getElementById("leakNum"); if(l2) l2.textContent=">US$680B";}catch(e3){} }

  /* ---- generic data-count runner (covers every .fig-n[data-count] numeral) ---- */
  function doCount(el){
    try{
      if(el.dataset && el.dataset.done) return;
      if(el.dataset) el.dataset.done="1";
      var target=parseFloat(el.getAttribute("data-count"));
      var dec=parseInt(el.getAttribute("data-dec")||"0",10);
      var pre=el.getAttribute("data-prefix")||"";
      var suf=el.getAttribute("data-suffix")||"";
      countUp(el,target,dec,pre,suf);
    }catch(e){}
  }
  try{
    var counters=document.querySelectorAll("[data-count]");
    if(RM||!("IntersectionObserver" in window)){
      for(var i=0;i<counters.length;i++){ doCount(counters[i]); }
    }else{
      var kio=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){doCount(x.target);kio.unobserve(x.target);}});},{threshold:.5});
      for(var j=0;j<counters.length;j++){
        /* skip the issuer/leak numerals, which have dedicated runners above */
        var id=counters[j].id;
        if(id==="issuerNum"||id==="leakNum") continue;
        kio.observe(counters[j]);
      }
    }
  }catch(e){}

  /* ---- boot intro (#boot). Each page supplies its own data-boot text; falls back to a
     built-in default if the attribute is omitted. ---- */
  try{
    var b=document.getElementById("boot");
    if(b){
      var txt=b.getAttribute("data-boot")||"> initializing … Ontario capital markets · sources verified";
      if(RM){b.innerHTML=txt+'<span class="cur"></span>';}
      else{var bi=0;(function type(){if(bi<=txt.length){b.innerHTML=txt.slice(0,bi)+'<span class="cur"></span>';bi++;setTimeout(type,15+Math.random()*22);}else{b.innerHTML=txt+'<span class="cur"></span>';}})();}
    }
  }catch(e){ try{var b2=document.getElementById("boot"); if(b2) b2.textContent=(b2.getAttribute("data-boot")||"> Ontario capital markets"); }catch(e2){} }

  /* ---- scroll reveal ---- */
  try{
    var revealNow=function(root){ (root||document).querySelectorAll(".rv").forEach(function(el){el.classList.add("in");}); };
    if(RM||!("IntersectionObserver" in window)){
      revealNow(document);
    }else{
      var rio=new IntersectionObserver(function(entries){entries.forEach(function(en){
        if(!en.isIntersecting)return;
        en.target.querySelectorAll(".rv").forEach(function(el){el.classList.add("in");});
        rio.unobserve(en.target);
      });},{threshold:.14});
      /* observe the section[data-rev] bands (every current page tags its bands this way) */
      var revSections=document.querySelectorAll("section[data-rev]");
      if(revSections.length){ revSections.forEach(function(s){rio.observe(s);}); }
      else{ document.querySelectorAll("section").forEach(function(s){rio.observe(s);}); }
      /* hero reveals immediately, and any .rv not inside an observed section */
      document.querySelectorAll("#hero .rv").forEach(function(e){e.classList.add("in");});
      document.querySelectorAll(".rv").forEach(function(el){ if(!el.closest("section")){ el.classList.add("in"); } });
    }
  }catch(e){ try{document.querySelectorAll(".rv").forEach(function(el){el.classList.add("in");}); }catch(e2){} }

  /* ---- sticky scene stepper ---- */
  try{
    var scene=document.getElementById("ipoScene")||document.querySelector(".sticky-scene");
    if(scene && ("IntersectionObserver" in window)){
      var steps=scene.querySelectorAll(".step");
      var sio=new IntersectionObserver(function(en){
        en.forEach(function(x){
          if(x.isIntersecting){
            var i=x.target.getAttribute("data-i");
            scene.setAttribute("data-step",i);
            steps.forEach(function(s){s.classList.remove("active");});
            x.target.classList.add("active");
          }
        });
      },{threshold:.55,rootMargin:"-20% 0px -20% 0px"});
      steps.forEach(function(s){sio.observe(s);});
      if(steps[0]){steps[0].classList.add("active");scene.setAttribute("data-step","0");}
    }else if(scene){
      scene.removeAttribute("data-step");
    }
  }catch(e){ try{var sc=document.getElementById("ipoScene")||document.querySelector(".sticky-scene"); if(sc) sc.removeAttribute("data-step");}catch(e2){} }

  /* ---- progress bar ---- */
  try{
    var prog=document.getElementById("prog");
    if(prog){
      window.addEventListener("scroll",function(){try{var h=document.documentElement;var denom=(h.scrollHeight-h.clientHeight)||1;prog.style.width=(h.scrollTop/denom*100)+"%";}catch(e){}},{passive:true});
    }
  }catch(e){}

  /* ---- theme toggle (in-page state only; NO localStorage) ---- */
  try{
    var tbtn=document.getElementById("themeToggle");
    if(tbtn){
      var applyTheme=function(light){
        try{
          if(light){document.documentElement.setAttribute("data-theme","light");}
          else{document.documentElement.removeAttribute("data-theme");}
          tbtn.setAttribute("aria-pressed",light?"true":"false");
          tbtn.setAttribute("aria-label",light?"Switch to dark theme":"Switch to light theme");
        }catch(e){}
      };
      tbtn.addEventListener("click",function(){
        var isLight=(document.documentElement.getAttribute("data-theme")==="light");
        applyTheme(!isLight);
      });
    }
  }catch(e){}

  /* ---- provenance drawer (per-page window.PROV) ---- */
  try{
    var PROV=(window.PROV&&typeof window.PROV==="object")?window.PROV:{};
    var drawer=document.getElementById("drawer"),
        scrim=document.getElementById("scrim"),
        drawerX=document.getElementById("drawerX"),
        drawerBody=document.getElementById("drawerBody"),
        lastTrigger=null;
    function openProv(key,trigger){
      try{
        var p=PROV[key];
        if(!p||!drawer||!scrim||!drawerBody)return;
        lastTrigger=trigger||null;
        drawerBody.innerHTML='<div class="dh">◎ sources &amp; confidence</div><div class="dt" id="drawerTitle">'+p.t+'</div><div class="meta">'+p.meta+'</div><span class="conf '+p.conf+'">confidence: '+p.conf+'</span>';
        drawer.classList.add("open");
        scrim.classList.add("on");
        drawer.setAttribute("aria-hidden","false");
        if(drawerX)drawerX.focus();
      }catch(e){}
    }
    function closeDrawer(){
      try{
        if(!drawer||!scrim)return;
        drawer.classList.remove("open");
        scrim.classList.remove("on");
        drawer.setAttribute("aria-hidden","true");
        if(lastTrigger&&lastTrigger.focus){lastTrigger.focus();}
        lastTrigger=null;
      }catch(e){}
    }
    if(drawerX)drawerX.addEventListener("click",closeDrawer);
    if(scrim)scrim.addEventListener("click",closeDrawer);
    document.addEventListener("keydown",function(e){if(e.key==="Escape")closeDrawer();});
    document.querySelectorAll(".provpill").forEach(function(s){
      try{
        var key=s.getAttribute("data-prov");
        s.setAttribute("aria-haspopup","dialog");
        s.setAttribute("aria-label","View source: "+(PROV[key]?PROV[key].t:key));
        s.addEventListener("click",function(ev){ if(PROV[key]){ ev.preventDefault(); openProv(key,s); } });
        s.addEventListener("keydown",function(ev){
          if(ev.key==="Enter"||ev.key===" "){ if(PROV[key]){ ev.preventDefault(); openProv(key,s); } }
        });
      }catch(e){}
    });
  }catch(e){ /* drawer failed: pills remain plain #sources anchors */ }

  /* ---- mobile nav sheet (enhancement over the native <details> disclosure) ----
     The menu is a real <details>/<summary>: with JS OFF it opens/closes natively and
     every link works. Here we add: exact bar-height for the sheet's top padding,
     scroll-lock while open, aria-expanded mirroring, current-page label in the slim
     bar, and close-on link-tap / Esc / outside-click with focus returned to the trigger. */
  try{
    var navD=document.getElementById("navSheet");
    if(navD){
      var navSummary=navD.querySelector("summary.navtrigger"),
          navPanel=document.getElementById("navSheetPanel"),
          navBar=document.querySelector(".topbar"),
          navHere=document.querySelector(".tb-here");

      /* keep the sheet's top padding matched to the actual bar height */
      var setBarH=function(){ try{ if(navBar){ document.documentElement.style.setProperty("--nav-bar-h",navBar.offsetHeight+"px"); } }catch(e){} };
      setBarH();
      window.addEventListener("resize",setBarH,{passive:true});

      /* reflect the current page (the .on link) into the slim-bar label */
      try{
        var onlink=navD.querySelector(".sheet a.on .st");
        if(onlink&&navHere){ navHere.textContent=onlink.textContent; }
      }catch(e){}

      var setExpanded=function(open){ try{ if(navSummary){ navSummary.setAttribute("aria-expanded",open?"true":"false"); } }catch(e){} };
      setExpanded(navD.open);

      var closeNav=function(returnFocus){
        try{
          if(!navD.open) return;
          navD.open=false;                 /* fires the toggle handler below */
          if(returnFocus&&navSummary&&navSummary.focus){ navSummary.focus(); }
        }catch(e){}
      };

      navD.addEventListener("toggle",function(){
        try{
          if(navD.open){ document.body.classList.add("nav-open"); setExpanded(true); setBarH(); }
          else{ document.body.classList.remove("nav-open"); setExpanded(false); }
        }catch(e){}
      });

      if(navPanel){
        /* close on any link tap (navigation, or same-page anchor) */
        navPanel.querySelectorAll("a").forEach(function(a){ a.addEventListener("click",function(){ closeNav(false); }); });
        /* tap on the sheet backdrop (not a link/label) closes and returns focus */
        navPanel.addEventListener("click",function(ev){ if(ev.target===navPanel||ev.target===navPanel.firstElementChild){ closeNav(true); } });
      }
      /* Escape closes and returns focus to the trigger */
      document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&navD.open){ closeNav(true); } });
      /* click anywhere outside the open menu (e.g. the slim bar) also closes */
      document.addEventListener("click",function(e){ try{ if(navD.open&&!navD.contains(e.target)){ closeNav(false); } }catch(err){} });
    }
  }catch(e){ /* nav sheet stays a native <details> disclosure */ }
})();
