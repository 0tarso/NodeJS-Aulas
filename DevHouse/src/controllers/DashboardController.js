import House from "../models/House.js";


class DashboardController {

    async show(req, res) {

        //pegamos o id do usuário mandado no header
        const { user_id } = req.headers;

        //procuramos no banco todas as casas registradas por esse usuário
        const houses = await House.find({ user: user_id })


        //retornamos as casas
        return res.json(houses)
    }

}


export default new DashboardController();