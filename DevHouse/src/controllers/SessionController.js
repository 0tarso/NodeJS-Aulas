//métodos: index, show, update, store, destroy

/*
index: listagem de sessões
store: criar uma sessão
show: listar uma unica sessão
update: alerar alguma sessão
destroy: deletar um sessão
*/

import User from "../models/User.js"


class SessionController {

    async store(req, res) {

        //pegamos o email da requisição
        const { email } = req.body;

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