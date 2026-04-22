import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Ergolaborimage from "./assets/ErgolaborVerde.png";

// Cores padrão do projeto (mesmo do NasaTLX)
const TEAL = "#00b5b5";
const SURFACE = "#f4fbfb";
const BORDER = "#d0ecec";

// Função simples para substituir a dependência '@lib/utils'
const cn = (...args) => args.filter(Boolean).join(" ");

// Removidos os ícones do LucideReact para evitar erros de importação
const NAV = [
  { id: "inicio", label: "Página inicial" },
  { id: "fundamentos", label: "Material teórico" },
  { id: "apoio", label: "Material de apoio" },
  { id: "questionarios", label: "Questionários" },
  { id: "sobre", label: "Sobre" },
  { id: "contato", label: "Contato" },
];

function ScrollToTarget({ targetSection }) {
  useEffect(() => {if (targetSection) { document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });}}, [targetSection]);
  return null;
}

function NavLinks({ onNavigate }) {
  return (
    <nav aria-label="Menu principal" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {NAV.map((item) => (
        <Link
          key={item.id}
          href={`/${item.id}`}
          onClick={() => onNavigate?.()}
          style={{
            display: "block",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            textDecoration: "none",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.target.style.background = SURFACE}
          onMouseOut={(e) => e.target.style.background = "transparent"}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default function Home({ targetSection }) {
  // Simulando o hook isMobile para não quebrar a tela
  const isMobile = false; 
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#111", fontFamily: "'Outfit', aptos" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <ScrollToTarget targetSection={targetSection} />

      {/* Topbar */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${BORDER}`, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <div style={{ margin: "0 auto", display: "flex", maxWidth: "1152px", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ height: "40px", width: "40px", display: "grid", placeItems: "center", borderRadius: "12px", backgroundColor: TEAL, color: "#fff", fontWeight: "bold" }}>
              AP
            </div>
            <img src="https://ccbs.ufcg.edu.br/images/Logomarcas/UFCG_logo_png.png" alt="Logo" style={{ height: "40px", width: "40px" }} />
            <div style={{ lineHeight: "1.2" }}>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>Análise Psicossocial</p>
              <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>Riscos psicossociais no ambiente de trabalho</p>
            </div>
          </div>
        
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/questionarios">
              <button style={{ background: TEAL, color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                Acessar questionário
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div style={{ margin: "0 auto", display: "grid", maxWidth: "1152px", gridTemplateColumns: isMobile ? "1fr" : "auto 1fr", gap: 0 }}>
        
        {/* Sidebar (desktop) */}
        {!isMobile && (
          <aside style={{ position: "sticky", top: "68px", height: "calc(100vh - 68px)", borderRight: `1px solid ${BORDER}`, width: sidebarCollapsed ? "64px" : "288px", backgroundColor: "#fff" }}>
            <div style={{ padding: "16px" }}>
              {!sidebarCollapsed && (
                <div style={{ marginBottom: "16px" }}>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: "600" }}>Navegação</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>Estrutura de leitura rápida e materiais.</p>
                </div>
              )}

              <NavLinks />

              <hr style={{ borderTop: `1px solid ${BORDER}`, borderBottom: "none", margin: "20px 0" }} />

              {!sidebarCollapsed && (
                <div style={{ borderRadius: "12px", border: `1px solid ${BORDER}`, backgroundColor: SURFACE, padding: "16px" }}>
                  <p style={{ margin: 0, fontSize: "12px", fontWeight: "600" }}>Objetivo</p>
                  <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#666" }}>
                    Apoiar a identificação e o entendimento de riscos psicossociais e orientar ações preventivas.
                  </p>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main id="conteudo" style={{ minWidth: 0, padding: "40px 16px" }}>
          
          {/* Hero */}
          <section id="inicio" style={{ position: "relative", overflow: "hidden", borderRadius: "24px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", padding: "48px" }}>
            <div style={{ position: "relative", zIndex: 10 }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <span style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, color: TEAL, padding: "4px 12px", borderRadius: "16px", fontSize: "12px", fontWeight: "600" }}>Guia inicial</span>
                <span style={{ border: `1px solid #ddd`, padding: "4px 12px", borderRadius: "16px", fontSize: "12px" }}>Foco em prevenção</span>
              </div>

              <h1 style={{ margin: "0 0 16px", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "900", lineHeight: "1.05", letterSpacing: "-0.02em" }}>
                Riscos psicossociais <span style={{ color: TEAL }}>não são “invisíveis”</span>.
              </h1>
              <p style={{ margin: "0 0 28px", maxWidth: "600px", fontSize: "16px", lineHeight: "1.6", color: "#555" }}>
                Esta página reúne fundamentos, materiais e acesso rápido a questionários para apoiar a análise psicossocial no ambiente de trabalho.
              </p>

              <div style={{ display: "flex", gap: "12px" }}>
                <Link href="/questionarios">
                  <button style={{ background: TEAL, color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "16px" }}>Começar pelos questionários</button>
                </Link>
                <Link href="/fundamentos">
                  <button style={{ background: "#fff", color: TEAL, border: `2px solid ${TEAL}`, padding: "10px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "16px" }}>Ver material teórico</button>
                </Link>
              </div>
            </div>
          </section>

          {/* Destaques (Substituindo Cards) */}
          <section style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 8px" }}>O que você encontra aqui</h2>
            <p style={{ color: "#666", fontSize: "14px", margin: "0 0 24px" }}>Uma estrutura enxuta para orientar a leitura.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
              {[
                { title: "Fundamentos", desc: "Conceitos, definições e fatores comuns (demanda excessiva, baixo controle, etc)." },
                { title: "Materiais", desc: "Materiais de apoio organizados para consulta rápida, incluindo boas práticas." },
                { title: "Questionários", desc: "Acesso centralizado aos instrumentos de coleta (ponto de partida para análises)." }
              ].map((item, idx) => (
                <div key={idx} style={{ border: `1px solid ${BORDER}`, borderRadius: "12px", padding: "20px", backgroundColor: SURFACE }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "16px", color: TEAL }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Questionários Rápido */}
          <section id="questionarios" style={{ marginTop: "56px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 20px" }}>Questionários</h2>
            <div style={{ borderRadius: "24px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", padding: "32px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "16px" }}>Acesso rápido</p>
                  <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#666" }}>Inicie a coleta de dados agora mesmo.</p>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <Link href="/Copsoq">
                    <button style={{ background: "#fff", color: TEAL, border: `2px solid ${BORDER}`, padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
                      Abrir COPSOQ II
                    </button>
                  </Link>
                  <Link href="/NasaTLX">
                    <button style={{ background: TEAL, color: "#fff", border: "none", padding: "12px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
                      Abrir NASA TLX
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer id="contato" style={{ marginTop: "64px" }}>
            <div style={{ borderRadius: "24px", border: `1px solid ${BORDER}`, backgroundColor: SURFACE, padding: "32px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "24px" }}>
                <div>
                  <p style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: "800" }}>Contato</p>
                  <p style={{ margin: 0, fontSize: "14px", color: "#666", maxWidth: "400px" }}>
                    Se quiser sugerir melhorias ou relatar dificuldades, entre em contato com a equipe de desenvolvimento.
                  </p>
                </div>
                <img src={Ergolaborimage} alt="Ergolabor" />
                <div style={{ fontSize: "14px", lineHeight: "1.8" }}>
                  <p style={{ margin: 0, fontWeight: "600" }}>Carlos Felipe Imperiano dos Santos</p>
                  <a href="mailto:carlos.santos@estudante.ufcg.edu.br" style={{ color: TEAL, textDecoration: "none", fontWeight: "500" }}>
                    carlos.santos@estudante.ufcg.edu.br
                  </a>
                </div>
              </div>
              <hr style={{ borderTop: `1px solid ${BORDER}`, borderBottom: "none", margin: "24px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#888" }}>
                <p style={{ margin: 0 }}>© {year} — Ferramenta de Análise Psicossocial</p>
                <p style={{ margin: 0 }}>UFCG - PIBIT</p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}