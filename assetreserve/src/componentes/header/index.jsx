import Link from "next/link"

export function Header() {
    return (
    <header className="sticky top-0 z-[1000]">
        <nav className="
    flex items-center justify-around 
    min-h-[10vh] flex-wrap
    py-[10px] px-[40px]
    shadow-md
    bg-[#0B2545]
  ">
        <Link className="text-[24px] font-bold" href="./">AssetReserve</Link>
            <ul className="flex gap-[20px] list-none flex-wrap">
                <li><Link href="/">Início</Link></li>
                <li><Link href="/reservas">Reserva</Link></li>
                <li><Link href="/calendario">Calendário</Link></li>
                <li><Link href="/">Fale conosco</Link></li>
                <li><Link href="/cadastro" className="btn btn-outline">Cadastrar</Link></li>
                <li><Link href="/login" className="btn btn-solid">Login</Link></li>
            </ul>
        </nav>
    </header>
    )
}