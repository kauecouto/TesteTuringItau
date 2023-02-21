import Router from "express";

import AuthUser from './controllers/AuthUser'
import BankTransfer from "./controllers/BankTransfer";

const routes = Router()

routes.post('/auth', AuthUser.validateUser)
routes.post('/register', AuthUser.createUser)
routes.post('/transfer',BankTransfer.sendBankTransfer)
routes.get('/user/:id', AuthUser.getUserByID)

export default routes
