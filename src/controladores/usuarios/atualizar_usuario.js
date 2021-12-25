const { knex } = require('../../conexao');
const jwt = require('jsonwebtoken');
const tokenHash = require('../../token_hash');
const bcrypt = require('bcrypt');
const yup = require('yup');

const atualizarUsuario = async (req, res) => {
    const {
        nome,
        email,
        senha,
        cpf,
        telefone,
    } = req.body;

    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const { id } = jwt.verify(token, tokenHash);
    const schema = yup.object().shape({
        nome: yup.string().required('O campo Nome é obrigatório'),
        email: yup.string().email().required('O campo email é obrigatório'),
        senha: yup.string(),
        cpf: yup.number(),
        telefone: yup.number(),
    });

    try {
        await schema.validate(req.body);

        if (cpf && cpf.length !== 11) {
                return res.status(400).json({ mensagem: "O CPF deve conter 11 dígitos" })
        }

        if (senha && senha.length < 6) {
            return res.status(400).json({ mensagem: "A senha deve ter no minimo 6 caracteres" });
        }

        const emailLocalizado = await knex('usuarios').where({ email }).where('id', '!=', id).first().debug()
        if (emailLocalizado) {
            return res.status(400).json({ mensagem: "Email ja cadastrado" })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const usuarioAtualizado = await knex('usuarios').update({ nome, email, senha: senhaCriptografada, cpf, telefone }).where({ id }).debug()

        return res.status(201).send();
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado atualizar usuário. - " + error.message });
    }
};

module.exports = atualizarUsuario;