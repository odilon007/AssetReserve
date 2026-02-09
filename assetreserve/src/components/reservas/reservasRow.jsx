import { memo } from 'react'

function formatarValor(valor) {
  if (valor === null || valor === undefined)
    return <span className="text-gray-300">-</span>

  if (typeof valor === 'string' && valor.includes('T')) {
    const data = new Date(valor)
    if (!isNaN(data)) return data.toLocaleString('pt-BR')
  }

  return String(valor)
}

function ReservasRow({ reserva, colunas, userId, onDelete }) {
  const ehDono = reserva.usuario_id === userId

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {colunas.map((coluna) => (
        <td key={coluna} className="px-4 md:px-6 py-4 text-gray-700">
          {formatarValor(reserva[coluna])}
        </td>
      ))}

      <td className="px-4 md:px-6 py-4">
        {ehDono && (
          <button
            onClick={() => onDelete(reserva.id)}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Cancelar
          </button>
        )}
      </td>
    </tr>
  )
}

export default memo(ReservasRow)
