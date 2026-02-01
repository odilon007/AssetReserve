'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { validarCadastro, validarEmail } from '@/utils/validacao';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_CODE = 'admin123'; // 🔐 troque depois

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

    // ==================== LOGIN ====================
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

    // ==================== CADASTRO ====================
    const erroValidacao = validarCadastro(formData);
    if (erroValidacao) {
      setError(erroValidacao);
      setLoading(false);
      return;
    }

    const isAdmin = formData.codigoAdmin === ADMIN_CODE;

    const { data, error } = await supabase.auth.signUp({
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
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'cadastro'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-8 rounded-xl shadow"
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              {isLogin ? 'Login' : 'Cadastro'}
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {mensagem && <p className="text-green-500 text-center">{mensagem}</p>}

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <>
                  <input
                    name="nome"
                    placeholder="Nome"
                    onChange={handleChange}
                    className="input"
                  />

                  <input
                    name="codigoAdmin"
                    placeholder="Código de administrador (opcional)"
                    onChange={handleChange}
                    className="input"
                  />
                </>
              )}

              <input
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={handleChange}
                className="input"
              />

              <input
                name="senha"
                type="password"
                placeholder="Senha"
                onChange={handleChange}
                className="input"
              />

              {!isLogin && (
                <input
                  name="confirmarSenha"
                  type="password"
                  placeholder="Confirmar senha"
                  onChange={handleChange}
                  className="input"
                />
              )}

              <button className="w-full bg-blue-600 text-white py-2 rounded">
                {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Cadastrar'}
              </button>
            </form>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full mt-4 text-sm underline"
            >
              {isLogin ? 'Criar conta' : 'Já tenho conta'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
