const { knex } = require('../../conexao')

const buscarCobranca = async (req, res) => {

    //TODO - Buscar por ID

    const { busca } = req.body

    try {
        const filtroCobranca = await knex('cobrancas').where('cliente', 'ilike', `%${busca}%`)
        if (filtroCobranca.length == 0) {
            return res.status(404).json({ mensagem: 'Cobrança não localizado' })
        }
        
        return res.json(filtroCobranca).status(200)
    } catch (error) {

        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado ao buscar uma cobrança. - " + error });
    }

}

module.exports = buscarCobranca