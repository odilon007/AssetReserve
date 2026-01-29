"use client";

import { useEffect, useState } from "react";
import styles from "./footer.module.css";

export function Footer({ modalAberto }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    function atualizarVisibilidade() {
      const alturaTela = window.innerHeight;
      const alturaPagina = document.documentElement.scrollHeight;
      const scrollAtual = window.scrollY;

      const temScroll = alturaPagina > alturaTela;
      const chegouNoFim =
        alturaTela + scrollAtual >= alturaPagina - 2;

      if (!temScroll || chegouNoFim) {
        setVisivel(true);
      } else {
        setVisivel(false);
      }
    }

    // roda imediatamente
    atualizarVisibilidade();

    // observa mudanças no tamanho da página (conteúdo dinâmico)
    const observer = new ResizeObserver(atualizarVisibilidade);
    observer.observe(document.body);

    window.addEventListener("scroll", atualizarVisibilidade);
    window.addEventListener("resize", atualizarVisibilidade);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", atualizarVisibilidade);
      window.removeEventListener("resize", atualizarVisibilidade);
    };
  }, []);

  if (modalAberto) return null;

  return (
    <footer
      className={`${styles.footer} ${
        visivel ? styles.visible : styles.hidden
      }`}
    >
      <p className={styles.text}>
        © 2025 AssetReserve — Todos os direitos reservados.
      </p>
    </footer>
  );
}
