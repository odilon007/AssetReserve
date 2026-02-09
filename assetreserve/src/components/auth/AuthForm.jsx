'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'
import styles from './authPage.module.css' // Certifique-se que o CSS modules está acessível aqui também

/* utils */
import {
  validarEmail,
  validarCadastro,
  validarSenhaDetalhada,
} from '@/utils/validacao'

export default function AuthForm({ isLogin, toggleMode }) {
  const router = useRouter()
  
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

  /* VALIDAÇÕES VISUAIS */
  const senhaChecks = validarSenhaDetalhada(formData.senha)
  const senhaValida = Object.values(senhaChecks).every(Boolean)
  const emailValido = validarEmail(formData.email) === null

  // Lógica de "Próximo Requisito"
  const obterProximoRequisito = () => {
    if (!formData.senha) return { msg: 'Digite uma senha segura', tipo: 'info' }
    if (!senhaChecks.tamanho) return { msg: 'Mínimo de 8 caracteres', tipo: 'erro' }
    if (!senhaChecks.maiuscula) return { msg: 'Adicione uma letra maiúscula', tipo: 'erro' }
    if (!senhaChecks.numero) return { msg: 'Adicione pelo menos um número', tipo: 'erro' }
    if (!senhaChecks.especial) return { msg: 'Adicione um caractere especial (@, #, $)', tipo: 'erro' }
    return { msg: 'Senha validada!', tipo: 'sucesso' }
  }

  const statusSenha = obterProximoRequisito()

  const borda = (valido, valor) => {
    if (!valor) return 'border-gray-300'
    return valido ? 'border-green-500' : 'border-red-500'
  }

  /* AUTH */
  async function handleAuth(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      const email = formData.email.trim()
      const senha = formData.senha.trim()

      if (isLogin) {
        const erroEmail = validarEmail(email)
        if (erroEmail) throw new Error(erroEmail)

        const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
        if (error) throw new Error('E-mail ou senha inválidos')
        router.push('/site/ativos')
      } else {
        const erroValidacao = validarCadastro({
          ...formData,
          nome: formData.nome.trim(),
          email,
          senha,
          confirmarSenha: formData.confirmarSenha.trim(),
        })

        if (erroValidacao) throw new Error(erroValidacao)

        const { error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: { data: { nome: formData.nome.trim() } },
        })

        if (error) throw error
        // Se o cadastro der certo, troca para login ou exibe msg de sucesso
        // toggleMode() // Opcional: mudar para login automaticamente
        alert('Cadastro realizado! Verifique seu e-mail.')
      }
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {erro && <p className={styles.error}>{erro}</p>}

      <form onSubmit={handleAuth} className={styles.form}>
        {!isLogin && (
          <input
            name="nome"
            type="text"
            placeholder="Nome"
            required
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 text-white bg-transparent ${borda(formData.nome.trim().length >= 2, formData.nome)}`}
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          onChange={handleChange}
          className={`w-full border rounded-lg px-4 py-2 bg-transparent ${isLogin ? 'text-black' : 'text-white'} ${borda(emailValido, formData.email)}`}
        />

        {/* CAMPO SENHA */}
        <div className="relative w-full">
          <input
            name="senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            required
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 bg-transparent pr-10 ${isLogin ? 'text-black' : 'text-white'} ${!isLogin ? borda(senhaValida, formData.senha) : ''}`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
             {/* Ícones SVG (Resumidos para clareza) */}
             {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
          </button>
        </div>

        {/* REQUISITO ÚNICO (DINÂMICO) - Apenas no cadastro */}
        {!isLogin && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            key={statusSenha.msg}
            className={`flex items-center gap-2 text-[11px] font-medium py-1 px-1 transition-colors ${
              statusSenha.tipo === 'sucesso' ? 'text-green-400' : 
              statusSenha.tipo === 'erro' ? 'text-red-400' : 'text-gray-400'
            }`}
          >
             {/* Ícones de status (simplificados) */}
             <span>{statusSenha.msg}</span>
          </motion.div>
        )}

        {!isLogin && (
          <input
            name="confirmarSenha"
            type="password"
            placeholder="Confirmar senha"
            required
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 text-white bg-transparent ${borda(formData.senha === formData.confirmarSenha && formData.confirmarSenha, formData.confirmarSenha)}`}
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${isLogin ? 'bg-[#0B2545] text-white hover:bg-[#163b6b]' : 'bg-white text-[#0B2545] hover:bg-gray-200'}`}
        >
          {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <button onClick={() => { toggleMode(); setShowPassword(false); }} className={styles.switchBtn}>
        {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
      </button>
    </>
  )
}