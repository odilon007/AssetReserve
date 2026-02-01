'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { validarCadastro, validarEmail } from '@/utils/validacao';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_CODE = 'admin123'; // ⚠️ depois mover para env

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
    codigoAdmin: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    const erroValidacao = validarCadastro(formData);
    if (erroValidacao) {
      setError(erroValidacao);
      setLoading(false);
      return;
    }

    const isAdmin = formData.codigoAdmin === ADMIN_CODE;

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.senha,
      options: {
        data: {
          nome: formData.nome,
          role: isAdmin ? 'admin' : 'user',
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMensagem(
        isAdmin
          ? 'Administrador cadastrado! Verifique seu e-mail.'
          : 'Cadastro realizado! Verifique seu e-mail.'
      );
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
                <>
                  <input
                    name="nome"
                    placeholder="Nome"
                    required
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />

                  <input
                    name="codigoAdmin"
                    placeholder="Código de administrador (opcional)"
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </>
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
                <input
                  name="confirmarSenha"
                  type="password"
                  placeholder="Confirmar senha"
                  required
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B2545] text-white py-3 rounded-lg font-semibold"
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
