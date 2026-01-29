'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // pega usuário atual
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // escuta mudanças de auth (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!user) return null;

  const nome = user.user_metadata?.nome || user.email;

  return (
    <header className="sticky top-0 z-[1000]">
      <nav className="flex items-center justify-between min-h-[10vh] px-10 py-3 bg-[#0B2545] shadow-md">

        {/* navbar */}
        <Link
          href="/site/ativos"
          className="text-white text-2xl font-bold hover:opacity-70"
        >
          AssetReserve
        </Link>

        <ul className="flex gap-6 items-center list-none">

          <li>
            <Link href="/site/ativos" className="text-white hover:opacity-70">
              Início
            </Link>
          </li>

          <li>
            <Link href="/site/reservas" className="text-white hover:opacity-70">
              Reserva
            </Link>
          </li>

          {/*<li>
            <Link href="/site/calendario" className="text-white hover:opacity-70">
              Calendário
            </Link>
          </li> */}
          <li>
            <Link href="/site/cadastro-ativo" className="text-white hover:opacity-70">
              Cadastro de Ativos
            </Link>
          </li>

          <li>
            <Link href="/site/contato" className="text-white hover:opacity-70">
              Fale conosco
            </Link>
          </li>

          {/* Usuário */}
          <li className="flex items-center gap-3 text-white">

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-white text-[#0B2545] flex items-center justify-center font-bold">
              {nome.charAt(0).toUpperCase()}
            </div>

            <span className="font-medium">
              {nome}
            </span>

            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/auth'
              }}
              className="ml-4 text-sm opacity-80 hover:opacity-100"
            >
              Sair
            </button>

          </li>

        </ul>
      </nav>
    </header>
  );
}
