import House from "../models/House.js"
import User from '../models/User.js'

class HouseController {

    async index(req, res) {

        const { status } = req.query;

        const houses = await House.find({ status })


        return res.json(houses)
    }

    async store(req, res) {

        //pegamos do arquivo enviado na requisição
        const { filename } = req.file;

        //pegamos do corpo enviado na requisição
        const { description, price, location, status } = req.body;

        //pegamos do header da requisição
        const { user_id } = req.headers;


        //criamos a nova casa no banco de dados
        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status
        });


        return res.json(house);
    }

    async update(req, res) {

        const { filename } = req.file;
        const { house_id } = req.params;

        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        let houses = await House.findById(house_id)

        if (String(user._id) !== String(houses.user)) {
            return res.status(401).json({ error: "NNão autorizado." })
        }

        await House.updateOne({ _id: house_id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status
        })

        return res.send();
    }

    async destroy(req, res) {

        //pegamos o id da casa enviada no body da requisição
        const { house_id } = req.body;

        //id do usuário logado enviado no header da requisição
        const { user_id } = req.headers;

        //procuramos o usuário pelo seu id no banco
        const user = await User.findById(user_id);

        //procuramos por uma casa no banco de dados com o id passado
        let houses = await House.findById(house_id)

        //verificamos se o id do usuário encontrado é diferente do cadastrado na casa passada
        if (String(user._id) !== String(houses.user)) {
            return res.status(401).json({ error: "NNão autorizado." })
        }

        //procuramos e deletamos a casa pela sua propriedade _id
        //que deve ser a mesma pasada pela requisição
        await House.findByIdAndDelete({
            _id: house_id
        })


        return res.json({
            message: "Excluida com sucesso!"
        })
    }
}


export default new HouseController()