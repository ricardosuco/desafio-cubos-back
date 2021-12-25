const { knex } = require('../../conexao');
const yup = require('yup')

const cadastrarCobranca = async (req, res) => {
    const { cliente, descricao, vencimento, valor, status, cliente_id } = req.body;

    const schema = yup.object().shape({
        cliente: yup.string().required('O nome do cliente é obrigatório'),
        descricao: yup.string().required('A descrição é obrigatória'),
        valor: yup.number().required('O valor é obrigatório'),
        status: yup.boolean().required('O status é obrigatório'),
        vencimento: yup.date().required('A data de vencimento é obrigatória'),
        cliente_id: yup.number().required()
    })

    try {
        await schema.validate(req.body)
        const cadastraCobranca = await knex('cobrancas').insert({ cliente, descricao, vencimento, valor, pago: status, cliente_id })
        return res.status(201).send();
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado ao cadastrar a cobrança. - " + error.message });
    }
}

module.exports = cadastrarCobranca
