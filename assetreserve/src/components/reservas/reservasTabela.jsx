import ReservasRow from './reservasRow'

export default function ReservasTable({ reservas, colunas }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-medium">
          <tr>
            {colunas.map((coluna) => (
              <th
                key={coluna}
                className="px-6 py-3 border-b border-gray-200"
              >
                {coluna.replaceAll('_', ' ')}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {reservas.map((reserva) => (
            <ReservasRow
              key={reserva.id}
              reserva={reserva}
              colunas={colunas}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
