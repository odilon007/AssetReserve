'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import fetchReservas from '@/services/reservas'
import ReservasTable from './reservasTabela' // O componente visual da tabela
import AtualizarButton from './botaoAtualizar'

// Aceita dadosIniciais para evitar loading na primeira renderização se vier do servidor
export default function TabelaReservas({ reservas: dadosIniciais }) {
  const [reservas, setReservas] = useState(dadosIniciais || [])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)
  const [userId, setUserId] = useState(null)

  // Função para recarregar dados manualmente (botão atualizar)
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

  async function carregarUsuario() {
    const { data: { user } } = await supabase.auth.getUser()
    setUserId(user?.id)
  }

  // Deletar com atualização otimista (remove da UI imediatamente)
  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja cancelar esta reserva?')) return

    // Remove visualmente antes de confirmar no banco (UX mais rápida)
    const backup = [...reservas]
    setReservas(prev => prev.filter(r => r.id !== id))

    const { error } = await supabase
      .from('reservas')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Erro ao cancelar reserva')
      setReservas(backup) // Restaura se der erro
    }
  }

  useEffect(() => {
    carregarUsuario()
    // Se não tiver dados iniciais, carrega agora
    if (!dadosIniciais) {
      carregar()
    }
  }, [])

  const colunasIgnoradas = ['id', 'created_at', 'usuario_id']

  // Garante que pega as chaves do primeiro item que existir
  const colunas = reservas.length > 0 && reservas[0]
    ? Object.keys(reservas[0]).filter((c) => !colunasIgnoradas.includes(c))
    : ['ativo', 'data_inicio', 'data_fim', 'status'] // Fallback padrão

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">

      {/* Cabeçalho da Tabela com Botão */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-gray-100 bg-white gap-4">
        <span className="text-sm text-gray-500 font-medium">
          {reservas.length} {reservas.length === 1 ? 'registro encontrado' : 'registros encontrados'}
        </span>
        <div className="w-full sm:w-auto">
          <AtualizarButton onClick={carregar} loading={loading} />
        </div>
      </div>

      {erro && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-100 text-sm text-red-600 animate-pulse">
          Ocorreu um erro: {erro}
        </div>
      )}

      {/* Componente Visual da Tabela */}
      <ReservasTable
        reservas={reservas}
        colunas={colunas}
        userId={userId}
        onDelete={handleDelete}
      />
    </div>
  )
}