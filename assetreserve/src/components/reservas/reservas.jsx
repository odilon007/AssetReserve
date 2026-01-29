'use client'

import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import fetchReservas from '@/services/reservas'

export default function TabelaReservas() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  async function carregar() {
    try {
      setLoading(true)
      setErro(null)
      const data = await fetchReservas()
      setReservas(data)
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

    useEffect(() => {
    carregar()
  }, [])

  const colunasIgnoradas = ['id', 'created_at']

  const colunas = reservas[0]
    ? Object.keys(reservas[0]).filter(
        (coluna) => !colunasIgnoradas.includes(coluna)
      )
    : []

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden relative">
      
      {/* Header com Botão */}
      <div className="flex items-center justify-end px-6 py-4 border-b border-gray-200 bg-white">
        <button
          onClick={carregar}
          disabled={loading}
          className="
            flex items-center gap-2 px-4 py-2 
            text-sm font-medium text-gray-700 bg-white 
            border border-gray-300 rounded-md shadow-sm
            hover:bg-gray-50 hover:text-gray-900 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
          "
        >
          <RefreshCw
            size={16}
            className={loading ? 'animate-spin text-blue-600' : 'text-gray-500'}
          />
          {loading ? 'Atualizando...' : 'Atualizar'}
        </button>
      </div>

      {/* Mensagem de Erro */}
      {erro && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-100 text-sm text-red-600">
          Ocorreu um erro: {erro}
        </div>
      )}

      {/* Tabela com Scroll */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-medium">
            <tr>
              {colunas.map((coluna) => (
                <th
                  key={coluna}
                  className="px-6 py-3 border-b border-gray-200 first:pl-6 last:pr-6"
                >
                  {coluna.replaceAll('_', ' ')}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {reservas.map((reserva, index) => (
              <tr
                key={reserva.id || index}
                className="hover:bg-gray-50 transition-colors"
              >
                {colunas.map((coluna) => (
                  <td key={coluna} className="px-6 py-4 text-gray-700">
                    {formatarValor(reserva[coluna])}
                  </td>
                ))}
              </tr>
            ))}

            {/* Estado Vazio (Sem dados) */}
            {reservas.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={colunas.length || 1}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <p>Nenhum dado para exibir.</p>
                  <p className="text-xs mt-1 text-gray-400">Clique em "Atualizar" para carregar.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Overlay de Loading (Mantido simples) */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 transition-opacity duration-200">
          <div className="flex flex-col items-center">
             <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  )
}

function formatarValor(valor) {
  if (valor === null || valor === undefined) return <span className="text-gray-300">-</span>

  if (typeof valor === 'string' && valor.includes('T')) {
    const data = new Date(valor)
    if (!isNaN(data)) return data.toLocaleString('pt-BR')
  }

  return String(valor)
}