import House from "../models/House.js"
import User from '../models/User.js'
import * as Yup from 'yup'

class HouseController {

    async index(req, res) {

        //pegamos o status passado como parâmetro na requisição
        const { status } = req.query;

        //buscamos casas com o status
        const houses = await House.find({ status })

        //retornamos as casas encontradas
        return res.json(houses)
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required()
        })

        //pegamos do arquivo enviado na requisição
        const { filename } = req.file;

        //pegamos do corpo enviado na requisição
        const { description, price, location, status } = req.body;

        //pegamos do header da requisição
        const { user_id } = req.headers;


        //se algo falhar no schema ele retorna false
        //retornamos um erro
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha na validação. " })
        }

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

        //schema de validação com o Yup
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required()
        })

        const { filename } = req.file;
        const { house_id } = req.params;

        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        //se algo falhar no schema ele retorna false
        //retornamos um erro
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha na validação. " })
        }

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