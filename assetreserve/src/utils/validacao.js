// mínimo de 8 caracteres;
// 1 letra maiúscula;
// 1 número;
// 1 caractere especial.

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const senhaForteRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export function validarEmail(email) {
    if (!emailRegex.test(email)) {
        return 'Email inválido.';
    }
    return null;
}

export function validarSenha(senha) {
    if (!senhaForteRegex.test(senha)) {
        return 'Senha Fraca.';
    }
    return null;
}

// Validação em tempo real

export function validarSenhaDetalhada(senha) {
    return {
        tamanho: senha.length >= 8,
        maiuscula: /[A-Z]/.test(senha),
        numero: /\d/.test(senha),
        especial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(senha),
    };
}

export function validarCadastro({ nome, email, senha, confirmarSenha }) {
    if (!nome || nome.trim() === '') {
        return 'O nome é obrigatório.';
    }

    const erroEmail = validarEmail(email);
    if(erroEmail) return erroEmail;

    const erroSenha = validarSenha(senha);
    if(erroSenha) {
        return 'A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.';
    }

    if (senha !== confirmarSenha) {
        return 'As senhas não coincidem.';
    }

    return null;
}
