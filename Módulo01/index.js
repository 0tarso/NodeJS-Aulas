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





//Request Body = parâmetro passado no corpo da req
//Ex: Body = {nome: 'John', idade: '29'}
const cursos = ['NodeJS', 'Javascript', 'React', 'CSS']

//Montando um CRUD

//Read
server.get('/cursos', (req, res) => {
    return res.json(cursos)
})

server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const curso = cursos[index]

    return res.json({
        cursoID: `Id do curso é ${curso}`
    })
})


//Create
server.post('/cursos', (req, res) => {
    const { name } = req.body

    cursos.push(name)

    return res.json(cursos)
})


//Update
server.put('/cursos/:index', (req, res) => {
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

