import { useState } from "react";

const API_URL = "http://127.0.0.1:5000/nasa";

const TEAL = "#00b5b5";
const TEALDARK = "#007a7a";
const BG = "#ffffff";
const BORDER = "#d0ecec";
const SURFACE = "#f4fbfb";

const DIMENSOES = [
  {
    id: "mental",
    label: "Atividade Mental",
    desc: "Quanto esforço mental foi exigido? A tarefa foi fácil ou difícil, simples ou complexa?",
    detalhes: {
      definicao: "Mede o quanto de esforço mental e perceptivo a tarefa exigiu — pensar, decidir, calcular, lembrar, olhar, pesquisar etc.",
      escala: [
        { range: "0 – 29", nivel: "Baixo", desc: "Tarefa simples e automática, pouco pensamento necessário." },
        { range: "30 – 59", nivel: "Moderado", desc: "Tarefa exige atenção e raciocínio, mas não de forma intensa." },
        { range: "60 – 100", nivel: "Alto", desc: "Tarefa extremamente complexa, demandando concentração máxima." },
      ],
      dica: "Pense em quanto você precisou pensar, decidir ou resolver problemas durante a atividade.",
      exemplo: "Resolver um bug complexo = alto · Responder um e-mail simples = baixo",
    },
  },
  {
    id: "fisica",
    label: "Atividade Física",
    desc: "Quanto esforço físico foi exigido? A tarefa foi leve ou pesada, lenta ou agitada?",
    detalhes: {
      definicao: "Mede o quanto de esforço físico a tarefa exigiu — empurrar, puxar, girar, pressionar, ativar, mover etc.",
      escala: [
        { range: "0 – 29", nivel: "Baixo", desc: "Tarefa passiva, sem esforço corporal perceptível." },
        { range: "30 – 59", nivel: "Moderado", desc: "Alguma movimentação ou esforço físico presente." },
        { range: "60 – 100", nivel: "Alto", desc: "Tarefa físicamente intensa, extenuante ou muito repetitiva." },
      ],
      dica: "Considere toda a movimentação corporal necessária para realizar a atividade.",
      exemplo: "Carregar equipamentos pesados = alto · Trabalho sentado no computador = baixo",
    },
  },
  {
    id: "temporal",
    label: "Pressão Temporal",
    desc: "Quanta pressão de tempo você sentiu? O ritmo foi lento ou apressado?",
    detalhes: {
      definicao: "Mede a pressão de tempo sentida durante a tarefa. Ritmo lento e tranquilo versus ritmo frenético e urgente.",
      escala: [
        { range: "0 – 29", nivel: "Baixo", desc: "Sem pressa, tempo suficiente para completar com calma." },
        { range: "30 – 59", nivel: "Moderado", desc: "Ritmo razoável, alguma pressão de tempo percebida." },
        { range: "60 – 100", nivel: "Alto", desc: "Extremamente apressado, sem tempo, ritmo frenético." },
      ],
      dica: "Reflita sobre a sensação de urgência e se o tempo disponível foi suficiente.",
      exemplo: "Entrega com deadline em 30 min = alto · Planejamento semanal sem prazo = baixo",
    },
  },
  {
    id: "desempenho",
    label: "Desempenho",
    desc: "Quão bem-sucedido você foi em realizar o que foi pedido?",
    detalhes: {
      definicao: "Avalia o quanto você acredita que teve sucesso. Atenção: valores altos indicam insatisfação (desempenho ruim), valores baixos indicam sucesso.",
      escala: [
        { range: "0 – 29", nivel: "Excelente", desc: "Conseguiu realizar perfeitamente o que foi pedido." },
        { range: "30 – 59", nivel: "Razoável", desc: "Desempenho aceitável, com algumas falhas ou imprecisões." },
        { range: "60 – 100", nivel: "Insatisfatório", desc: "Não conseguiu atingir os objetivos esperados." },
      ],
      dica: "Esta dimensão é inversa: quanto maior o valor, pior o desempenho percebido.",
      exemplo: "Completou a tarefa com erros = alto (ruim) · Atingiu todos os objetivos = baixo (bom)",
    },
  },
  {
    id: "esforco",
    label: "Esforço",
    desc: "Quanto esforço (mental e físico) você precisou para atingir seu nível de desempenho?",
    detalhes: {
      definicao: "Mede o esforço total (mental e físico combinados) que você precisou despender para alcançar o desempenho que obteve.",
      escala: [
        { range: "0 – 29", nivel: "Baixo", desc: "Tarefa exigiu pouco esforço, realizada com facilidade." },
        { range: "30 – 59", nivel: "Moderado", desc: "Esforço razoável necessário para concluir." },
        { range: "60 – 100", nivel: "Alto", desc: "Tarefa extremamente desgastante, esforço máximo empregado." },
      ],
      dica: "Considere o esforço total combinado — não separe mental de físico aqui.",
      exemplo: "Máxima concentração e energia = alto · Rotina simples = baixo",
    },
  },
  {
    id: "frustracao",
    label: "Frustração",
    desc: "Você se sentiu irritado, estressado, incomodado ou satisfeito e relaxado?",
    detalhes: {
      definicao: "Mede o nível de irritação, estresse, aborrecimento, insegurança ou raiva versus satisfação, tranquilidade e contentamento durante a tarefa.",
      escala: [
        { range: "0 – 29", nivel: "Satisfeito", desc: "Sensação de satisfação, tranquilidade e bem-estar." },
        { range: "30 – 59", nivel: "Neutro", desc: "Sentimentos mistos, nem muito frustrado nem satisfeito." },
        { range: "60 – 100", nivel: "Frustrado", desc: "Alta irritação, estresse ou aborrecimento durante a tarefa." },
      ],
      dica: "Pense em como você se sentiu emocionalmente ao longo de toda a atividade.",
      exemplo: "Sistema travou várias vezes = alto · Trabalho fluiu bem = baixo",
    },
  },
];

function ErgoLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 85 Q30 70 28 50 Q26 30 42 20 Q38 40 50 55 Q62 40 58 20 Q74 30 72 50 Q70 70 50 85Z" fill={TEAL} opacity="0.9" />
      <ellipse cx="50" cy="87" rx="14" ry="4" fill={TEALDARK} opacity="0.6" />
    </svg>
  );
}

function classif(score) {
  if (score < 40) return { label: "Baixa carga", color: "#0f7a5a", bg: "#e1f5ee" };
  if (score < 70) return { label: "Carga moderada", color: "#a05c00", bg: "#faeeda" };
  return { label: "Alta carga", color: "#a32d2d", bg: "#fcebeb" };
}

/* ── Página de Informações ── */
function PaginaInfo({ onVoltar }) {
  const [ativo, setAtivo] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: BG, padding: "40px 16px 80px", fontFamily: "'Outfit', sans-serif", color: "#111" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{ width: "100%", maxWidth: "760px", margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "36px" }}>
          <button onClick={onVoltar} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "8px 16px", color: TEAL, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            ← Voltar
          </button>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: TEAL, letterSpacing: "0.14em", marginBottom: "4px" }}>GUIA DE REFERÊNCIA</div>
            <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#0a1a1a", letterSpacing: "-0.01em" }}>As 6 Dimensões do NASA-TLX</h1>
          </div>
        </div>

        <div style={{ background: `${TEAL}12`, border: `1px solid ${TEAL}35`, borderRadius: "14px", padding: "20px 24px", marginBottom: "28px" }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#333", lineHeight: 1.8 }}>
            O <strong style={{ color: TEAL, fontWeight: 600 }}>NASA Task Load Index (TLX)</strong> é um instrumento multidimensional desenvolvido pela NASA para medir a carga de trabalho percebida. Cada dimensão captura um aspecto diferente da sua experiência.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {DIMENSOES.map((d) => {
            const aberta = ativo === d.id;
            return (
              <div key={d.id} style={{ background: "#fff", border: `1px solid ${aberta ? TEAL + "55" : BORDER}`, borderRadius: "14px", overflow: "hidden", transition: "border-color 0.2s" }}>
                <button onClick={() => setAtivo(aberta ? null : d.id)}
                  style={{ width: "100%", background: "none", border: "none", padding: "18px 24px", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: "18px", lineHeight: 1, flexShrink: 0 }}>{d.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: TEAL, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{d.label}</div>
                    <div style={{ fontSize: "13px", color: "#777", lineHeight: 1.5 }}>{d.desc}</div>
                  </div>
                  <span style={{ color: TEAL, fontSize: "18px", flexShrink: 0, display: "inline-block", transform: aberta ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>›</span>
                </button>

                {aberta && (
                  <div style={{ borderTop: `1px solid ${TEAL}22`, padding: "20px 24px 24px" }}>
                    <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#333", lineHeight: 1.8, borderLeft: `3px solid ${TEAL}`, paddingLeft: "14px" }}>
                      {d.detalhes.definicao}
                    </p>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: TEAL, letterSpacing: "0.12em", marginBottom: "10px" }}>ESCALA DE REFERÊNCIA</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", marginBottom: "18px" }}>
                      {d.detalhes.escala.map((s, i) => (
                        <div key={i} style={{ background: SURFACE, borderRadius: "10px", padding: "12px 14px", border: `1px solid ${BORDER}` }}>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: TEAL, fontWeight: 700, marginBottom: "4px" }}>{s.range}</div>
                          <div style={{ fontSize: "12px", fontWeight: 600, color: "#0a1a1a", marginBottom: "4px" }}>{s.nivel}</div>
                          <div style={{ fontSize: "11px", color: "#888", lineHeight: 1.5 }}>{s.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div style={{ background: `${TEAL}0d`, border: `1px solid ${TEAL}30`, borderRadius: "10px", padding: "12px 14px" }}>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: TEAL, letterSpacing: "0.1em", marginBottom: "6px" }}>COMO RESPONDER</div>
                        <div style={{ fontSize: "12px", color: "#555", lineHeight: 1.6 }}>{d.detalhes.dica}</div>
                      </div>
                      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "12px 14px" }}>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#aaa", letterSpacing: "0.1em", marginBottom: "6px" }}>EXEMPLO PRÁTICO</div>
                        <div style={{ fontSize: "12px", color: "#777", lineHeight: 1.6 }}>{d.detalhes.exemplo}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "32px", padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "14px" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: TEAL, letterSpacing: "0.12em", marginBottom: "10px" }}>SOBRE O INSTRUMENTO</div>
          <p style={{ margin: 0, fontSize: "12px", color: "#666", lineHeight: 1.8 }}>
            O NASA-TLX foi desenvolvido por Sandra G. Hart e Lowell E. Staveland no NASA Ames Research Center (1988). É amplamente utilizado em ergonomia, psicologia do trabalho e pesquisa em interfaces humano-computador. O score final (TLX Raw) é a média aritmética das seis dimensões, variando de 0 a 100.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Slider ── */
function SliderCard({ dimensao, value, onChange }) {
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "14px", padding: "20px 24px", marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>{dimensao.icon}</span>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: TEAL, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "3px" }}>{dimensao.label}</div>
            <div style={{ fontSize: "12px", color: "#777", maxWidth: "380px", lineHeight: 1.5 }}>{dimensao.desc}</div>
          </div>
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "28px", fontWeight: "700", color: TEAL, minWidth: "52px", textAlign: "right", lineHeight: 1 }}>{value}</div>
      </div>
      <div style={{ position: "relative", marginTop: "14px" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: `${value}%`, height: "4px", background: TEAL, borderRadius: "2px", transform: "translateY(-50%)", transition: "width 0.1s", pointerEvents: "none", zIndex: 1 }} />
        <input type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))}
          style={{ width: "100%", appearance: "none", background: `${TEAL}22`, height: "4px", borderRadius: "2px", outline: "none", cursor: "pointer", position: "relative", zIndex: 2 }} />
        <style>{`input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:white;border:3px solid ${TEAL};cursor:pointer;box-shadow:0 0 0 3px ${TEAL}30;}`}</style>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
          <span style={{ fontSize: "10px", color: "#bbb", fontFamily: "'Space Mono', monospace" }}>0 · Baixo</span>
          <span style={{ fontSize: "10px", color: "#bbb", fontFamily: "'Space Mono', monospace" }}>100 · Alto</span>
        </div>
      </div>
    </div>
  );
}

/* ── Badge de Classificação ── */
function ClassBadge({ score }) {
  const cl = classif(score);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: cl.bg, color: cl.color, padding: "6px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "600", border: `1px solid ${cl.color}44` }}>
      {cl.label}
    </span>
  );
}

/* ── App principal ── */
export default function NasaTLX() {
  const [pagina, setPagina] = useState("form");
  const [form, setForm] = useState({ nome: "", email: "", mental: 50, fisica: 50, temporal: 50, desempenho: 50, esforco: 50, frustracao: 50 });
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  if (pagina === "info") return <PaginaInfo onVoltar={() => setPagina("form")} />;

  const setDim = (id, val) => setForm((f) => ({ ...f, [id]: val }));

  const enviar = async () => {
    if (!form.nome.trim() || !form.email.trim()) { setErro("Preencha nome e e-mail antes de enviar."); return; }
    setErro(""); setLoading(true); setResultado(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: form.nome, email: form.email, mental: form.mental, fisica: form.fisica, temporal: form.temporal, desempenho: form.desempenho, esforco: form.esforco, frustracao: form.frustracao }),
      });
      if (!res.ok) throw new Error();
      setResultado(await res.json());
    } catch {
      setErro("Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://127.0.0.1:5000");
    } finally { setLoading(false); }
  };

  const resetar = () => {
    setResultado(null);
    setForm({ nome: "", email: "", mental: 50, fisica: 50, temporal: 50, desempenho: 50, esforco: 50, frustracao: 50 });
  };

  const tlxScore = resultado?.tlx_raw ?? ((form.mental + form.fisica + form.temporal + form.desempenho + form.esforco + form.frustracao) / 6);

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 16px 80px", fontFamily: "'Outfit', sans-serif", color: "#111" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{ width: "100%", maxWidth: "660px" }}>

        {/* Top nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", fontWeight: 700, color: TEAL, letterSpacing: "0.1em" }}></div>
              <div style={{ fontSize: "9px", color: "#888", letterSpacing: "0.05em" }}></div>
            </div>
          </div>

          <button
            onClick={() => setPagina("info")}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "999px", padding: "8px 16px", color: TEAL, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.08em" }}
          >
            <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: `${TEAL}20`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: TEAL, fontWeight: 700 }}>?</span>
            GUIA DAS DIMENSÕES
          </button>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          
          <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, color: "#0a1a1a", margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Avaliação de Carga <br />
            <span style={{ color: TEAL }}>de Trabalho</span>
          </h1>
          <p style={{ color: "#555", fontSize: "15px", maxWidth: "400px", margin: "0 auto", lineHeight: 1.7 }}>
            Instrumento NASA Task Load Index — avalie seis dimensões da carga de trabalho e obtenha sua classificação instantânea.
          </p>
        </div>

        {/* Divisor */}
        <div style={{ width: "100%", height: "1px", background: `linear-gradient(90deg, transparent, ${TEAL}40, transparent)`, marginBottom: "28px" }} />

        {resultado ? (
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "20px", padding: "40px", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: `${TEAL}18`, border: `2px solid ${TEAL}55`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "24px" }}>✓</div>
            <h2 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: 600, color: "#0a1a1a" }}>Avaliação enviada!</h2>
            <p style={{ color: "#888", fontSize: "13px", marginBottom: "28px" }}>Dados salvos no banco e exportados para Excel.</p>

            <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", marginBottom: "24px", border: `1px solid ${BORDER}` }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: TEAL, letterSpacing: "0.12em", marginBottom: "8px" }}>TLX RAW SCORE</div>
              <div style={{ fontSize: "64px", fontWeight: 700, color: TEAL, lineHeight: 1, marginBottom: "16px", fontFamily: "'Space Mono', monospace" }}>{tlxScore.toFixed(1)}</div>
              <ClassBadge score={tlxScore} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px", marginBottom: "28px" }}>
              {DIMENSOES.map(d => (
                <div key={d.id} style={{ background: "#fff", borderRadius: "10px", padding: "12px 8px", border: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: "9px", color: TEAL, fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>{d.label}</div>
                  <div style={{ fontSize: "22px", fontWeight: 700, fontFamily: "'Space Mono', monospace", color: "#0a1a1a" }}>{form[d.id]}</div>
                </div>
              ))}
            </div>

            <button onClick={resetar} style={{ background: `${TEAL}15`, border: `1px solid ${TEAL}50`, color: TEAL, borderRadius: "10px", padding: "12px 28px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
              Nova avaliação
            </button>
          </div>
        ) : (
          <div>
            {/* Identificação */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "16px", padding: "24px", marginBottom: "14px" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: TEAL, letterSpacing: "0.14em", marginBottom: "16px" }}>IDENTIFICAÇÃO</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { id: "nome", label: "Nome completo", type: "text", placeholder: "Seu nome" },
                  { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" }
                ].map(field => (
                  <div key={field.id}>
                    <label style={{ display: "block", fontSize: "10px", color: TEAL, marginBottom: "6px", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em" }}>{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.id]}
                      placeholder={field.placeholder}
                      onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                      style={{ width: "100%", boxSizing: "border-box", background: "#f7fefe", border: `1px solid ${TEAL}40`, borderRadius: "8px", padding: "10px 12px", color: "#111", fontSize: "14px", fontFamily: "'Outfit', sans-serif", outline: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: TEAL, letterSpacing: "0.14em", margin: "22px 0 12px 4px" }}>DIMENSÕES · MOVA OS CONTROLES</div>

            {DIMENSOES.map(d => <SliderCard key={d.id} dimensao={d} value={form[d.id]} onChange={val => setDim(d.id, val)} />)}

            {erro && (
              <div style={{ background: "#fcebeb", border: "1px solid #f09595", borderRadius: "10px", padding: "12px 16px", marginTop: "12px", color: "#a32d2d", fontSize: "13px" }}>{erro}</div>
            )}

            <button
              onClick={enviar}
              disabled={loading}
              style={{ marginTop: "20px", width: "100%", padding: "16px", background: loading ? `${TEAL}60` : TEAL, border: "none", borderRadius: "12px", color: "#fff", fontWeight: 700, fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em" }}
            >
              {loading ? "Enviando..." : "Calcular & Enviar Avaliação →"}
            </button>

            <p style={{ textAlign: "center", fontSize: "11px", color: "#bbb", marginTop: "16px" }}>
              Os dados são salvos localmente e exportados para Excel automaticamente.
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "32px", opacity: 0.4 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: "#888", letterSpacing: "0.14em" }}></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}