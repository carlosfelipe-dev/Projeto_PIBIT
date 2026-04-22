import { useState } from "react"; 

const TEAL = "#00b5b5";
const TEALDARK = "#007a7a";
const BG = "#ffffff";
const BORDER = "#d0ecec";
const SURFACE = "#f4fbfb";

const cn = (...args) => args.filter(Boolean).join(" ");

function PaginaInfo({onVoltar}) {
  const [ativ,setAtivo] = useState("descrição");
  return (
    <div>
      <button onClick = {onVoltar}> ← Voltar</button>
      <h2>Informações sobre o COPSOQ II</h2>
      <div>
          <div>Guia de Referências</div>
      </div>
      <div style={{ marginTop: "32px", padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "14px" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: TEAL, letterSpacing: "0.12em", marginBottom: "10px" }}>SOBRE O INSTRUMENTO</div>
          <p style={{ margin: 0, fontSize: "12px", color: "#666", lineHeight: 1.8 }}>
            O copsoq ii é um instrumento de avaliação subjetiva de riscos psicossociais no ambiente de trabalho, desenvolvido para identificar e analisar fatores que podem afetar a saúde mental e o bem-estar dos trabalhadores. Ele abrange diversas dimensões, como demandas de trabalho, controle sobre as tarefas, suporte social, recompensas, entre outros aspectos relacionados ao ambiente laboral. O objetivo do COPSOQ II é fornecer uma ferramenta abrangente para avaliar os riscos psicossociais e promover a saúde ocupacional.
          </p>
        </div>
    </div>
  );

}

export default function Copsoq() {

  const [pagina, setPagina] = useState("form");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  // O Estado é dividido entre dados demográficos e as respostas das questões
  const [form, setForm] = useState({
    demograficos: { idade: "", sexo: "", tempoEmpresa: "", escolaridade: "" },
    respostas: {} // Guardará { q1: 4, q2: 3, ... }
  });

  if (pagina === "info") return <PaginaInfo onVoltar={() => setPagina("form")} />;

  const QUESTOES_COPSOQ = [
    {
    id: "q1",
    texto: "A sua carga de trabalho acumula-se por ser mal distribuída.",
    opcoes: [1,2,3,4,5].map(n=>['nunca','raremente','às vezes','frequentemente','sempre'][n-1])
    },
    {
    id: "q2",
    texto: "Tenho controle sobre a forma como realizo minhas tarefas.",
    opcoes: [1,2,3,4,5].map(n=>['nunca','raremente','às vezes','frequentemente','sempre'][n-1]),
    },
  ]

  const LikertRow = ({ questao, Valoratual, onChange}) => {
    return (
        <div>
            {questao.texto}
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                {questao.opcoes.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => onChange(questao.id, idx + 1)}
                        style={{
                            background: Valoratual === idx + 1 ? TEAL : SURFACE,
                            border: `1px solid ${BORDER}`,
                            color: Valoratual === idx + 1 ? "#fff" : TEAL,
                            cursor: "pointer",
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "12px",
                            padding: "8px 16px",
                        }}
                    >
                        {opt}
                        
                    </button> 
                ))}
                
            </div>

        </div>
        
    );
    
  };
  const handleDemografico = (campo, valor) => {
    setForm(prev => ({
      ...prev,
      demograficos: { ...prev.demograficos, [campo]: valor }
    }));
  };

  const handleResposta = (questaoId, valor) => {
    setForm(prev => ({
      ...prev,
      respostas: { ...prev.respostas, [questaoId]: valor }
    }));
  };

  const enviar = async () => {
    // Validação simples: verificar se respondeu a primeira pergunta de teste
    if (!form.respostas.q1) {
      setErro("Por favor, responda pelo menos as primeiras questões antes de enviar.");
      return;
    }

    setErro(""); 
    setLoading(true);

    try {
      // Simulação de envio para a mesma API (ajuste a rota conforme o backend de vocês)
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setResultado(true);
    } catch {
      setErro("Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://127.0.0.1:5000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", justifyContent: "center", padding: "40px 16px 80px", fontFamily: "'Outfit', sans-serif", color: "#111" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{ width: "100%", maxWidth: "760px" }}>
        
        {/* Header Superior */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
          <button onClick={() => setPagina("info")} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "999px", padding: "8px 16px", color: TEAL, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "10px" }}>
            SOBRE O INSTRUMENTO
          </button>
        </div>

        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: TEAL, letterSpacing: "0.1em", marginBottom: "8px" }}>ANÁLISE DE RISCOS PSICOSSOCIAIS</div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            Questionário <span style={{ color: TEAL }}>COPSOQ II</span>
          </h1>
          <p style={{ color: "#666", fontSize: "15px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6 }}>
            Responda expressando sua real percepção sobre o seu dia a dia no trabalho. Seus dados são anônimos e confidenciais.
          </p>
        </div>

        {resultado ? (
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "20px", padding: "40px", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: `${TEAL}18`, border: `2px solid ${TEAL}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "24px", color: TEAL }}>✓</div>
            <h2 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700 }}>Respostas registradas com sucesso!</h2>
            <p style={{ color: "#666", marginBottom: "24px" }}>Agradecemos sua sinceridade. Isso ajudará a melhorar o ambiente de trabalho.</p>
            <button onClick={() => { setResultado(null); setForm({ demograficos: {}, respostas: {} }); }} style={{ background: TEAL, color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
              Fazer nova avaliação
            </button>
          </div>
        ) : (
          <>
            {/* Bloco Demográfico Básico */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", color: TEAL, fontFamily: "'Space Mono', monospace" }}>DADOS BÁSICOS (ANÔNIMOS)</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>Faixa Etária</label>
                  <select 
                    onChange={(e) => handleDemografico("idade", e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: `1px solid ${BORDER}`, outline: "none", fontFamily: "'Outfit', sans-serif" }}
                  >
                    <option value="">Selecione...</option>
                    <option value="Menor de 18">Menor de 18 anos</option>
                    <option value="18 a 27">Até 27 anos</option>
                    <option value="28 a 43">De 28 a 43 anos</option>
                    <option value="44 a 59">De 44 a 59 anos</option>
                    <option value="60+">+ 60 anos</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>Sexo</label>
                  <select 
                    onChange={(e) => handleDemografico("sexo", e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: `1px solid ${BORDER}`, outline: "none", fontFamily: "'Outfit', sans-serif" }}
                  >
                    <option value="">Selecione...</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Outro">Outro / Prefiro não dizer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loop das Questões */}
            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", color: TEAL, fontFamily: "'Space Mono', monospace" }}>PERCEPÇÃO INDIVIDUAL</h3>
              {QUESTOES_COPSOQ.map((q) => (
                <LikertRow 
                  key={q.id} 
                  questao={q} 
                  valorAtual={form.respostas[q.id]} 
                  onChange={handleResposta} />
              ))}
            </div>

            {/* Tratamento de Erro e Envio */}
            {erro && (
              <div style={{ background: "#fcebeb", border: "1px solid #f09595", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", color: "#a32d2d", fontSize: "13px" }}>
                {erro}
              </div>
            )}

            <button
              onClick={enviar}
              disabled={loading}
              style={{ width: "100%", padding: "18px", background: loading ? `${TEAL}60` : TEAL, border: "none", borderRadius: "12px", color: "#fff", fontWeight: 700, fontSize: "16px", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Registrando respostas..." : "Concluir Avaliação COPSOQ II →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

