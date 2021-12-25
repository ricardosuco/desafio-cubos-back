const { knex } = require('../../conexao');
const jwt = require('jsonwebtoken');
const tokenHash = require('../../token_hash');
const yup = require('yup')


const cadastrarCliente = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const { id } = jwt.verify(token, tokenHash);

    const {
        nome,
        cpf,
        telefone,
        endereco,
        cep,
        bairro,
        cidade,
        complemento,
        uf,
        email,
    } = req.body;

    const schema = yup.object().shape({
        nome: yup.string().required('O campo Nome é obrigatório'),
        email: yup.string().email().required('O campo email é obrigatório'),
        cpf: yup.number().required('O campo CPF é obrigatório'),
        telefone: yup.number().required('O campo telefone é obrigatório'),
        cep: yup.number(),
        endereco: yup.string(),
        complemento: yup.string(),
        bairro: yup.string(),
        cidade: yup.string(),
        uf: yup.string()
    })

    try {
        await schema.validate(req.body)

        const cpfLocalizado = await knex('clientes').where({ cpf }).first().debug()
        if (cpfLocalizado) {

            return res.status(400).json({ mensagem: "CPF ja cadastrado" })
        }

        if (cpf.length !== 11) {
            return res.status(400).json({ mensagem: "O CPF deve conter 11 dígitos" })
        }

        if (telefone.length !== 12) {
            return res.status(400).json({ mensagem: "O telefone deve conter 12 dígitos (DDD) + Número" })
        }

        const emailLocalizado = await knex('clientes').where({ email }).first().debug()
        if (emailLocalizado) {

            return res.status(400).json({ mensagem: "Email ja cadastrado" })
        }

        const retornoAddCliente = await knex("clientes").insert({ id_usuario: id, nome, email, cpf, telefone, cep, endereco, complemento, bairro, cidade, uf });
        return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado ao cadastrar um cliente. - " + error });
    }
};

module.exports = cadastrarCliente;
