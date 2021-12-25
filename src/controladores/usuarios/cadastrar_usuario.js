const { knex } = require('../../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!email)
        return res.status(400).json({ mensagem: "O campo email é obrigatória." });

    try {
        const jaExisteEmail = await knex('usuarios').where('email', email).first();
        if (jaExisteEmail) {
            return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
        }
    } catch (error) {
        return res.status(500).json({ mensagem: `Ocorreu um erro inesperado ao verificar usuário único email. - ${error}` });
    }

    if (!nome)
        return res.status(400).json({ mensagem: "O campo nome é obrigatória." });

    if (!senha)
        return res.status(400).json({ mensagem: "O campo senha é obrigatória." });

    if (senha.length < 6) {
        return res.status(400).json({ mensagem: "A senha deve ter no minimo 6 caracteres" });
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).debug()

        return res.status(201).send();
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado no cadastro de usuário. - " + error });
    }
};

module.exports = cadastrarUsuario;