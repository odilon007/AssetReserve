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

function ReservasRow({ reserva, colunas }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {colunas.map((coluna) => (
        <td key={coluna} className="px-6 py-4 text-gray-700">
          {formatarValor(reserva[coluna])}
        </td>
      ))}
    </tr>
  )
}

export default memo(ReservasRow)
