// mínimo de 8 caracteres;
// 1 letra maiúscula;
// 1 número;
// 1 caractere especial.

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const senhaForteRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}\-_=+\\|;:'",.<>\/?])[A-Za-z\d@$!%*?&()[\]{}\-_=+\\|;:'",.<>\/?]{8,}$/;

export function validarEmail(email) {
    if (!emailRegex.test(email)) {
        return 'E-mail inválido.';
    }
    return null;
}

export function validarSenha(senha) {
    if (!senhaForteRegex.test(senha)) {
        return 'A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial.';
    }
    return null;
}

export function validarCadastro({ nome, email, senha, confirmarSenha }) {
    if (!nome || nome.trim() === '') {
        return 'Nome é obrigatório.';
    }

    const erroEmail = validarEmail(email);
    if (erroEmail) return erroEmail;

    const erroSenha = validarSenha(senha);
    if (erroSenha) return erroSenha;

    if (senha !== confirmarSenha) {
        return 'As senhas são diferentes.';
    }

    return null;

}