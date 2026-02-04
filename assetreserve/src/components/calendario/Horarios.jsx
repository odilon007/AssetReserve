export default function Horarios({
    diaSelecionado,
    horariosOcupados,
    reservarHorario,
    hojeISO,
    horaAtual
    }) {
    if (!diaSelecionado) {
        return <p className="text-center">Escolha um dia</p>;
    }

    return (
        <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 11 }, (_, i) => i + 7).map((h) => {
            const hora = `${String(h).padStart(2, "0")}:00`;
            const reservado = horariosOcupados.includes(hora);
            const passouHoje = diaSelecionado === hojeISO && h <= horaAtual;

            const desabilitado = reservado || passouHoje;

            return (
            <button
                key={hora}
                disabled={desabilitado}
                onClick={() => reservarHorario(hora)}
                className={`py-2 rounded font-bold ${
                desabilitado
                    ? "bg-gray-100 text-gray-300 line-through"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
            >
                {hora}
            </button>
            );
        })}
        </div>
    );
}
