const { knex } = require('../../conexao');
const yup = require('yup');

const atualizarCliente = async (req, res) => {
    const {
        nome,
        email,
        cpf,
        telefone,
        cep,
        endereco,
        complemento,
        bairro,
        cidade,
        uf
    } = req.body;
    const { id } = req.params;
    const schema = yup.object().shape({
        nome: yup.string().required('O campo Nome é obrigatório'),
        email: yup.string().email().required('O campo email é obrigatório'),
        cpf: yup.number().required('O campo CPF é obrigatório'),
        telefone: yup.number().required('O campo telefone é obrigatório'),
        cep: yup.number(),
        complemento: yup.string(),
        endereco: yup.string(),
        bairro: yup.string(),
        cidade: yup.string(),
        uf: yup.string()
    });

    try {
        await schema.validate(req.body);

        if (cpf.length !== 11) {
            return res.status(400).json({ mensagem: "O CPF deve conter 11 dígitos" })
        }
        
        if (telefone.length !== 12) {
            return res.status(400).json({ mensagem: "O telefone deve conter 12 dígitos (DDD) + Número" })
        }

        const emailLocalizado = await knex('clientes').where({ email }).where('id', '!=', id).first().debug()
        if (emailLocalizado) {

            return res.status(400).json({ mensagem: "Este email ja foi cadastrado para outro cliente" })
        }

        const cpfLocalizado = await knex('clientes').where({ cpf }).where('id', '!=', id).first().debug()
        if (cpfLocalizado) {

            return res.status(400).json({ mensagem: "Este CPF ja foi cadastrado para outro cliente" })
        }

    } catch (error) {

        return res.status(500).json({ mensagem: `Ocorreu um erro inesperado no esquema de atualização de cliente. - ${error.message}` });
    }

    try {

        const clienteAtualizado = await knex('clientes')
            .update({
                nome,
                email,
                cpf,
                telefone,
                cep,
                endereco,
                complemento,
                bairro,
                cidade,
                uf
            })
            .where({ id })


        return res.status(201).send();
    }
    catch (error) {

        return res.status(500).json({ mensagem: "Ocorreu um erro inesperado em atualizar cliente. - " + error.message });
    }
};

module.exports = atualizarCliente;