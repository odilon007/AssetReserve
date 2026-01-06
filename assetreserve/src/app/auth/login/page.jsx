'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos!');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setLoading(false);

    if (error) {
      setErro('E-mail ou senha inválidos');
      return;
    }

    window.location.href = '/site/ativos'
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-[#0B2545] text-center mb-4">
          Login
        </h2>

        {erro && (
          <p className="text-red-500 text-sm text-center mb-4">
            {erro}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B2545] text-white py-3 rounded-lg font-semibold hover:bg-[#163b6b] transition disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-sm text-center text-gray-600">
            Não tem uma conta?{' '}
            <Link
              href="/auth/cadastro"
              className="text-[#0B2545] font-semibold hover:underline"
            >
              Cadastre-se
            </Link>
          </p>

        </form>
      </div>
    </section>
  );
}
