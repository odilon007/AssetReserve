'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Estados dos formulários
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    if (isLogin) {
      // Lógica de LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.senha,
      });
      if (error) setErro('E-mail ou senha inválidos');
      else window.location.href = '/site/ativos';
    } else {
      // Lógica de CADASTRO
      if (formData.senha !== formData.confirmarSenha) {
        setErro('As senhas não coincidem!');
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
        options: { data: { nome: formData.nome } },
      });
      if (error) setErro(error.message);
      else setIsLogin(true); // Após cadastrar, joga para o login
    }
    setLoading(false);
  };

  return (
    // O background muda conforme o estado
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`w-full rounded-xl shadow-2xl p-8 ${
              isLogin ? 'bg-white text-[#0B2545]' : 'bg-[#0B2545] text-white border border-gray-700'
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              {isLogin ? 'Login' : 'Cadastro'}
            </h2>

            {erro && <p className="text-red-500 text-sm text-center mb-4">{erro}</p>}

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    name="nome"
                    type="text"
                    required
                    onChange={handleChange}
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
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  name="senha"
                  type="password"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1">Confirmar Senha</label>
                  <input
                    name="confirmarSenha"
                    type="password"
                    required
                    onChange={handleChange}
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
              {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}