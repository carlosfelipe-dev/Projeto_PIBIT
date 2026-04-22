import { useEffect, useState } from "react";

const TEAL = "#00b5b5";
const SURFACE = "#f4fbfb";
const BORDER = "#d0ecec";



const INSTRUMENTOS = [
  {
    id: "nasa-tlx",
    label: 'Nasa-TLX',
    descricao: "O NASA-TLX é um instrumento de avaliação subjetiva da carga de trabalho...",
    palavras_chave: "nasa-tlx", "carga": "workLoad"
  },
  {
    id: "copsoq-ii",
    label: 'COPSOQ II',
    descricao: "O COPSOQ II é um instrumento de avaliação subjetiva de riscos psicossociais...",
    palavras_chave: "copsoq", "ocupaiconal":'risco', "psicossocial": "risco"
  }
];

function InstrumentoCard({ instrumento }) {
  return (
    <div style={{ border: `1px solid ${BORDER}`, padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
      <h3>{instrumento.label}</h3>
      <p>{instrumento.descricao}</p>
    </div>
  );
}

export default function Fundamentos() { //Essa função é o componente principal da página, onde a lógica de busca e exibição dos instrumentos é implementada
  const [busca, setBusca] = useState(""); //primeiro valor é um variável e o segundo é uma função para atualizar essa variável

  // Lógica de filtro: verifica se o termo buscado está no label ou nas palavras-chave
  const instrumentosFiltrados = INSTRUMENTOS.filter
  ( (instrumento) => instrumento.label.toLowerCase().includes(busca.toLowerCase()) || instrumento.palavras_chave.toLowerCase().includes(busca.toLowerCase())
  );

    return (
    <div class='main-h-screen bg[#f4fbfb] p-4'>
    <div class='relative overflow-hidden bg-gradient-to-b from-[#EDF1FF] to-[#F8FAFC]'>
        <div style={{ padding: "20px", backgroundColor: "#f4fbfb" }}>
      <h1 className='relative overflow-hidden bg-gradient-to-b from-[#EDF1FF] to-[#F8FAFC]'></h1>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-center'>
            <h1>Biblioteca de instrumentos</h1>
            <p className="text-lg text-gray-600">Explore os diversos instrumentos disponíveis</p>
            <div class='px-4 py-6 sm:px-0'>
                <div class="my-8 flex justify-center">
                    <div class="relative w-full max-w-2xl">
                          <input placeholder="Ex: DASS-21, ansiedade, depressão, WHOQOL..."
                          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-teal-500 focus:ring-teal-500"
                          type="text" value={busca} onChange={(event) => setBusca(event.target.value)}> 
                          </input>
                                          
                    </div>
                </div>
            </div>
      </div>
    </div>
    <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12'>
        {instrumentosFiltrados.length > 0 ? (instrumentosFiltrados.map((instrumento) => (<InstrumentoCard key={instrumento.id} instrumento={instrumento} />))) : (  
          <p class="text-center text-gray-500">Nenhum instrumento encontrado.</p>)}
    </div>
    </div>
    
    </div>
    </div>
    );

}