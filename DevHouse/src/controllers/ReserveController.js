import Reserve from "../models/Reserve.js";
import User from "../models/User.js";
import House from "../models/House.js";

class ReserveController {

    async store(req, res) {

        //pegamos o id do usuário passado no header da req
        const { user_id } = req.headers;

        //pegamos o id da casa passado na url da req
        const { house_id } = req.params;

        //pegamos date do corpo da requisição
        const { date } = req.body;


        //buscamos uma casa com o id passado na req
        const house = await House.findById(house_id)

        //se nada for encontrado, retornamos
        if (!house) {
            return res.status(400).json({ error: 'Essa id/casa não existe ' })
        }


        //se for encontrada mas com a propriedade status=true, retornamos
        if (house.status !== true) {
            return res.status(400).json({ error: 'Casa solicitada indisponível' })
        }


        //buscamos o usuário pelo id passado na req
        const user = await User.findById(user_id)

        //se o id do usuário encontrado for igual ao id do user cadastrado na casa, retornamos
        if (String(user._id) === String(house.user)) {
            return res.status(401).json({ error: 'Reserva não permitida ' })
        }


        //montamos o objeto reserve a ser criado
        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date
        });


        //buscamos a reserva criada pelo seu auto id
        //'populamos' ele com dados de house e dados de user
        //retornmos ele
        Reserve.findById({ _id: reserve._id })
            .populate("house")
            .populate("user")
            .then((reserve) => {
                return res.json(reserve);

            })
            .catch((err) => {
                return res.status(500).json({ error: err.message })
            })

    }

}


export default new ReserveController();