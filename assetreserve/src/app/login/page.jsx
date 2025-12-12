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
        <div className="my-[30%] mx-[30%] items-center">
            <h2 className="">Login</h2>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="senha">Senha: </label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite sua senha"
                        required
                    />
                </div>

                <button type="submit" className="login-button">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
