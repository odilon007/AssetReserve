'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem!');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          nome: nome, // salva no user_metadata
        },
      },
    });

    setLoading(false);

    if (error) {
      setErro(error.message);
      return;
    }

    // cadastro OK → vai para login
    router.push('/auth/login');
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-[#0B2545] text-center mb-4">
          Cadastro
        </h2>

        {erro && (
          <p className="text-red-500 text-sm text-center mb-4">
            {erro}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Nome
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          {/* Senha */}
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

          {/* Confirmar Senha */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Confirmar Senha
            </label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme sua senha"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B2545] text-white py-3 rounded-lg font-semibold hover:bg-[#163b6b] transition disabled:opacity-60"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          {/* Link para Login */}
          <p className="text-sm text-center text-gray-600">
            Já tem uma conta?{' '}
            <Link
              href="/auth/login"
              className="text-[#0B2545] font-semibold hover:underline"
            >
              Faça login
            </Link>
          </p>

        </form>
      </div>
    </section>
  );
}
