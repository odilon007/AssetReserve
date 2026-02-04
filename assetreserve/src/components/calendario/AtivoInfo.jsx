import Link from "next/link";

export default function AtivoInfo({ ativo }) {
    return (
        <section className="bg-white p-6 rounded shadow w-full md:w-1/3">
        <img
            src={ativo.imagemUrl}
            className="rounded mb-4 w-full h-48 object-cover"
            alt="Ativo"
        />
        <h2 className="text-xl font-bold">{ativo.titulo}</h2>
        <p><b>Categoria:</b> {ativo.categoria}</p>
        <p><b>Capacidade:</b> {ativo.capacidade}</p>

        <Link href="/site/ativos" className="block mt-4 font-bold">
            ← Voltar
        </Link>
        </section>
    );
}
