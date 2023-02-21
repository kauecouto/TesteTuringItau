import { z } from 'zod';

import db from '../data/data';
import Transfer from '../models/Transfer';
import User from '../models/User';


type user = z.infer<typeof User.userSchema>
type transfer = z.infer<typeof Transfer.transferBank>

class BankTransferService {
    public validTypeTransfer(body: transfer){
        if(body.value > 5000 && body.type === 'pix'){
            return 'pix'
        }
        if((body.value < 5000 || body.value > 10000) && body.type === 'ted'){
            return 'ted'
        }
        if(body.value < 10000 && body.type === 'doc'){
            return 'doc'
        }
    }
    
    public validTransfer(usersAuthenticated: user[], body: transfer){
        if(usersAuthenticated.length > 0 && usersAuthenticated[0].agency == body.beneficiaryAgency && usersAuthenticated[0].account == body.beneficiaryAccount){
            return true
        }else if(usersAuthenticated[0] === undefined){
            return false
        }
    }

    public validAccount(body: transfer){
        return db.users.filter(user => user.agency === body.beneficiaryAgency && user.account === body.beneficiaryAccount)
    }

    public formatDate(): date {
        return {
            date: new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`,
            month:  new Date().getMonth() + 1 > 9 ? `${new Date().getMonth() + 1}` : `0${new Date().getMonth() + 1}`,
            hour: new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`,
            minutes: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`,
            seconds: new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : `${new Date().getSeconds()}`
        }
    }

    public createRecordTransfer(user: user, body: transfer, date: date, type: string){
        user.transfers.push({
            "id": `${user.transfers.length + 1}`,
            "value": body.value,
            "date": `${date.date}/${date.month}/${new Date().getFullYear()}`,
            "hour": `${date.hour}:${date.minutes}:${date.seconds}`,
            "type": `${body.type}`,
            "operation": `${type}`
        })
        return user
    }
}

export default BankTransferService

type date = {
    date: string,
    month: string,
    hour: string,
    minutes: string,
    seconds: string
}