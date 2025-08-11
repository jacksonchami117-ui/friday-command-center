
(function(){
  let rafId=null;
  const CHARS='アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ0123456789';
  function start(){
    const cvs=document.getElementById('matrix');
    const ctx=cvs.getContext('2d');
    const dpr=window.devicePixelRatio||1;
    const resize=()=>{
      cvs.width=window.innerWidth*dpr;
      cvs.height=window.innerHeight*dpr;
      ctx.scale(dpr,dpr);
    };
    resize(); window.addEventListener('resize',resize);
    const fontSize=16, columns=Math.ceil(window.innerWidth/fontSize);
    const drops=new Array(columns).fill(1);
    const draw=()=>{
      ctx.fillStyle='rgba(11,15,20,0.14)';
      ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
      ctx.fillStyle='#7aa2ff';
      ctx.font=fontSize+'px monospace';
      for(let i=0;i<drops.length;i++){
        const text=CHARS[Math.floor(Math.random()*CHARS.length)];
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);
        if(drops[i]*fontSize>window.innerHeight && Math.random()>0.975) drops[i]=0;
        drops[i]++;
      }
      rafId=requestAnimationFrame(draw);
    };
    draw();
    start.cleanup=()=>{ cancelAnimationFrame(rafId); rafId=null; ctx.clearRect(0,0,cvs.width,cvs.height); };
  }
  window.startMatrix = ()=>{ if(!rafId) start(); };
  window.stopMatrix = ()=>{ if(start.cleanup) start.cleanup(); };
})();