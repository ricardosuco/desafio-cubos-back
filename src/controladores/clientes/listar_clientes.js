const { knex } = require('../../conexao');

const listarCliente = async (req, res) => {

    try {
        const retornoListClientes = await knex("clientes");
        return res.status(201).json(retornoListClientes);
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado ao cadastrar um cliente. - " + error.message });
    }
};

module.exports = listarCliente;