const { knex } = require('../../conexao')

const buscarCliente = async (req, res) => {

    const { busca } = req.body

    try {
        const filtroClienteNome = await knex('clientes').where('nome', 'ilike', `%${busca}%`).orWhere('cpf', 'ilike', `%${busca}%`).orWhere('email', 'ilike', `%${busca}%`).debug()
        if (filtroClienteNome.length == 0) {
            return res.status(404).json({ mensagem: 'Cliente não localizado' })
        }

        return res.json(filtroClienteNome).status(200)

    } catch (error) {

        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado ao buscar um cliente. - " + error });
    }

}

module.exports = buscarCliente