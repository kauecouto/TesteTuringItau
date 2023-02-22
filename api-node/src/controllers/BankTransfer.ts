import { Request, Response } from 'express';
import { z } from 'zod';

import db from '../data/data';
import Transfer from '../models/Transfer';
import User from '../models/User';
import AuthUserService from '../services/AuthUserService';
import BankTransferService from '../services/BankTransferService';

type user = z.infer<typeof User.userSchema>
const authUserService = new AuthUserService()
const bankTransferService = new BankTransferService()

class BankTransfer {
    public sendBankTransfer(req: Request, res: Response){
        const body = Transfer.transferBank.parse(req.body)
        let user!: user 
        let beneficiaryUser!: user 

        const errType = bankTransferService.validTypeTransfer(body) 
        if(errType == 'pix'){
            return res.status(400).json({
            message: "Sua transferência não foi completada, pois transferências PIX tem um valor limite de R$5.000,00"
        })}
        if(errType == 'ted'){
            return res.status(400).json({
            message: "Sua transferência não foi completada, pois transferências TED tem um valor mínimo de R$5.000,00 e máximo de R$10.000,00"
        })}
        if(errType == 'doc'){
            return res.status(400).json({
            message: "Sua transferência não foi completada, pois transferências DOC tem um valor mínimo de R$10.000,00"
        })}

        const usersAuthenticated = authUserService.validUser(body)        
        user = usersAuthenticated[0]

        if(bankTransferService.validTransfer(usersAuthenticated, body)){
            return res.status(400).json({
                message: "Sua transferência não foi completada pois, não é possivel realizar uma transferência para a sua própria conta."
            })
        }
        if(bankTransferService.validTransfer(usersAuthenticated, body) == false){
            return res.status(400).json({
                message: "Sua transferência não foi completada pois a senha informada está incorreta."
            })
        }

        const checkAccount = bankTransferService.validAccount(body)
        if(checkAccount.length > 0){
            beneficiaryUser = checkAccount[0]
        }else{
            return res.status(400).json({
                message: "Sua transferência não foi completada pois a agencia e conta informada não existem."
            })
        }

        if(user !== undefined && beneficiaryUser !== undefined && user.saldo >= body.value){
            user.saldo -= body.value
            beneficiaryUser.saldo += body.value
            const date = bankTransferService.formatDate()

            db.users[Number(user.id) - 1] = bankTransferService.createRecordTransfer(user,body,date,'Débito')
            db.users[Number(beneficiaryUser.id) - 1] = bankTransferService.createRecordTransfer(beneficiaryUser,body,date,'Crédito')
            
            return res.status(201).json({
                "message": "Sua transferência foi realizada com sucesso!",
                "saldo_emissor": `R$ ${user.saldo.toFixed(2)}`,
                "saldo_receptor": `R$ ${beneficiaryUser.saldo.toFixed(2)}`
            })
        }
    }    
}

export default new BankTransfer()
