'use client';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos!');
      return;
    }

    console.log('Login bem-sucedido!');
    setErro('');
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
          
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#0B2545] mb-1"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-[#0B2545] mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-[#0B2545] text-white py-3 rounded-lg font-semibold hover:bg-[#163b6b] transition duration-300"
          >
            Entrar
          </button>

        </form>
      </div>
    </section>
  );
}

export default Login;
