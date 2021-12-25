const jwt = require('jsonwebtoken');
const tokenHash = require('../../token_hash');
const { knex }= require('../../conexao')

const detalharUsuario = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const { id } = jwt.verify(token, tokenHash);
    try {
        const userEncontrado = await knex('usuarios').where('id', id).first().debug()
        if (!userEncontrado)
            return res.status(400).json({ mensagem: "Usuário não encontrado." });
            const {nome, email, telefone, cpf} = userEncontrado
        return res.status(200).json({nome, email, telefone, cpf});
    } catch (error) {
        return res.status(500).json({ mensagem: `Ocorreu um erro inesperado detalhar cliente. - ${error.message}` });
    }
};

module.exports = detalharUsuario;



// const detalharCliente = async (req, res) => {
//     try {
        
//         if (!tabelaClientes) {
//             return res.status(400).json({ mensagem: "Usuário não encontrado." });
//         }
//             return res.json(tabelaClientes).status(200)
//     } catch (error) {
//         return res.status(500).json({ mensagem: `Ocorreu um erro inesperado. - ${error.message}` });
//     }
// };

// module.exports = detalharCliente;