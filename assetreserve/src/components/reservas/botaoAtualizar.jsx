import { RefreshCw } from 'lucide-react'

export default function AtualizarButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-smhover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      <RefreshCw
        size={16}
        className={loading ? 'animate-spin text-blue-600' : 'text-gray-500'}
      />
      {loading ? 'Atualizando...' : 'Atualizar'}
    </button>
  )
}
