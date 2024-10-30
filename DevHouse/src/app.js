import dotenv from 'dotenv'

import express from 'express'
import mongoose from 'mongoose'
import routes from './routes.js'

dotenv.config();
const dbPass = process.env.MONGO_PASS
const dbConnect = `mongodb+srv://tailisonramos427:${dbPass}@devhouse.ph1ih.mongodb.net/?retryWrites=true&w=majority&appName=DevHouse`

class App {

    constructor() {
        this.server = express()

        mongoose.connect(dbConnect, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }
}


const app = new App().server;
export default app;