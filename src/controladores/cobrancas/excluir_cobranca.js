const { date } = require('yup/lib/locale')
const { knex } = require('../../conexao')

const excluirCobranca = async (req, res) => {
    const { id } = req.params

    const dataAtual = new Date()

    console.log(dataAtual)

    try {
        const cobrancaExcluida = await knex('cobrancas').del().where({id}).where('pago', false).where('vencimento', '>', dataAtual).debug()
        if (!cobrancaExcluida) {
            res.status(400).json({mensagem:"Não é possível excluir uma cobrança paga ou vencida"})
        }
            res.status(200).send()
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado ao excluir a cobrança. - " + error.message });
    }

}

module.exports = excluirCobranca