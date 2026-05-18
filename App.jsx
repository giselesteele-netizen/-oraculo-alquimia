import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════
   DADOS
══════════════════════════════════════════════════════ */
const ARCANJOS = [
  { id:0, nome:"Miguel",    titulo:"O Protetor",             rayo:"Azul Real",        dom:"Proteção · Verdade · Coragem",          emoji:"⚔️", palavra:"PROTEÇÃO",     cor:"#1a3a6a", acento:"#4a90e8", brilho:"#80b8ff" },
  { id:1, nome:"Gabriel",   titulo:"O Mensageiro",           rayo:"Branco Lunar",     dom:"Revelação · Intuição · Fé",             emoji:"🌙", palavra:"REVELAÇÃO",    cor:"#1a1a3a", acento:"#a0a0e0", brilho:"#d0d0ff" },
  { id:2, nome:"Rafael",    titulo:"O Curador",              rayo:"Verde Esmeralda",  dom:"Cura · Abundância · Renovação",         emoji:"🌿", palavra:"CURA",          cor:"#0a2a16", acento:"#3aaa60", brilho:"#70e090" },
  { id:3, nome:"Uriel",     titulo:"A Chama Sábia",          rayo:"Âmbar Dourado",    dom:"Sabedoria · Illuminação · Clareza",     emoji:"🔥", palavra:"SABEDORIA",    cor:"#2a1800", acento:"#e09030", brilho:"#f0c060" },
  { id:4, nome:"Metatron",  titulo:"Guardião dos Registros", rayo:"Violeta Cósmico",  dom:"Ascensão · Akasha · Transmutação",     emoji:"✨", palavra:"TRANSMUTAÇÃO", cor:"#1e0e38", acento:"#9060d0", brilho:"#c090f0" },
  { id:5, nome:"Chamuel",   titulo:"O Coração do Amor",      rayo:"Rosa Divino",      dom:"Amor Incondicional · Cura do Coração", emoji:"💗", palavra:"AMOR",          cor:"#2a1020", acento:"#d06090", brilho:"#f090b8" },
];

const SPREAD_POS = ["Passado", "Presente", "Futuro"];
const TEMAS = ["Amor","Propósito","Cura","Prosperidade","Proteção","Família","Missão"];

/* ══════════════════════════════════════════════════════
   SVG CARTAS
══════════════════════════════════════════════════════ */
function CardFront({ a }) {
  return (
    <svg viewBox="0 0 200 280" style={{ width:"100%", height:"100%" }}>
      <defs>
        <radialGradient id={`bg${a.id}`} cx="50%" cy="45%">
          <stop offset="0%" stopColor={a.cor} /><stop offset="100%" stopColor="#050302" />
        </radialGradient>
        <filter id={`gw${a.id}`}><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="200" height="280" fill={`url(#bg${a.id})`} rx="8"/>
      <rect x="8" y="8" width="184" height="264" rx="6" fill="none" stroke={a.acento} strokeWidth="0.6" opacity="0.35"/>
      {[[14,14],[186,14],[14,266],[186,266]].map(([cx,cy],i)=>(
        <g key={i} transform={`translate(${cx},${cy})`}>
          <circle r="3" fill={a.acento} opacity="0.5"/>
          <circle r="7" fill="none" stroke={a.acento} strokeWidth="0.3" opacity="0.2"/>
        </g>
      ))}
      <g transform="translate(100,118)" filter={`url(#gw${a.id})`}>
        {a.id===0 && <>
          <polygon points="0,-52 45,26 -45,26" fill="none" stroke={a.acento} strokeWidth="1.5" opacity="0.7"/>
          <polygon points="0,52 45,-26 -45,-26" fill="none" stroke={a.acento} strokeWidth="1.5" opacity="0.7"/>
          <circle r="52" fill="none" stroke={a.acento} strokeWidth="0.5" opacity="0.25"/>
          <line x1="0" y1="-42" x2="0" y2="42" stroke={a.brilho} strokeWidth="2" opacity="0.85"/>
          <line x1="-13" y1="-9" x2="13" y2="-9" stroke={a.brilho} strokeWidth="2" opacity="0.85"/>
          <circle r="5" fill={a.brilho} opacity="0.8"/>
        </>}
        {a.id===1 && <>
          <path d="M-28,-48 A50,50 0 1,1 -28,48 A34,34 0 1,0 -28,-48" fill="none" stroke={a.brilho} strokeWidth="1.5" opacity="0.75"/>
          {[[-38,-28],[38,-18],[48,18],[-48,8],[0,-52],[0,52],[-18,42],[18,-42]].map(([sx,sy],i)=>(
            <g key={i} transform={`translate(${sx},${sy})`}>
              <polygon points="0,-4 1.2,1.2 -1.2,1.2" fill={a.brilho} opacity={0.35+i*0.07}/>
              <polygon points="0,4 1.2,-1.2 -1.2,-1.2" fill={a.brilho} opacity={0.35+i*0.07}/>
            </g>
          ))}
          <circle r="58" fill="none" stroke={a.acento} strokeWidth="0.3" opacity="0.18"/>
        </>}
        {a.id===2 && <>
          <line x1="0" y1="-50" x2="0" y2="50" stroke={a.acento} strokeWidth="2.5" opacity="0.8"/>
          <path d="M0,-38 C19,-23 19,-4 0,0 C-19,4 -19,22 0,38" fill="none" stroke={a.brilho} strokeWidth="1.5" opacity="0.7"/>
          <path d="M0,-38 C-19,-23 -19,-4 0,0 C19,4 19,22 0,38" fill="none" stroke={a.acento} strokeWidth="1.5" opacity="0.7"/>
          <path d="M0,-46 C-14,-52 -33,-48 -38,-38 C-28,-40 -14,-40 0,-46" fill={a.acento} opacity="0.55"/>
          <path d="M0,-46 C14,-52 33,-48 38,-38 C28,-40 14,-40 0,-46" fill={a.acento} opacity="0.55"/>
          <circle r="58" fill="none" stroke={a.acento} strokeWidth="0.4" opacity="0.2" strokeDasharray="4 6"/>
        </>}
        {a.id===3 && <>
          <path d="M0,-52 C5,-38 17,-28 14,-9 C11,5 4,17 0,24 C-4,17 -11,5 -14,-9 C-17,-28 -5,-38 0,-52Z" fill={a.acento} opacity="0.65"/>
          <path d="M0,-37 C3,-26 11,-18 9,-7 C7,2 2,11 0,17 C-2,11 -7,2 -9,-7 C-11,-18 -3,-26 0,-37Z" fill={a.brilho} opacity="0.8"/>
          <path d="M0,-22 C2,-14 6,-8 5,-2 C4,3 1,7 0,10 C-1,7 -4,3 -5,-2 C-6,-8 -2,-14 0,-22Z" fill="#fff8e8" opacity="0.9"/>
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((ang,i)=>{
            const r=60, x=r*Math.cos(ang*Math.PI/180), y=r*Math.sin(ang*Math.PI/180);
            return <line key={i} x1={x} y1={y} x2={(r+11)*Math.cos(ang*Math.PI/180)} y2={(r+11)*Math.sin(ang*Math.PI/180)} stroke={a.acento} strokeWidth="1.2" opacity="0.45"/>;
          })}
          <circle r="60" fill="none" stroke={a.acento} strokeWidth="0.5" opacity="0.25"/>
          <ellipse cx="0" cy="38" rx="14" ry="7" fill="none" stroke={a.brilho} strokeWidth="0.8" opacity="0.55"/>
          <circle cx="0" cy="38" r="3.5" fill={a.brilho} opacity="0.65"/>
        </>}
        {a.id===4 && <>
          {[0,60,120,180,240,300].map((ang,i)=>{
            const r=42, x=r*Math.cos(ang*Math.PI/180), y=r*Math.sin(ang*Math.PI/180);
            return <circle key={i} cx={x} cy={y} r="4.5" fill="none" stroke={a.acento} strokeWidth="0.9" opacity="0.55"/>;
          })}
          {[0,60,120,180,240,300].flatMap((a1,i)=>
            [60,120,180,240,300].filter(b=>b>a1).map((a2,j)=>{
              const r=42;
              return <line key={`${i}-${j}`}
                x1={r*Math.cos(a1*Math.PI/180)} y1={r*Math.sin(a1*Math.PI/180)}
                x2={r*Math.cos(a2*Math.PI/180)} y2={r*Math.sin(a2*Math.PI/180)}
                stroke={a.acento} strokeWidth="0.4" opacity="0.28"/>;
            })
          )}
          <polygon points="0,-26 7.5,-7.5 26,-7.5 13,5.5 18.5,24.5 0,13.5 -18.5,24.5 -13,5.5 -26,-7.5 -7.5,-7.5" fill="none" stroke={a.brilho} strokeWidth="0.9" opacity="0.65"/>
          <circle r="16" fill="none" stroke={a.brilho} strokeWidth="0.7" opacity="0.45"/>
          <circle r="7" fill={a.acento} opacity="0.4"/>
          <circle r="2.5" fill="#e0c0ff" opacity="0.9"/>
          <circle r="60" fill="none" stroke={a.acento} strokeWidth="0.35" opacity="0.18" strokeDasharray="2 6"/>
        </>}
        {a.id===5 && <>
          <path d="M0,28 C0,28 -42,-4 -42,-23 C-42,-42 -23,-52 0,-28 C23,-52 42,-42 42,-23 C42,-4 0,28 0,28Z" fill="none" stroke={a.acento} strokeWidth="1.8" opacity="0.65"/>
          <path d="M0,16 C0,16 -26,-1 -26,-13 C-26,-26 -14,-32 0,-17 C14,-32 26,-26 26,-13 C26,-1 0,16 0,16Z" fill={a.acento} opacity="0.28"/>
          {[0,45,90,135,180,225,270,315].map((ang,i)=>{
            const r=15, x=r*Math.cos(ang*Math.PI/180), y=r*Math.sin(ang*Math.PI/180);
            return <ellipse key={i} cx={x} cy={y} rx="8" ry="4.5" fill={a.brilho} opacity="0.18" transform={`rotate(${ang},${x},${y})`}/>;
          })}
          <circle r="5.5" fill={a.brilho} opacity="0.65"/>
          {[0,60,120,180,240,300].map((ang,i)=>{
            const r=52, x=r*Math.cos(ang*Math.PI/180), y=r*Math.sin(ang*Math.PI/180);
            return <ellipse key={i} cx={x} cy={y} rx="5" ry="8.5" fill={a.acento} opacity="0.22" transform={`rotate(${ang+90},${x},${y})`}/>;
          })}
          <circle r="60" fill="none" stroke={a.acento} strokeWidth="0.45" opacity="0.18" strokeDasharray="3 4"/>
        </>}
      </g>
      <text x="100" y="215" textAnchor="middle" fontFamily="serif" fontSize="18" fill={a.brilho} opacity="0.88" letterSpacing="2">{a.nome.toUpperCase()}</text>
      <text x="100" y="235" textAnchor="middle" fontFamily="serif" fontSize="8" fill={a.acento} opacity="0.6" letterSpacing="3">{a.titulo.toUpperCase()}</text>
    </svg>
  );
}

function CardBack() {
  return (
    <svg viewBox="0 0 200 280" style={{ width:"100%", height:"100%" }}>
      <defs><radialGradient id="bk" cx="50%" cy="50%"><stop offset="0%" stopColor="#2a1e0a"/><stop offset="100%" stopColor="#0d0a06"/></radialGradient></defs>
      <rect width="200" height="280" fill="url(#bk)" rx="8"/>
      <rect x="8" y="8" width="184" height="264" rx="6" fill="none" stroke="#e8c87a" strokeWidth="0.6" opacity="0.38"/>
      <g transform="translate(100,140)">
        {[0,60,120,180,240,300].map((a,i)=>{
          const r=52, x=r*Math.cos(a*Math.PI/180), y=r*Math.sin(a*Math.PI/180);
          return <circle key={i} cx={x} cy={y} r="52" fill="none" stroke="#e8c87a" strokeWidth="0.28" opacity="0.13"/>;
        })}
        <circle r="52" fill="none" stroke="#e8c87a" strokeWidth="0.45" opacity="0.22"/>
        <circle r="26" fill="none" stroke="#e8c87a" strokeWidth="0.45" opacity="0.28"/>
        <circle r="11" fill="none" stroke="#e8c87a" strokeWidth="0.7" opacity="0.45"/>
        <polygon points="0,-17 14,8 -14,8" fill="none" stroke="#e8c87a" strokeWidth="0.55" opacity="0.55"/>
        <polygon points="0,17 14,-8 -14,-8" fill="none" stroke="#e8c87a" strokeWidth="0.55" opacity="0.55"/>
      </g>
      <text x="100" y="38" textAnchor="middle" fontFamily="serif" fontSize="7.5" fill="#e8c87a" opacity="0.35" letterSpacing="4">ALQUIMIA DO AMOR</text>
      <text x="100" y="260" textAnchor="middle" fontFamily="serif" fontSize="7.5" fill="#e8c87a" opacity="0.35" letterSpacing="3">✦ ORÁCULO ANGELICAL ✦</text>
      {[[18,18],[182,18],[18,262],[182,262]].map(([cx,cy],i)=>(
        <g key={i} transform={`translate(${cx},${cy})`}><circle r="3" fill="#e8c87a" opacity="0.38"/></g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   UTILITÁRIOS
══════════════════════════════════════════════════════ */
async function chamarIA(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.content?.find(b => b.type === "text")?.text || "";
}

function Typewriter({ texto, velocidade = 16 }) {
  const [exibido, setExibido] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    setExibido("");
    let i = 0;
    ref.current = setInterval(() => {
      i++;
      setExibido(texto.slice(0, i));
      if (i >= texto.length) clearInterval(ref.current);
    }, velocidade);
    return () => clearInterval(ref.current);
  }, [texto]);
  return (
    <span>
      {exibido}
      {exibido.length < texto.length && (
        <span style={{ display:"inline-block",width:2,height:"1em",background:"#e8c87a",marginLeft:2,verticalAlign:"text-bottom",animation:"blink .8s ease-in-out infinite" }}/>
      )}
    </span>
  );
}

function Estrelas() {
  const pts = useRef(Array.from({ length: 90 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100,
    r: Math.random() * 1.4 + 0.2, o: Math.random() * 0.3 + 0.04,
    dur: Math.random() * 4 + 3, delay: Math.random() * 6,
  }))).current;
  return (
    <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0 }}>
      <svg width="100%" height="100%">
        {pts.map((p,i) => (
          <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r={p.r} fill="#e8c87a"
            opacity={p.o} style={{ animation:`twinkle ${p.dur}s ${p.delay}s ease-in-out infinite` }}/>
        ))}
      </svg>
    </div>
  );
}

function CartaFlip({ arcanjo, virada=false, onClick, tamanho=110, hoverable=true, delay=0 }) {
  const h = tamanho * 1.4;
  return (
    <div onClick={onClick} style={{ width:tamanho, height:h, perspective:1200, cursor:onClick?"pointer":"default", flexShrink:0,
      animation: hoverable ? `flutuarCarta 3s ${delay}s ease-in-out infinite` : "none" }}>
      <div style={{ width:"100%", height:"100%", position:"relative", transformStyle:"preserve-3d",
        transition:"transform 0.75s cubic-bezier(.4,.2,.2,1)",
        transform: virada ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <div style={{ position:"absolute",inset:0,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",borderRadius:8,overflow:"hidden",boxShadow:"0 6px 24px rgba(0,0,0,.65)" }}>
          <CardBack/>
        </div>
        <div style={{ position:"absolute",inset:0,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",borderRadius:8,overflow:"hidden",transform:"rotateY(180deg)",
          boxShadow: virada ? `0 0 30px ${arcanjo?.acento||"#e8c87a"}55, 0 6px 24px rgba(0,0,0,.65)` : "none" }}>
          {arcanjo && <CardFront a={arcanjo}/>}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MICRO COMPONENTES
══════════════════════════════════════════════════════ */
function Label({ children }) {
  return <p style={{ fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:3,color:"rgba(232,200,122,.38)",marginBottom:9,textTransform:"uppercase" }}>{children}</p>;
}
const txtStyle = { width:"100%",background:"rgba(232,200,122,.04)",border:"1px solid rgba(232,200,122,.14)",borderRadius:2,padding:"13px 15px",color:"#e8d8b8",fontFamily:"'Cormorant Garamond',serif",fontSize:16,resize:"none",outline:"none",lineHeight:1.6 };
function Btn({ children, onClick, disabled, style }) {
  return <button onClick={onClick} disabled={disabled}
    style={{ width:"100%",padding:"16px",background:"linear-gradient(135deg,rgba(232,200,122,.1),rgba(200,150,10,.07))",border:"1px solid rgba(232,200,122,.32)",borderRadius:2,color:"#e8c87a",fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:3,cursor:disabled?"not-allowed":"pointer",transition:"all .3s",opacity:disabled?.4:1,textTransform:"uppercase",...style }}>{children}</button>;
}
function BtnSm({ children, onClick }) {
  return <div style={{ display:"flex",justifyContent:"center" }}>
    <button onClick={onClick} style={{ padding:"9px 24px",background:"transparent",border:"1px solid rgba(232,200,122,.18)",borderRadius:2,color:"rgba(232,200,122,.55)",fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:2,cursor:"pointer" }}>{children}</button>
  </div>;
}
function CabecalhoTela({ titulo, emoji, onVoltar }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:24 }}>
      <button onClick={onVoltar} style={{ background:"transparent",border:"1px solid rgba(232,200,122,.18)",borderRadius:2,padding:"7px 12px",color:"rgba(232,200,122,.55)",fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:2,cursor:"pointer",flexShrink:0 }}>← MENU</button>
      <h2 style={{ fontFamily:"'Cinzel',serif",fontSize:16,color:"#e8c87a",letterSpacing:1.5 }}>{emoji} {titulo}</h2>
    </div>
  );
}
function CTA() {
  return (
    <div style={{ marginTop:24,padding:"18px",textAlign:"center",border:"1px solid rgba(232,200,122,.1)",borderRadius:4,background:"rgba(232,200,122,.025)" }}>
      <p style={{ fontSize:13,fontStyle:"italic",color:"rgba(232,200,122,.48)",marginBottom:12,lineHeight:1.7 }}>
        Esta é uma prévia. Para uma leitura completa dos seus Registros Akáshicos, entre em contato.
      </p>
      <button onClick={()=>window.open("https://instagram.com/giselesteele.oficial","_blank")}
        style={{ padding:"12px 24px",background:"linear-gradient(135deg,rgba(232,200,122,.1),rgba(200,150,10,.07))",border:"1px solid rgba(232,200,122,.28)",borderRadius:2,color:"#e8c87a",fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:3,cursor:"pointer",textTransform:"uppercase" }}>
        → Agendar Leitura Completa
      </button>
      <p style={{ marginTop:10,fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:3,color:"rgba(232,200,122,.28)" }}>@giselesteele.oficial · ALQUIMIA DO AMOR</p>
    </div>
  );
}
function LoadingOrb({ a }) {
  return (
    <div style={{ textAlign:"center",padding:"28px 0" }}>
      <div style={{ position:"relative",width:70,height:70,margin:"0 auto 14px" }}>
        {[0,12,22].map((ins,i)=>(<div key={i} style={{ position:"absolute",inset:ins,borderRadius:"50%",border:`1px solid ${a.acento}${["60","40","28"][i]}`,animation:`rotateSlow ${[3,5,7][i]}s linear infinite${i%2?" reverse":""}` }}/>))}
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:22,animation:"breathe 2s ease-in-out infinite" }}>{a.emoji}</div>
      </div>
      <p style={{ fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:4,color:"rgba(232,200,122,.38)",animation:"breathe 2s ease-in-out infinite" }}>CANALIZANDO...</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TELAS
══════════════════════════════════════════════════════ */
function MenuHome({ onNav }) {
  const items = [
    { id:"oraculo", emoji:"🔮", titulo:"Oráculo Angelical", sub:"Escolha seu Arcanjo e receba uma mensagem canalizada" },
    { id:"baralho", emoji:"🃏", titulo:"Baralho das Cartas", sub:"Embaralhe, escolha uma carta e receba sua leitura" },
    { id:"spread",  emoji:"✨", titulo:"Tiragem 3 Cartas",   sub:"Passado · Presente · Futuro — uma leitura completa" },
  ];
  return (
    <div style={{ animation:"aparecer .7s ease" }}>
      <div style={{ textAlign:"center",marginBottom:32 }}>
        <p style={{ fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:7,color:"rgba(232,200,122,.35)",marginBottom:8 }}>ALQUIMIA DO AMOR</p>
        <h1 style={{ fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:700,letterSpacing:2,lineHeight:1.15,
          background:"linear-gradient(120deg,#c8a030,#f0d880,#e8c060,#c8a030)",backgroundSize:"300% auto",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
          animation:"shimmer 5s linear infinite" }}>Portal Espiritual</h1>
        <p style={{ fontStyle:"italic",fontSize:14,color:"rgba(232,200,122,.4)",marginTop:6,letterSpacing:1 }}>Mensagens dos Seres de Luz</p>
      </div>
      <div style={{ display:"flex",justifyContent:"center",gap:14,marginBottom:36 }}>
        {[ARCANJOS[0],ARCANJOS[4],ARCANJOS[5]].map((a,i)=>(
          <CartaFlip key={a.id} arcanjo={a} virada tamanho={74} delay={i*0.8} hoverable/>
        ))}
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
        {items.map((item,i)=>(
          <button key={item.id} onClick={()=>onNav(item.id)}
            style={{ display:"flex",alignItems:"center",gap:14,padding:"17px 18px",background:"linear-gradient(135deg,rgba(232,200,122,.05),rgba(200,150,10,.03))",border:"1px solid rgba(232,200,122,.14)",borderRadius:4,cursor:"pointer",textAlign:"left",transition:"all .3s",animation:`aparecer .5s ${i*.1}s both ease` }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(232,200,122,.38)";e.currentTarget.style.transform="translateX(4px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(232,200,122,.14)";e.currentTarget.style.transform="translateX(0)";}}>
            <span style={{ fontSize:24,flexShrink:0 }}>{item.emoji}</span>
            <div>
              <p style={{ fontFamily:"'Cinzel',serif",fontSize:13,color:"#e8c87a",letterSpacing:1,marginBottom:2 }}>{item.titulo}</p>
              <p style={{ fontSize:13,color:"rgba(232,200,122,.42)",fontStyle:"italic" }}>{item.sub}</p>
            </div>
            <span style={{ marginLeft:"auto",color:"rgba(232,200,122,.28)",fontSize:18 }}>›</span>
          </button>
        ))}
      </div>
      <div style={{ marginTop:28,padding:"16px",textAlign:"center",borderTop:"1px solid rgba(232,200,122,.07)" }}>
        <p style={{ fontSize:12,fontStyle:"italic",color:"rgba(232,200,122,.28)",marginBottom:8 }}>Sessões completas de Registros Akáshicos e Oráculo Angelical</p>
        <a href="https://instagram.com/giselesteele.oficial" target="_blank" rel="noreferrer"
          style={{ fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:4,color:"rgba(232,200,122,.4)",textDecoration:"none" }}>@giselesteele.oficial</a>
      </div>
    </div>
  );
}

function TelaOraculo({ onVoltar }) {
  const [etapa, setEtapa] = useState("form");
  const [intencao, setIntencao] = useState("");
  const [tema, setTema] = useState("");
  const [arcIdx, setArcIdx] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [virada, setVirada] = useState(false);

  async function consultar() {
    const a = ARCANJOS[arcIdx];
    setEtapa("loading");
    setTimeout(() => setVirada(true), 400);
    const prompt = `Você é o Arcanjo ${a.nome}, ser de luz do Raio ${a.rayo}, guardião de ${a.dom}.
Uma alma consultou o Oráculo com o tema "${tema}" e intenção: "${intencao || "Aberta ao que precisa ouvir"}".
Canalize uma mensagem em 3 parágrafos em português brasileiro direto e íntimo ("você").
1º: saudação + diagnóstico espiritual; 2º: orientação e caminho; 3º (MAIÚSCULAS): decreto de poder.
Sem markdown, asteriscos ou emojis.`;
    const txt = await chamarIA(prompt);
    setMensagem(txt);
    setEtapa("resultado");
  }

  function reiniciar() { setEtapa("form"); setIntencao(""); setTema(""); setArcIdx(null); setMensagem(""); setVirada(false); }
  const a = arcIdx !== null ? ARCANJOS[arcIdx] : null;

  return (
    <div style={{ animation:"aparecer .5s ease" }}>
      <CabecalhoTela titulo="Oráculo Angelical" emoji="🔮" onVoltar={onVoltar}/>
      {etapa==="form" && (
        <div>
          <Label>Tema</Label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:7,marginBottom:20 }}>
            {TEMAS.map(t=>(
              <button key={t} onClick={()=>setTema(t)} style={{ padding:"7px 13px",borderRadius:20,fontSize:13,cursor:"pointer",transition:"all .2s",fontFamily:"'Cormorant Garamond',serif",
                background:tema===t?"rgba(232,200,122,.12)":"transparent",
                border:`1px solid ${tema===t?"rgba(232,200,122,.5)":"rgba(232,200,122,.15)"}`,
                color:tema===t?"#e8c87a":"rgba(232,200,122,.55)" }}>{t}</button>
            ))}
          </div>
          <Label>Intenção (opcional)</Label>
          <textarea style={txtStyle} rows={2} placeholder="O que seu coração precisa ouvir?" value={intencao} onChange={e=>setIntencao(e.target.value)}/>
          <Label style={{marginTop:18}}>Escolha o Arcanjo</Label>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:22 }}>
            {ARCANJOS.map((ar,i)=>(
              <button key={ar.id} onClick={()=>setArcIdx(i)} style={{ padding:"11px 6px",borderRadius:4,cursor:"pointer",transition:"all .25s",textAlign:"center",
                background:arcIdx===i?`${ar.cor}80`:"rgba(232,200,122,.02)",
                border:`1px solid ${arcIdx===i?ar.acento:"rgba(232,200,122,.12)"}`,
                boxShadow:arcIdx===i?`0 0 14px ${ar.acento}28`:"none" }}>
                <div style={{fontSize:20,marginBottom:3}}>{ar.emoji}</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:arcIdx===i?ar.brilho:"rgba(232,200,122,.6)",letterSpacing:.5}}>{ar.nome}</div>
              </button>
            ))}
          </div>
          <Btn disabled={arcIdx===null||!tema} onClick={consultar}>✦ Receber Mensagem ✦</Btn>
        </div>
      )}
      {etapa==="loading" && a && (
        <div style={{ textAlign:"center",padding:"32px 0" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:20 }}>
            <CartaFlip arcanjo={a} virada={virada} tamanho={120} hoverable={false}/>
          </div>
          <p style={{ fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:4,color:"rgba(232,200,122,.42)",animation:"breathe 2s ease-in-out infinite" }}>CANALIZANDO...</p>
        </div>
      )}
      {etapa==="resultado" && a && (
        <div style={{ animation:"aparecer .6s ease" }}>
          <div style={{ display:"flex",alignItems:"center",gap:14,padding:"14px",border:"1px solid rgba(232,200,122,.1)",borderRadius:4,background:"rgba(232,200,122,.03)",marginBottom:16 }}>
            <div style={{ width:58,height:81,borderRadius:6,overflow:"hidden",flexShrink:0 }}><CardFront a={a}/></div>
            <div>
              <p style={{ fontFamily:"'Cinzel',serif",fontSize:14,color:"#e8c87a" }}>Arcanjo {a.nome}</p>
              <p style={{ fontSize:12,fontStyle:"italic",color:"rgba(232,200,122,.42)",marginTop:2 }}>{a.rayo}</p>
              <span style={{ display:"inline-block",marginTop:6,padding:"3px 9px",border:"1px solid rgba(232,200,122,.2)",borderRadius:20,fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"rgba(232,200,122,.55)" }}>{a.palavra}</span>
            </div>
          </div>
          <div style={{ fontSize:16,lineHeight:1.95,color:"#e8d8c0",whiteSpace:"pre-line",padding:"20px",background:"rgba(232,200,122,.03)",border:"1px solid rgba(232,200,122,.09)",borderRadius:4 }}>
            <Typewriter texto={mensagem}/>
          </div>
          <CTA/><BtnSm onClick={reiniciar}>✦ Nova Consulta</BtnSm>
        </div>
      )}
    </div>
  );
}

function TelaBaralho({ onVoltar }) {
  const [etapa, setEtapa] = useState("form");
  const [intencao, setIntencao] = useState("");
  const [ordem, setOrdem] = useState([]);
  const [escolhida, setEscolhida] = useState(null);
  const [viradas, setViradas] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  function embaralhar() {
    const arr = [...Array(6).keys()].sort(() => Math.random() - 0.5);
    setOrdem(arr); setEtapa("embaralhando");
    setTimeout(() => setEtapa("escolha"), 1800);
  }

  async function escolher(i) {
    if (etapa !== "escolha") return;
    setEscolhida(i); setEtapa("virando");
    setTimeout(() => {
      setViradas({[i]:true}); setLoading(true);
      const a = ARCANJOS[ordem[i]];
      const prompt = `Você é o Arcanjo ${a.nome}, Raio ${a.rayo}, dom ${a.dom}.
Palavra-chave da carta: "${a.palavra}". Intenção: "${intencao||"espontânea"}".
3 parágrafos em português íntimo: 1) saudação+diagnóstico 2) orientação 3) DECRETO EM MAIÚSCULAS. Sem markdown.`;
      chamarIA(prompt).then(txt => { setMensagem(txt); setLoading(false); setEtapa("resultado"); });
    }, 700);
  }

  function reiniciar() { setEtapa("form"); setIntencao(""); setOrdem([]); setEscolhida(null); setViradas({}); setMensagem(""); setLoading(false); }
  const a = escolhida !== null && ordem.length ? ARCANJOS[ordem[escolhida]] : null;

  return (
    <div style={{ animation:"aparecer .5s ease" }}>
      <CabecalhoTela titulo="Baralho das Cartas" emoji="🃏" onVoltar={onVoltar}/>
      {etapa==="form" && (
        <div>
          <Label>Intenção (opcional)</Label>
          <textarea style={txtStyle} rows={2} placeholder="O que você quer iluminar hoje?" value={intencao} onChange={e=>setIntencao(e.target.value)}/>
          <Btn onClick={embaralhar} style={{marginTop:18}}>✦ Embaralhar as Cartas ✦</Btn>
        </div>
      )}
      {etapa==="embaralhando" && (
        <div style={{ textAlign:"center",padding:"28px 0" }}>
          <div style={{ display:"flex",justifyContent:"center",position:"relative",height:90,marginBottom:18 }}>
            {[0,1,2,3,4,5].map(i=>(
              <div key={i} style={{ width:50,height:70,borderRadius:5,overflow:"hidden",position:"absolute",
                left:`calc(50% + ${(i-2.5)*14}px)`,top:0,
                animation:`${i%2===0?"shuffleL":"shuffleR"} .5s ${i*.08}s ease-in-out infinite`,
                boxShadow:"0 4px 14px rgba(0,0,0,.6)" }}><CardBack/></div>
            ))}
          </div>
          <p style={{ fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:4,color:"rgba(232,200,122,.4)",animation:"breathe 1.5s ease-in-out infinite" }}>EMBARALHANDO...</p>
        </div>
      )}
      {etapa==="escolha" && (
        <div style={{ animation:"aparecer .5s ease" }}>
          <p style={{ textAlign:"center",fontStyle:"italic",color:"rgba(232,200,122,.42)",fontSize:14,marginBottom:18,lineHeight:1.6 }}>Respire fundo. Qual carta chama você?</p>
          <div style={{ display:"flex",justifyContent:"center",flexWrap:"wrap",gap:10,marginBottom:14 }}>
            {ordem.map((cidx,i)=>(
              <CartaFlip key={i} arcanjo={ARCANJOS[cidx]} virada={false} tamanho={86} delay={i*0.35} onClick={()=>escolher(i)} hoverable/>
            ))}
          </div>
          <p style={{ textAlign:"center",fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:3,color:"rgba(232,200,122,.25)" }}>6 CARTAS · ESCOLHA 1</p>
        </div>
      )}
      {etapa==="virando" && a && (
        <div style={{ textAlign:"center",padding:"28px 0" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:18 }}>
            <CartaFlip arcanjo={a} virada={!!viradas[escolhida]} tamanho={130} hoverable={false}/>
          </div>
          {viradas[escolhida] && <p style={{ fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:4,color:"rgba(232,200,122,.42)",animation:"breathe 2s ease-in-out infinite" }}>CANALIZANDO...</p>}
        </div>
      )}
      {etapa==="resultado" && a && (
        <div style={{ animation:"aparecer .6s ease" }}>
          <div style={{ display:"flex",alignItems:"center",gap:14,padding:"14px",border:"1px solid rgba(232,200,122,.1)",borderRadius:4,background:"rgba(232,200,122,.03)",marginBottom:16 }}>
            <div style={{ width:58,height:81,borderRadius:6,overflow:"hidden",flexShrink:0 }}><CardFront a={a}/></div>
            <div>
              <p style={{ fontFamily:"'Cinzel',serif",fontSize:14,color:"#e8c87a" }}>Arcanjo {a.nome}</p>
              <p style={{ fontSize:12,fontStyle:"italic",color:"rgba(232,200,122,.42)",marginTop:2 }}>{a.dom}</p>
            </div>
          </div>
          {loading ? <LoadingOrb a={a}/> : (
            <div style={{ fontSize:16,lineHeight:1.95,color:"#e8d8c0",whiteSpace:"pre-line",padding:"20px",background:"rgba(232,200,122,.03)",border:"1px solid rgba(232,200,122,.09)",borderRadius:4 }}>
              <Typewriter texto={mensagem}/>
            </div>
          )}
          {!loading && mensagem && <><CTA/><BtnSm onClick={reiniciar}>✦ Nova Consulta</BtnSm></>}
        </div>
      )}
    </div>
  );
}

function TelaSpread({ onVoltar }) {
  const [etapa, setEtapa] = useState("form");
  const [intencao, setIntencao] = useState("");
  const [cartas, setCartas] = useState([]);
  const [viradas, setViradas] = useState([false,false,false]);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  function sortear() {
    const s = [...ARCANJOS].sort(() => Math.random() - 0.5).slice(0, 3);
    setCartas(s); setViradas([false,false,false]); setMensagem(""); setEtapa("spread");
  }

  function virar(i) {
    const nv = [...viradas]; nv[i] = true; setViradas(nv);
    if (nv.every(Boolean) && !mensagem) {
      setLoading(true);
      const [past,pres,fut] = cartas;
      const prompt = `Oráculo angelical. Intenção: "${intencao||"aberta"}".
PASSADO: Arcanjo ${past.nome} (${past.palavra})
PRESENTE: Arcanjo ${pres.nome} (${pres.palavra})
FUTURO: Arcanjo ${fut.nome} (${fut.palavra})
4 parágrafos em português íntimo: 1) visão geral 2) passado 3) presente+futuro 4) DECRETO FINAL EM MAIÚSCULAS. Sem markdown.`;
      chamarIA(prompt).then(txt => { setMensagem(txt); setLoading(false); setEtapa("resultado"); });
    }
  }

  function reiniciar() { setEtapa("form"); setIntencao(""); setCartas([]); setViradas([false,false,false]); setMensagem(""); setLoading(false); }

  return (
    <div style={{ animation:"aparecer .5s ease" }}>
      <CabecalhoTela titulo="Tiragem 3 Cartas" emoji="✨" onVoltar={onVoltar}/>
      {etapa==="form" && (
        <div>
          <div style={{ display:"flex",justifyContent:"center",gap:10,marginBottom:24 }}>
            {SPREAD_POS.map((pos,i)=>(
              <div key={i} style={{ textAlign:"center",flex:1 }}>
                <div style={{ maxWidth:88,margin:"0 auto",height:123,borderRadius:6,border:"1px dashed rgba(232,200,122,.16)",background:"rgba(232,200,122,.02)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <span style={{ color:"rgba(232,200,122,.18)",fontSize:22 }}>?</span>
                </div>
                <p style={{ marginTop:6,fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:2,color:"rgba(232,200,122,.3)" }}>{pos.toUpperCase()}</p>
              </div>
            ))}
          </div>
          <Label>Intenção (opcional)</Label>
          <textarea style={txtStyle} rows={2} placeholder="O que você quer iluminar em passado, presente e futuro?" value={intencao} onChange={e=>setIntencao(e.target.value)}/>
          <Btn onClick={sortear} style={{marginTop:18}}>✦ Revelar as 3 Cartas ✦</Btn>
        </div>
      )}
      {(etapa==="spread"||etapa==="resultado") && cartas.length===3 && (
        <div>
          {etapa==="spread" && !viradas.every(Boolean) && (
            <p style={{ textAlign:"center",fontStyle:"italic",color:"rgba(232,200,122,.4)",fontSize:14,marginBottom:18,lineHeight:1.6 }}>
              Toque em cada carta para revelar
            </p>
          )}
          <div style={{ display:"flex",justifyContent:"center",gap:10,marginBottom:18,flexWrap:"wrap" }}>
            {cartas.map((a,i)=>(
              <div key={i} style={{ textAlign:"center" }}>
                <CartaFlip arcanjo={a} virada={viradas[i]} onClick={!viradas[i]?()=>virar(i):undefined} tamanho={88} hoverable={!viradas[i]} delay={i*0.4}/>
                <p style={{ marginTop:6,fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:2,color:viradas[i]?a.acento:"rgba(232,200,122,.25)" }}>{SPREAD_POS[i].toUpperCase()}</p>
                {viradas[i] && <p style={{ fontSize:10,color:"rgba(232,200,122,.42)",fontStyle:"italic",marginTop:2 }}>{a.nome}</p>}
              </div>
            ))}
          </div>
          {etapa==="spread" && !viradas.every(Boolean) && (
            <p style={{ textAlign:"center",fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:3,color:"rgba(232,200,122,.22)" }}>{viradas.filter(Boolean).length}/3 REVELADAS</p>
          )}
          {etapa==="resultado" && (
            <div style={{ animation:"aparecer .6s ease" }}>
              {loading ? <LoadingOrb a={cartas[1]}/> : (
                <div style={{ fontSize:16,lineHeight:1.95,color:"#e8d8c0",whiteSpace:"pre-line",padding:"20px",background:"rgba(232,200,122,.03)",border:"1px solid rgba(232,200,122,.09)",borderRadius:4 }}>
                  <Typewriter texto={mensagem}/>
                </div>
              )}
              {!loading && mensagem && <><CTA/><BtnSm onClick={reiniciar}>✦ Nova Tiragem</BtnSm></>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════════════ */
export default function App() {
  const [tela, setTela] = useState("menu");
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#0d0a06;}
        @keyframes aparecer{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.04);opacity:1}}
        @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes twinkle{0%,100%{opacity:.04}50%{opacity:.42}}
        @keyframes flutuarCarta{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes shuffleL{0%,100%{transform:translateX(0) rotate(0)}40%{transform:translateX(-34px) rotate(-7deg)}}
        @keyframes shuffleR{0%,100%{transform:translateX(0) rotate(0)}40%{transform:translateX(34px) rotate(7deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        textarea:focus{border-color:rgba(232,200,122,.38)!important;background:rgba(232,200,122,.06)!important;}
        textarea::placeholder{color:rgba(232,200,122,.22);font-style:italic;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(232,200,122,.18);border-radius:2px;}
      `}</style>
      <Estrelas/>
      <div style={{ minHeight:"100vh",background:"radial-gradient(ellipse at 50% 0%,#1e1408 0%,#0d0a06 45%,#060402 100%)",display:"flex",alignItems:"flex-start",justifyContent:"center",fontFamily:"'Cormorant Garamond',serif",color:"#e8d8b8",padding:"20px 16px 40px",position:"relative" }}>
        <div style={{ position:"relative",zIndex:10,width:"100%",maxWidth:620,background:"linear-gradient(160deg,rgba(26,17,9,.98),rgba(15,10,5,.99))",border:"1px solid rgba(232,200,122,.15)",borderRadius:6,padding:"clamp(22px,5vw,44px) clamp(16px,5vw,40px)",marginTop:20 }}>
          <div style={{ position:"absolute",inset:-1,borderRadius:6,background:"linear-gradient(135deg,rgba(232,200,122,.2),transparent 50%,rgba(232,200,122,.06))",pointerEvents:"none" }}/>
          {tela==="menu"    && <MenuHome    onNav={setTela}/>}
          {tela==="oraculo" && <TelaOraculo onVoltar={()=>setTela("menu")}/>}
          {tela==="baralho" && <TelaBaralho onVoltar={()=>setTela("menu")}/>}
          {tela==="spread"  && <TelaSpread  onVoltar={()=>setTela("menu")}/>}
        </div>
      </div>
    </>
  );
}
