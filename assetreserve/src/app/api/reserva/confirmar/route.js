import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { enviarEmailReserva } from '@/lib/email'

export async function POST(req) {
  const { reservaId, email } = await req.json()

  const supabase = createServerClient({ cookies })

  const { data: reserva, error } = await supabase
    .from('reservas')
    .select('*')
    .eq('id', reservaId)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await enviarEmailReserva({
    to: email,
    ativo: reserva.ativo,
    data: reserva.data,
    horario: reserva.horario,
  })

  return NextResponse.json({ success: true })
}
