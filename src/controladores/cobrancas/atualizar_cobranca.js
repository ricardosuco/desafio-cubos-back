const { knex } = require('../../conexao')
const yup = require('yup')

const atualizarCobranca = async (req, res) => {
    const {descricao, status, valor, vencimento} = req.body
    const { id } = req.params

    const schema = yup.object().shape({
        descricao: yup.string().required('O campo descrição é obrigatório'),
        status: yup.boolean().required('O campo Status é obrigatório'),
        valor: yup.number().required('O campo valor é obrigatório'),
        vencimento: yup.date().required('O campo vencimento é obrigatório')
    })

    try {
        await schema.validate(req.body)

        const cobrancaAtualizada = await knex('cobrancas').update({descricao, pago:status, valor, vencimento}).where({id}).debug()
        if (!cobrancaAtualizada) {
            return res.status(404).json({ mensagem: 'Cobrança não localizada' })
        }
        return res.status(201).send()
        
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado atualizar a cobrança. - " + error.message });
    }

}

module.exports = atualizarCobranca
