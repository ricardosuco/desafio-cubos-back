const {knex} = require("../../conexao")

const detalharCobranca = async (req,res) => {
    const { id } = req.params

    try {
        const cobrancaDetalhada = await knex('cobrancas').where('cliente_id', id).debug()
        if (cobrancaDetalhada.length == 0) {
            return res.status(404).json({mensagem: "Cobrança não localizada"})
        }
        return res.status(200).json(cobrancaDetalhada)
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado ao detalhar a cobrança. - " + error.message });
    }
}

module.exports = detalharCobranca