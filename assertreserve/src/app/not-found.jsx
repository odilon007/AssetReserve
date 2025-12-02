import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="">Página 404 não encontrada!</h1>
            <p>Essa página que tentou acessar não existe</p>
            <Link className="!text-[#0B2545]" href="/">
                Voltar para home
            </Link>
        </div>
    )
}