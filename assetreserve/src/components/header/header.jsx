'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import NavLinks from './NavLinks';

export function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

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
    <header className="sticky top-0 z-50 bg-[#0B2545] shadow-md w-full">
      {/* ALTERAÇÃO AQUI: 
         Adicionei 'gap-4 md:gap-8' para forçar o espaçamento entre a Logo e o Menu 
      */}
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4 gap-4 md:gap-8">
        
        {/* Logo */}
        <Link 
          href="/site/ativos" 
          className="text-xl md:text-2xl font-bold text-white hover:opacity-80 transition-opacity shrink-0"
        >
          AssetReserve
        </Link>

        {/* Menu Container */}
        <ul className="flex items-center gap-4 md:gap-6 list-none m-0 p-0">
          
          <NavLinks />

          {/* Seção do Usuário */}
          <li className="flex items-center gap-3 border-l border-blue-800 pl-4 md:pl-6">
            
            <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white text-[#0B2545] font-bold text-sm md:text-base">
              {nome.charAt(0).toUpperCase()}
            </div>

            <span className="hidden md:block text-white font-medium truncate max-w-[150px]">
              {nome}
            </span>

            <button
              className="text-sm text-gray-300 hover:text-white hover:underline transition-colors ml-1"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/auth';
              }}
            >
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}