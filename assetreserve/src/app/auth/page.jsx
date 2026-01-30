'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './authPage.module.css'

export default function AuthPage() {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleAuth(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.senha,
        })

        if (error) throw new Error('E-mail ou senha inválidos')

        router.push('/site/ativos')
      } else {
        if (formData.senha !== formData.confirmarSenha) {
          throw new Error('As senhas não coincidem!')
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.senha,
          options: {
            data: { nome: formData.nome },
          },
        })

        if (error) throw error

        setIsLogin(true)
      }
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className={`${styles.main} ${
        isLogin ? styles.loginBg : styles.cadastroBg
      }`}
    >
      <div className={styles.wrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'cadastro'}
            initial={{ x: isLogin ? -80 : 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isLogin ? 80 : -80, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`${styles.card} ${
              isLogin ? styles.cardLogin : styles.cardCadastro
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              {isLogin ? 'Login' : 'Cadastro'}
            </h2>

            {erro && <p className={styles.error}>{erro}</p>}

            <form onSubmit={handleAuth} className={styles.form}>
              {!isLogin && (
                <input
                  name="nome"
                  type="text"
                  placeholder="Nome"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                />
              )}

              <input
                name="email"
                type="email"
                placeholder="E-mail"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
              />

              {/* --- MODIFICAÇÃO: Wrapper e Lógica de Mostrar Senha --- */}
              <div className="relative w-full">
                <input
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>

              {!isLogin && (
                <input
                  name="confirmarSenha"
                  type="password"
                  placeholder="Confirmar senha"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                />
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
                {loading
                  ? 'Processando...'
                  : isLogin
                  ? 'Entrar'
                  : 'Cadastrar'}
              </button>
            </form>

            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setShowPassword(false); // Reseta ao trocar de tela
              }}
              className={styles.switchBtn}
            >
              {isLogin
                ? 'Não tem conta? Cadastre-se'
                : 'Já tem conta? Faça login'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}