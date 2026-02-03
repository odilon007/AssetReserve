'use client'

import { useState, useEffect } from 'react'
import fetchReservas from '@/services/reservas'
import ReservasTable from './reservasTabela'
import AtualizarButton from './botaoAtualizar'

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
      setErro(err?.message || 'Erro inesperado')
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
        (c) => !colunasIgnoradas.includes(c)
      )
    : []

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden relative">

      <div className="flex items-center justify-end px-6 py-4 border-b border-gray-200 bg-white">
        <AtualizarButton onClick={carregar} loading={loading} />
      </div>

      {erro && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-100 text-sm text-red-600">
          Ocorreu um erro: {erro}
        </div>
      )}

      <ReservasTable reservas={reservas} colunas={colunas} />
    </div>
  )
}
