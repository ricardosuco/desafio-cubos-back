const cadastrarCliente = require('./cadastrar_cliente');
const detalharCliente = require('./detalhar_cliente');
const atualizarCliente = require('./atualizar_cliente.js');
const listarCliente = require('./listar_clientes.js');
const buscarCliente = require('./buscar_cliente')

module.exports = {
    cadastrarCliente,
    detalharCliente,
    atualizarCliente,
    listarCliente,
    buscarCliente
};