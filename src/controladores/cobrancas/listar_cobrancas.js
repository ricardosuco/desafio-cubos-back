const { knex } = require("../../conexao");

const listarCobrancas = async (req,res) => {
    try {
        const cobrancas = await knex('cobrancas')
        if(cobrancas.length == 0) {
            res.status(400).json({mensagem:"Não há cobrancas cadastradas"})
        }
            res.status(200).json(cobrancas)
    } catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado ao listar as cobranças. - " + error.message });
    }
}

module.exports = listarCobrancas