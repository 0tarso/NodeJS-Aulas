import { Schema, model } from 'mongoose';



const HouseSchema = new Schema({
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
});


//cria um dado virtual
//ou seja, somente retorna quando requisitado, mas não existe na tabela em si
HouseSchema.virtual('thumbnail_url').get(function () {
    return `http://localhost:3030/files/${this.thumbnail}`
})


export default model('House', HouseSchema)

