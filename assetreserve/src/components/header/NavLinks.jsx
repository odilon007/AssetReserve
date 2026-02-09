'use client';
import Link from 'next/link';
import styles from './header.module.css';
export default function NavLinks() {
  return (
    <>
      <li><Link href="/site/ativos"  className={styles.link}>Início</Link></li>
      <li><Link href="/site/reservas"  className={styles.link}>Reserva</Link></li>
      <li><Link href="/site/cadastro-ativo"  className={`${styles.link} hidden`}>Cadastro</Link></li>
      <li><Link href="/site/contato"  className={styles.link}>Fale conosco</Link></li>
    </>
  );
}