import ReservasRow from './reservasRow'

export default function ReservasTable({ reservas, colunas, userId, onDelete }) {
  return (
    <>
      {/* ===== DESKTOP (tabela) ===== */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-medium">
            <tr>
              {colunas.map((coluna) => (
                <th key={coluna} className="px-6 py-3 border-b border-gray-200">
                  {coluna.replaceAll('_', ' ')}
                </th>
              ))}
              <th className="px-6 py-3 border-b border-gray-200">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {reservas.map((reserva) => (
              <ReservasRow
                key={reserva.id}
                reserva={reserva}
                colunas={colunas}
                userId={userId}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE (cards) ===== */}
      <div className="md:hidden space-y-4 p-4">
        {reservas.map((reserva) => (
          <div
            key={reserva.id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
          >
            {colunas.map((coluna) => (
              <div key={coluna} className="flex justify-between py-1 text-sm">
                <span className="font-semibold text-gray-500">
                  {coluna.replaceAll('_', ' ')}
                </span>
                <span className="text-gray-700 text-right max-w-[60%]">
                  {String(reserva[coluna])}
                </span>
              </div>
            ))}

            {reserva.usuario_id === userId && (
              <button
                onClick={() => onDelete(reserva.id)}
                className="mt-3 w-full text-red-600 border border-red-200 rounded-md py-2 font-semibold"
              >
                Cancelar reserva
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  )
}