'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { validarEmail } from '@/utils/validacao';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mensagem, setMensagem] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  // Requisitos da senha (tempo real)
  const [requisitosSenha, setRequisitosSenha] = useState({
    tamanho: false,
    maiuscula: false,
    numero: false,
    especial: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === 'senha') {
      setRequisitosSenha({
        tamanho: value.length >= 8,
        maiuscula: /[A-Z]/.test(value),
        numero: /\d/.test(value),
        especial: /[@$!%*?&()[\]{}\-_=+\\|;:'",.<>\/?]/.test(value),
      });
    }
  };

  const senhaValida =
    requisitosSenha.tamanho &&
    requisitosSenha.maiuscula &&
    requisitosSenha.numero &&
    requisitosSenha.especial;

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setMensagem('');
    setLoading(true);

    // ================= LOGIN =================
    if (isLogin) {
      const erroEmail = validarEmail(formData.email);
      if (erroEmail) {
        setError(erroEmail);
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.senha,
      });

      if (error) {
        setError('Email ou senha inválidos.');
      } else {
        window.location.href = '/site/ativos';
      }

      setLoading(false);
      return;
    }

    // ================= CADASTRO =================
    if (!senhaValida) {
      setError('A senha não atende aos requisitos.');
      setLoading(false);
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.senha,
      options: {
        data: { nome: formData.nome },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMensagem('Cadastro realizado! Verifique seu e-mail.');
      setIsLogin(true);
    }

    setLoading(false);
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'cadastro'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-xl shadow-xl"
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              {isLogin ? 'Login' : 'Cadastro'}
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            {mensagem && (
              <p className="text-green-600 text-sm text-center mb-4">
                {mensagem}
              </p>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <input
                  name="nome"
                  placeholder="Nome"
                  required
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              )}

              <input
                name="email"
                type="email"
                placeholder="E-mail"
                required
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                name="senha"
                type="password"
                placeholder="Senha"
                required
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              {!isLogin && (
                <>
                  {/* CHECKLIST DA SENHA */}
                  <ul className="text-sm space-y-1">
                    <li className={requisitosSenha.tamanho ? 'text-green-600' : 'text-red-500'}>
                      • Mínimo 8 caracteres
                    </li>
                    <li className={requisitosSenha.maiuscula ? 'text-green-600' : 'text-red-500'}>
                      • Letra maiúscula
                    </li>
                    <li className={requisitosSenha.numero ? 'text-green-600' : 'text-red-500'}>
                      • Número
                    </li>
                    <li className={requisitosSenha.especial ? 'text-green-600' : 'text-red-500'}>
                      • Caractere especial
                    </li>
                  </ul>

                  <input
                    name="confirmarSenha"
                    type="password"
                    placeholder="Confirmar senha"
                    required
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </>
              )}

              <button
                type="submit"
                disabled={loading || (!isLogin && !senhaValida)}
                className={`w-full py-3 rounded-lg font-semibold transition
                  ${
                    loading || (!isLogin && !senhaValida)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#0B2545] hover:bg-[#163b6b] text-white'
                  }
                `}
              >
                {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Cadastrar'}
              </button>
            </form>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full mt-6 text-sm text-center underline"
            >
              {isLogin ? 'Criar conta' : 'Já tenho conta'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
