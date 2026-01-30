'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './header.module.css';

export function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // usuário atual
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // escuta login/logout
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
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/site/ativos" className={styles.logo}>
          AssetReserve
        </Link>

        <ul className={styles.menu}>
          <li>
            <Link href="/site/ativos" className={styles.link}>
              Início
            </Link>
          </li>

          <li>
            <Link href="/site/reservas" className={styles.link}>
              Reserva
            </Link>
          </li>

          <li>
            <Link href="/site/cadastro-ativo" className={styles.link}>
              Cadastro/Ativos
            </Link>
          </li>
          <li>
            <Link href="/site/contato" className={styles.link}>
              Fale conosco
            </Link>
          </li>

          {/* Usuário */}
          <li className={styles.user}>
            <div className={styles.avatar}>
              {nome.charAt(0).toUpperCase()}
            </div>

            <span className={styles.username}>{nome}</span>

            <button
              className={styles.logout}
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
