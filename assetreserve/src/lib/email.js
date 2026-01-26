import { Resend } from 'resend'
import { ReservaConfirmada } from '@/emails/ReservaConfirmada'
import ReactDOMServer from 'react-dom/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function enviarEmailReserva({ to, ativo, data, horario }) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <ReservaConfirmada
      ativo={ativo}
      data={data}
      horario={horario}
    />
  )

  await resend.emails.send({
    from: 'Reservas <no-reply@AssetReserve.com>',
    to,
    subject: 'Reserva confirmada',
    html,
  })
}
