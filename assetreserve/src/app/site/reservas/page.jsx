import fetchReservas from "@/services/reservas"
import TabelaReservas from "@/components/reservas/reservas"

export default async function Page() {
  const reservas = await fetchReservas()

  return (
    <div className="p-6  pb-20">
      <h1 className="text-2xl font-bold mb-4">Reservas</h1>

      <TabelaReservas reservas={reservas} />
    </div>
  )
}
