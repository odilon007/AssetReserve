import DiasDoMes from "./DiasDoMes";

export default function Calendario({
    dataAtual,
    setDataAtual,
    diaSelecionado,
    selecionarDia,
    hojeZero
    }) {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    function mudarMes(valor) {
        const novaData = new Date(dataAtual);
        novaData.setMonth(dataAtual.getMonth() + valor);
        setDataAtual(novaData);
    }

    return (
        <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between mb-4">
            <button onClick={() => mudarMes(-1)}>◀</button>
            <h2 className="font-bold">
            {meses[dataAtual.getMonth()]} {dataAtual.getFullYear()}
            </h2>
            <button onClick={() => mudarMes(1)}>▶</button>
        </div>

        <DiasDoMes
            dataAtual={dataAtual}
            diaSelecionado={diaSelecionado}
            selecionarDia={selecionarDia}
            hojeZero={hojeZero}
        />
        </div>
    );
}
