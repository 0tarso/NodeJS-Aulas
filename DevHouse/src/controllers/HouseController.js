import House from "../models/House.js"


class HouseController {

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

}


export default new HouseController()