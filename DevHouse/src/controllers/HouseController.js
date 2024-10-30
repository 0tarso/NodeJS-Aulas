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

        const { house_id } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        let houses = await House.findById(house_id)

        if (String(user._id) !== String(houses.user)) {
            return res.status(401).json({ error: "NNão autorizado." })
        }

        await House.findByIdAndDelete({
            _id: house_id
        })

        return res.json({
            message: "Excluida com sucesso!"
        })
    }
}


export default new HouseController()