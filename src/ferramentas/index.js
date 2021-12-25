const { knex, query } = require('../conexao');


const data = () => {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = (dataAtual.getMonth() + 1);
    const ano = dataAtual.getFullYear();
    const horas = dataAtual.getHours();
    const min = dataAtual.getMinutes();
    const sec = dataAtual.getSeconds();
    return `${ano}-${mes}-${dia} ${horas}:${min}:${sec}`;
}

const getUsuarioByEmail = async (email) => {
    const usuario = await knex('usuarios').where({ email }).first();
    return { usuario };
}

const getUsuarioById = async (id) => {
    const userEncontrado = knex('usuarios').where({id}).first().debug()
    const {senha, ...usuario} = userEncontrado
    return {userEncontrado, usuario}
}

const isNotUnicEmail = async (email) => {
    const { rowCount } =
        await query('SELECT email FROM usuarios WHERE email = $1', [email]);
    return rowCount > 0;
}

module.exports = { data, getUsuarioByEmail, getUsuarioById, isNotUnicEmail };
