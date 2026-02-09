'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './authPage.module.css'
import AuthForm from './AuthForm' // Importamos o novo componente de formulário

export default function AuthContent() {
  const searchParams = useSearchParams()
  const modoInicial = searchParams.get('mode')

  // Define se é login ou cadastro baseado na URL ou estado
  const [isLogin, setIsLogin] = useState(modoInicial !== 'cadastro')

  useEffect(() => {
    setIsLogin(searchParams.get('mode') !== 'cadastro')
  }, [searchParams])

  // Função para alternar o modo, passada para o filho
  const toggleMode = () => setIsLogin(!isLogin)

  return (
    <main className={`${styles.main} ${isLogin ? styles.loginBg : styles.cadastroBg}`}>
      <div className={styles.wrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'cadastro'}
            initial={{ x: isLogin ? -80 : 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isLogin ? 80 : -80, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`${styles.card} ${isLogin ? styles.cardLogin : styles.cardCadastro}`}
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              {isLogin ? 'Login' : 'Cadastro'}
            </h2>

            {/* Aqui renderizamos o formulário isolado */}
            <AuthForm isLogin={isLogin} toggleMode={toggleMode} />

          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}