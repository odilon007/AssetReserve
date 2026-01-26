export function ReservaConfirmada({ ativo, data, horario }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2>✅ Reserva confirmada</h2>

      <p>Sua reserva foi confirmada com sucesso.</p>

      <ul>
        <li><strong>Local:</strong> {ativo}</li>
        <li><strong>Data:</strong> {data}</li>
        <li><strong>Horário:</strong> {horario}</li>
      </ul>

      <p>
        Se precisar cancelar ou alterar, entre em contato.
      </p>

      <p>Obrigado!</p>
    </div>
  )
}
