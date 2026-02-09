import fetchReservas from "@/services/reservas"
import TabelaReservas from "@/components/reservas/reservas" // Verifique se o caminho está correto
import { supabase } from "@/lib/supabaseClient" // Assumindo que você precisa pegar o user

export default async function Page() {
  const reservas = await fetchReservas()
  
  // Pegando usuário para passar pro componente (opcional, depende da sua lógica)
  const { data: { user } } = await supabase.auth.getUser()

  // Defina as colunas aqui para controlar a ordem
  const colunas = ['ativo', 'data_inicio', 'data_fim', 'status']

  return (
    // Container ajustado: padding menor no mobile (p-4) e maior no desktop (md:p-8)
    <div className="container mx-auto px-4 py-6 md:py-8 pb-20">
      <h1 className="text-2xl md:text-3xl text-[#0B2545] font-bold mb-6">
        Minhas Reservas
      </h1>

      <TabelaReservas 
        reservas={reservas || []} 
        colunas={colunas}
        userId={user?.id}
      />
    </div>
  )
}