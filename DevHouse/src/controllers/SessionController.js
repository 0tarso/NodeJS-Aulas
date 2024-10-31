//métodos: index, show, update, store, destroy

/*
index: listagem de sessões
store: criar uma sessão
show: listar uma unica sessão
update: alerar alguma sessão
destroy: deletar um sessão
*/

import User from "../models/User.js"
import * as Yup from 'yup'

class SessionController {

    async store(req, res) {

        const schema = Yup.object().shape({
            email: Yup.string().email().required()
        })

        //pegamos o email da requisição
        const { email } = req.body;

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha na autenticação" })
        }

        //passamos para o model que irá criar o novo usuário no banco
        //verificamos se ja existe um user com o email passado na req
        let user = await User.findOne({ email })

        //se não houver, criamos o usuário
        if (!user) {
            user = await User.create({ email })
        }

        //se não, apenas retornamos o usuário encontrado
        //retornamos o usuário criado
        return res.json(user)
    }
}


export default new SessionController()