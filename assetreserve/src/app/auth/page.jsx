'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { validarCadastro, validarEmail }  from '@/utils/validacao';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const router = useRouter();
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

  const hadleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const hadleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setMensagem('');
    setLoading(true);

    //====================Login==========================
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

    //====================Cadastro==========================
    const erroValidação = validarCadastro(formData);
    if (erroValidação) {
      setError(erroValidação);
      setLoading(false);
      return;
    }

    const {error} = await supabase.auth.signUp({
      email: formData.email,
      password: formData.senha,
      options: {
        data: {
          nome: formData.nome,
        },
        emailRedirectTo:`${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMensagem('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar sua conta.');
      setIsLogin(true);
    }
    setLoading(false);
  };
  
  return (
    <main
      className={`w-full min-h-screen flex items-center justify-center transition-colors duration-500 px-4 ${
        isLogin ? 'bg-gray-100' : 'bg-[#0B2545]'
      }`}
    >
      <div className="relative w-full max-w-md overflow-hidden bg-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'cadastro'}
            initial={{ x: isLogin ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isLogin ? 100 : -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`w-full rounded-xl shadow-2xl p-8 ${
              isLogin
                ? 'bg-white text-[#0B2545]'
                : 'bg-[#0B2545] text-white border border-gray-700'
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              {isLogin ? 'Login' : 'Cadastro'}
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            {mensagem && (
              <p className="text-green-500 text-sm text-center mb-4">
                {mensagem}
              </p>
            )}

            <form onSubmit={hadleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    name="nome"
                    type="text"
                    required
                    onChange={hadleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <input
                  name="email"
                  type="email"
                  required
                  onChange={hadleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  name="senha"
                  type="password"
                  required
                  onChange={hadleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    name="confirmarSenha"
                    type="password"
                    required
                    onChange={hadleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  isLogin
                    ? 'bg-[#0B2545] text-white hover:bg-[#163b6b]'
                    : 'bg-white text-[#0B2545] hover:bg-gray-200'
                }`}
              >
                {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Cadastrar'}
              </button>
            </form>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full mt-6 text-sm text-center font-medium hover:underline opacity-80"
            >
              {isLogin
                ? 'Não tem conta? Cadastre-se'
                : 'Já tem conta? Faça login'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}