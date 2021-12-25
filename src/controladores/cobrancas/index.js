const atualizarCobranca = require('./atualizar_cobranca')
const cadastrarCobranca = require('./cadastrar_cobranca')
const listarCobrancas = require('./listar_cobrancas')
const detalharCobranca = require('./detalhar_cobranca')
const excluirCobranca = require('./excluir_cobranca')
const buscarCobranca = require('./buscar_cobranca')

module.exports = {
    atualizarCobranca,
    cadastrarCobranca,
    listarCobrancas,
    detalharCobranca,
    excluirCobranca,
    buscarCobranca
}