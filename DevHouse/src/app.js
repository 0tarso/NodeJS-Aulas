import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes.js'


import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config();
const dbConnect = process.env.MONGO_CONNECT

class App {

    //constructor que ao chamar App, inicia o servidor
    constructor() {
        this.server = express()

        mongoose.connect(dbConnect, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        this.middlewares()
        this.routes()
    }

    //tudo o que passar por .use será executado em cada requisição
    middlewares() {
        this.server.use(
            '/files',
            express.static(join(__dirname, '..', 'uploads'))
        )

        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }
}


const app = new App().server;
export default app;