"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      
      {/* --- Navegação Superior --- */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Ícone Simples de Logo */}
            <div className="w-8 h-8 bg-[#0B2545] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-[#0B2545] tracking-tight">
              AssetReserve
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/auth?mode=login" 
              className="text-[#0B2545] font-medium hover:text-blue-700 transition"
            >
              Login
            </Link>
            <Link 
              href="/auth?mode=cadastro" 
              className="bg-[#0B2545] text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-900 transition shadow-md"
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Seção Hero (Principal) --- */}
      <header className="flex-1 flex flex-col justify-center items-center text-center px-4 py-16 md:py-24 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-3xl space-y-6">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-[#0B2545] text-xs font-bold uppercase tracking-wider mb-2">
            Gestão de Espaços e Equipamentos
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0B2545] leading-tight">
            Reserve ativos com <br className="hidden md:block" />
            <span className="text-blue-600">praticidade e rapidez.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            O <strong>AssetReserve</strong> é a solução ideal para gerenciar salas de reunião, projetores e equipamentos. Visualize a disponibilidade, filtre por capacidade e agende o que você precisa em segundos.
          </p>

          {/* Botões de Ação Principal */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              href="/auth?mode=cadastro" 
              className="px-8 py-4 bg-[#0B2545] text-white text-lg font-bold rounded-xl hover:bg-blue-900 transition shadow-lg transform hover:-translate-y-1"
            >
              Criar Conta Grátis
            </Link>
            <Link 
              href="/auth?mode=login" 
              className="px-8 py-4 bg-white text-[#0B2545] border-2 border-[#0B2545] text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-sm"
            >
              Acessar Sistema
            </Link>
          </div>
        </div>
      </header>

      {/* --- Seção de Funcionalidades (O que é) --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B2545]">Por que usar o AssetReserve?</h2>
            <p className="text-gray-500 mt-2">Tudo o que você precisa para organizar seus recursos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                🖼️
              </div>
              <h3 className="text-xl font-bold text-[#0B2545] mb-2">Galeria Visual</h3>
              <p className="text-gray-600">
                Visualize todas as salas e equipamentos disponíveis com fotos reais e status atualizado antes de reservar.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                🔍
              </div>
              <h3 className="text-xl font-bold text-[#0B2545] mb-2">Filtros Inteligentes</h3>
              <p className="text-gray-600">
                Encontre exatamente o que precisa filtrando por categoria (sala ou equipamento) e capacidade de pessoas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                📅
              </div>
              <h3 className="text-xl font-bold text-[#0B2545] mb-2">Agendamento Fácil</h3>
              <p className="text-gray-600">
                Utilize nosso calendário interativo para simular datas, checar horários e garantir sua reserva sem conflitos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer / Créditos --- */}
      <footer className="bg-[#0B2545] text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-sm font-medium">
            Desenvolvido para as disciplinas de PW2 e Engenharia de Requisitos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="https://github.com/odilon007" target="_blank" className="hover:text-white transition">@odilon007</a>
            <span>•</span>
            <a href="https://github.com/MatheusMachado16" target="_blank" className="hover:text-white transition">@MatheusMachado16</a>
            <span>•</span>
            <a href="https://github.com/omarhenriqu3" target="_blank" className="hover:text-white transition">@omarhenriqu3</a>
            <span>•</span>
            <a href="https://github.com/DaviPatricio06" target="_blank" className="hover:text-white transition">@DaviPatricio06</a>
          </div>
          <p className="mt-8 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AssetReserve. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}