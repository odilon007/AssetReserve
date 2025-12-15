'use client'

import { useState } from 'react';
import fetchAtivos from "../fetch"

const ativos = await fetchAtivos()



function Galeria() {
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroCapacidade, setFiltrocapacidade] = useState('');

    const filtrarAtivos = () => {
        return ativos.filter(ativo => {
            const categoriaCondicao = filtroCategoria ? ativo.categoria === filtroCategoria : true;
            const capacidadeCondicao = filtroCapacidade ? ativo.capacidade === filtroCapacidade : true;
            return categoriaCondicao && capacidadeCondicao;
        })
    }

    const ativosFiltrados = filtrarAtivos();

    return (
        <div className="grid gap-2">
        {/* FILTROS */}
            <div className="flex justify-center gap-6 bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
                <div className="items-start space-y-2 space-x-3">
                <label className="text-gray-700 font-medium">Categoria:</label>
                    <select  className="p-2 pl-4 pr-4 border-2 border-[#e0e0e0] rounded-lg bg-white font-medium transition-all duration-200 hover:border-[var(--color-accent)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[rgba(11,37,69,0.1)]" id="filtroCategoria" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                        <option value="">Todas</option>
                        <option value="Sala">Sala</option>
                        <option value="Equipamento">Equipamento</option>
                    </select>
                </div>

                <div className="items-start space-y-2 space-x-3">
                <label className="text-gray-700 font-medium">capacidade:</label>
                    <select className="p-2 pl-4 pr-4 border-2 border-[#e0e0e0] rounded-lg bg-white font-medium transition-all duration-200 hover:border-[var(--color-accent)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[rgba(11,37,69,0.1)]" id="filtrocapacidade" value={filtroCapacidade} onChange={(e) => setFiltrocapacidade(e.target.value)}>
                        <option value="">Todas</option>
                        <option value="baixa">Baixa</option>
                        <option value="média">Média</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>

        
        
            </div>
        {/* GALERIA DE ATIVOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ativosFiltrados.map(ativo => (
                    <div key={ativo.id} className=" w-[300px] border border-[#eee] p-4 bg-white rounded-xl shadow-md transition-transform duration-300 ease-in-out transform hover:translate-y-[-8px] hover:shadow-lg" data-categoria={ativo.catetgoria}>
                        <img className="w-full h-[200px] object-cover rounded-lg" src={ativo.imagem} alt={ativo.titulo}/>
                        <h3>{ativo.titulo}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Galeria;