import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-[1000]">
      <nav
        className="flex items-center justify-around flex-wrap min-h-[10vh] px-10 py-3 bg-[#0B2545] shadow-md">
        <Link href="/" className="text-white text-2xl font-bold transition duration-300 hover:opacity-70">AssetReserve</Link>
        <ul className="flex flex-wrap gap-5 list-none">
          <li><Link href="/"className="text-white transition duration-300 hover:opacity-70">Início</Link></li>
          <li><Link href="/reservas"className="text-white transition duration-300 hover:opacity-70">Reserva</Link></li>
          <li><Link href="/calendario"className="text-white transition duration-300 hover:opacity-70">Calendário</Link></li>
          <li><Link href="/" className="text-white transition duration-300 hover:opacity-70">Fale conosco</Link></li>
          <li><Link href="/cadastro" className="btn btn-outline">Cadastrar</Link></li>
          <li><Link href="/login" className="btn btn-solid">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}
