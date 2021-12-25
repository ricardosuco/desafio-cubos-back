const { knex } = require('../../conexao')

const detalharCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const clienteLocalizado = await knex('clientes').where('id', id).first().debug()
        if (!clienteLocalizado) {
            return res.status(400).json({ mensagem: "Cliente não encontrado." });
        }
        return res.json(clienteLocalizado).status(200)
    } catch (error) {
        return res.status(500).json({ mensagem: `Ocorreu um erro inesperado em detalhar cliente. - ${error.message}` });
    }
};

module.exports = detalharCliente;