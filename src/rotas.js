const express = require('express');
const rotas = express();
const validaToken = require('./intermediarios/autenticar');

const {
    cadastrarUsuario,
    logarUsuario,
    detalharUsuario,
    atualizarUsuario,
} = require('./controladores/usuarios');

const {
    cadastrarCliente,
    detalharCliente,
    atualizarCliente,
    listarCliente,
    buscarCliente,
} = require('./controladores/clientes');

const {
    listarCobrancas,
    detalharCobranca,
    atualizarCobranca,
    excluirCobranca,
    cadastrarCobranca,
    buscarCobranca
} = require('./controladores/cobrancas')

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', logarUsuario);

rotas.use(validaToken);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario);

rotas.get('/clientes', listarCliente);
rotas.post('/cliente', cadastrarCliente);
rotas.get('/clientes/detalhe/:id', detalharCliente);
rotas.put('/cliente/:id', atualizarCliente);
rotas.get('/clientes/buscar', buscarCliente)


rotas.get('/cobrancas', listarCobrancas);
rotas.post('/cobrancas', cadastrarCobranca)
rotas.get('/cobrancas/cliente', detalharCobranca)
rotas.put('/cobrancas/:id', atualizarCobranca)
rotas.delete('/cobrancas/:id', excluirCobranca)
rotas.get('/cobrancas/buscar', buscarCobranca)

module.exports = rotas;
