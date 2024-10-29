const express = require("express")

const server = express()

//para receber json nos métodos
server.use(express.json())

//porta que ficará disponível para o servidor
server.listen(3000)


//Query params = parâmetro passados para a url
//Ex: ?primeiroOla=Olá,Node!
server.get('/curso', (req, res) => {

    //o parâmetro 'nome' vem da query que será inserida
    //pelo usuário/front
    const nome = req.query.nome;

    return res.json({
        primeiroOla: `Olá, ${nome}!`
    })
})



//Route paramsss = parâmetro passado para a rota
//Ex: /curso/a2b21
// server.get('/curso/:id', (req, res) => {

//     const id = req.params.id;

//     return res.json({
//         curso: `Id do curso é ${id}`
//     })
// })




//Montando um CRUD ---------------->>
// Create, Read, Update, Delete

const cursos = ['NodeJS', 'Javascript', 'React', 'CSS']

//Middleware Global --->>> Qualquer requisição irá passar por ele
server.use((req, res, next) => {
    console.log("--------------------------------")
    console.log("Requisição ao server")
    console.log(`URL chamada: ${req.url}`)

    //next() para prosseguir com a requisição
    return next()
})

//Middleware para checar se o parâmetro "name" foi passado corretamente
const checkCurso = (req, res, next) => {
    console.log("Checando nome do curso")

    if (!req.body.name) {
        return res.status(400).json({ error: "Nome do curso é obrigatório" })
    }

    return next();
}

//Middleware para checar se o parâmetro "index" foi passado corretamente
const checkIndexCurso = (req, res, next) => {
    const curso = cursos[req.params.index];
    console.log("Checando index do curso")
    if (!curso) {
        return res.status(400).json({ error: "O curso não existe" })
    }

    return next()
}

//Métodos do CRUD
//Read
server.get('/cursos', (req, res) => {
    return res.json(cursos)
})

server.get('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;
    const curso = cursos[index]

    return res.json({
        cursoID: `Id do curso é ${curso}`
    })
})


//Create
//usando middleware para checagem do parâmetro passado
server.post('/cursos', checkCurso, (req, res) => {
    const { name } = req.body

    cursos.push(name)

    return res.json(cursos)
})


//Update
server.put('/cursos/:index', checkIndexCurso, checkCurso, (req, res) => {
    const { index } = req.params
    const { name } = req.body

    cursos[index] = name

    return res.json(cursos)

})


//Delete
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params

    cursos.splice(index, 1)

    return res.json(cursos)
})

