export default function DiasDoMes({
    dataAtual,
    diaSelecionado,
    selecionarDia,
    hojeZero
    }) {
    function diasDoMes() {
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();
        const primeiroDia = new Date(ano, mes, 1).getDay();
        const totalDias = new Date(ano, mes + 1, 0).getDate();

        const dias = [];
        for (let i = 0; i < primeiroDia; i++) dias.push(null);
        for (let d = 1; d <= totalDias; d++) dias.push(d);

        return dias;
    }

    return (
        <div className="grid grid-cols-7 gap-2 text-center">
        {diasDoMes().map((dia, i) => {
            if (!dia) return <div key={i} />;

            const dataDia = new Date(
            dataAtual.getFullYear(),
            dataAtual.getMonth(),
            dia
            );

            const passado = dataDia < hojeZero;

            const iso = `${dataAtual.getFullYear()}-${String(
            dataAtual.getMonth() + 1
            ).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

            return (
            <div
                key={i}
                onClick={() => !passado && selecionarDia(dia)}
                className={`p-2 rounded cursor-pointer ${
                passado ? "opacity-30" : "hover:bg-blue-100"
                } ${iso === diaSelecionado ? "bg-blue-500 text-white" : ""}`}
            >
                {dia}
            </div>
            );
        })}
        </div>
    );
}
