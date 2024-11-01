import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload.cjs'

import SessionController from './controllers/SessionController.js'
import HouseController from './controllers/HouseController.js'
import DashboardController from './controllers/DashboardController.js'
import ReserveController from './controllers/ReserveController.js'

const routes = new Router();
const upload = multer(uploadConfig);


routes.post('/sessions', SessionController.store);


//mandamos somente um arquivo 'single'
//e o nome do campo que está sendo enviado pelo model
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses', HouseController.destroy);


routes.get('/dashboard', DashboardController.show);


routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/delete', ReserveController.destroy);


export default routes