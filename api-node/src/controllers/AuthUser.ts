
import { Request, Response } from 'express'
import AuthUserService from '../services/AuthUserService'
import  db  from '../data/data'
import User from '../models/User'

const authUserService = new AuthUserService()

class AuthUser {

    public validateUser(req: Request, res: Response){
        const body = User.userAuth.parse(req.body)

        const users = authUserService.validUser(body)
        if(users.length > 0){
            return res.status(200).json(users[0])
        }

        return res.status(400).send({error:'Esse usuário não existe!'})
    }

    public createUser(req: Request, res: Response){
        const body = User.newUserAuth.parse(req.body)
        
        const user = authUserService.validUser(body)
        if(user.length > 0){
            return res.status(400).send({error: 'Endereço de email já cadastrado.'})
        }

        const newUser = {
            id: `${db.users.length + 1}`,
            name: body.name,
            email: body.email,
            password: body.password,
            agency: `${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`,
            account: `${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}-${Math.floor(Math.random() * 9)}`,
            saldo: 0.00,
            transfers: []
        }

        db.users.push(newUser)
        return res.json(newUser)   
    }

    public getUserByID(req: Request, res: Response){
        const id = req.params.id
        if(!db.users[Number(id)]){
            return res.status(404).json({ error: 'Não encontramos o usuário informado.'})
        }
        return res.status(200).json(db.users[Number(id)])
    }

}

export default new AuthUser()