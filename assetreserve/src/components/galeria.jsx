'use client'

import { useState, useEffect } from 'react';
import fetchAtivos from "../services/ativos";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

function Galeria({ aoClicar }) {
    const [ativos, setAtivos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroCapacidade, setFiltroCapacidade] = useState('');

    useEffect(() => {
        async function carregarDados() {
            try {
                const dados = await fetchAtivos();
                setAtivos(dados || []);
            } catch (error) {
                console.error("Erro ao buscar ativos:", error);
            } finally {
                setCarregando(false);
            }
        }
        carregarDados();
    }, []);

    const filtrarAtivos = () => {
        return ativos.filter(ativo => {
            const categoriaCondicao = filtroCategoria ? ativo.categoria === filtroCategoria : true;
            const capacidadeCondicao = filtroCapacidade ? ativo.capacidade === filtroCapacidade : true;
            return categoriaCondicao && capacidadeCondicao;
        });
    };

    const ativosFiltrados = filtrarAtivos();

    if (carregando) return <p className="text-center p-8">Carregando galeria...</p>;

    return (
        <div className="grid gap-8">
            <div className="flex flex-wrap justify-center gap-6 bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
                <div className="flex items-center space-x-3">
                    <label className="text-gray-700 font-medium">Categoria:</label>
                    <select
                        className="p-2 pl-4 pr-8 border-2 border-[#e0e0e0] rounded-lg bg-white font-medium transition-all duration-200 hover:border-blue-400 focus:outline-none focus:border-[#0B2545]"
                        id="filtroCategoria"
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                    >
                        <option value="">Todas</option>
                        <option value="Sala">Sala</option>
                        <option value="Equipamento">Equipamento</option>
                    </select>
                </div>

                <div className="flex items-center space-x-3">
                    <label className="text-gray-700 font-medium">Capacidade:</label>
                    <select
                        className="p-2 pl-4 pr-8 border-2 border-[#e0e0e0] rounded-lg bg-white font-medium transition-all duration-200 hover:border-blue-400 focus:outline-none focus:border-[#0B2545]"
                        id="filtroCapacidade"
                        value={filtroCapacidade}
                        onChange={(e) => setFiltroCapacidade(e.target.value)}
                    >
                        <option value="">Todas</option>
                        <option value="baixa">Baixa</option>
                        <option value="média">Média</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {ativosFiltrados.length > 0 ? (
                    ativosFiltrados.map(ativo => (
                        <div
                            key={ativo.id}
                            onClick={() => aoClicar && aoClicar(ativo)}
                            className="border border-[#eee] p-4 bg-white rounded-xl shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                        >
                            <img
                                className="w-full h-[200px] object-cover rounded-lg mb-3"
                                src={`${SUPABASE_URL}/storage/v1/object/public/ativos-images/${ativo.imagem}`}
                                alt={ativo.titulo}
                            />
                            <h3 className="font-bold text-[#0B2545] text-lg">{ativo.titulo}</h3>
                            <p className="text-sm text-gray-500">
                                {ativo.categoria} • {ativo.capacidade}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        Nenhum ativo encontrado com esses filtros.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Galeria;
