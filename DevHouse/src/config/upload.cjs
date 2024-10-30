//ext do arquivo mudada para .cjs
//assim usamos commonJS nas importações e exportações
//facilitando o uso do path


const multer = require('multer')
const path = require('path')


//config de onde e como será armazenado o arquivo que irá ser feito upload
module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {

            //extensão da imagem
            const ext = path.extname(file.originalname);

            //nome do arquivo e extensão
            const name = path.basename(file.originalname, ext)


            //func chamada ao finalizar as configs
            //1° para tratar erros
            //2° montamos o nome do arquivo a ser salvo
            cb(null, `${name}-${Date.now()}${ext}`)
        }
    })
}
