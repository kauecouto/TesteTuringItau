import { util, z } from "zod"
import db from "../data/data"
import Transfer from "../models/Transfer"
import User from "../models/User"
import BankTransferService from "./BankTransferService"

const bankTransferService = new BankTransferService()

type user = z.infer<typeof User.userSchema>
type transfer = z.infer<typeof Transfer.transferBank>

describe('BankTransferService', () => {
    let mockTransfer: transfer
    let mockUser: user
    beforeEach(() => {
        jest.resetAllMocks()
        mockTransfer = {
            email: 'test@test.com',
            password: 'Teste@123',
            beneficiaryAgency: '0000',
            beneficiaryAccount: '00000-0',
            value: 0,
            type: 'pix',
        }
        mockUser = { 
            "id": "1",
            "name": "Test Test",
            "email" : "test@test.com",
            "password": "Teste@123",
            "agency": "0000",
            "account": "00000-0",
            "saldo": 0,
            "transfers" : []
        }
    })
    it(`Dado á chamada do método "validTypeTransfer",
    quando "body.value" for maior que 5000 e o "body.type" for igual á 'pix',
    deve retornar 'pix'.`, () => {
        mockTransfer['value'] = 6000
        mockTransfer['type'] = 'pix' 
        expect(bankTransferService.validTypeTransfer(mockTransfer)).toEqual('pix')
    })

    it(`Dado á chamada do método "validTypeTransfer",
    quando "body.value" for menor que 5000 ou menor 10000 e o "body.type" for igual á 'ted',
    deve retornar 'ted'.`, () => {
        mockTransfer['value'] = 4000
        mockTransfer['type'] = 'ted' 
        expect(bankTransferService.validTypeTransfer(mockTransfer)).toEqual('ted')
        mockTransfer['value'] = 11000
        mockTransfer['type'] = 'ted' 
        expect(bankTransferService.validTypeTransfer(mockTransfer)).toEqual('ted')
    })

    it(`Dado á chamada do método "validTypeTransfer",
    quando "body.value" for menor que 10000 e o "body.type" for igual á 'doc',
    deve retornar 'doc'.`, () => {
        mockTransfer['value'] = 9000
        mockTransfer['type'] = 'doc' 
        expect(bankTransferService.validTypeTransfer(mockTransfer)).toEqual('doc')
    })

    it(`Dado á chamada do método "validTransfer",
    quando os dados da conta do emissor e do receptor forem íguais,
    deve retornar true.`, () => {
        expect(bankTransferService.validTransfer([mockUser], mockTransfer)).toBe(true)
    })

    it(`Dado á chamada do método "validTransfer",
    quando o valor do paramêtro "usersAutheticated" for undefined,
    deve retornar false.`, () => {
        expect(bankTransferService.validTransfer([], mockTransfer)).toBe(false)
    })

    it(`Dado á chamada do método "validAccount",
    quando encontrado uma conta e agência compativel com os paramêntros,
    deve retornar um array com um objeto com os dados da conta.`, () => {
        jest.spyOn(db.users, 'filter').mockReturnValue([mockUser])
        expect(bankTransferService.validAccount(mockTransfer)).toEqual([mockUser])
    })

    it(`Dado á chamada do método "validAccount",
    quando não encontrado uma conta e agência compativel com os paramêntros,
    deve retornar um array vázio.`, () => {
        jest.spyOn(db.users, 'filter').mockReturnValue([])
        expect(bankTransferService.validAccount(mockTransfer)).toEqual([])
    })

    it(`Dado á chamada do método "formatDate",
    quando os valores da date forem menores que 10,
    deve retornar um objeto com os dados formatados no modelo "00".`, () => {
        jest.useFakeTimers().setSystemTime(new Date(2023, 0, 1, 1));
        const mockDate = {
            date: '01',
            month: '01',
            hour: '01',
            minutes: '00',
            seconds: '00'
        }
        const result = bankTransferService.formatDate()
        expect(result).toEqual(mockDate)
    })

    it(`Dado á chamada do método "formatDate", 
    quando os valores da date forem maiores que 10,
    deve retornar um objeto com os dados sem formatação.`, () => {
        jest.useFakeTimers().setSystemTime(new Date(2023, 10, 11, 11));
        const mockDate = {
            date: '11',
            month: '11',
            hour: '11',
            minutes: '00',
            seconds: '00'
        }
        const result = bankTransferService.formatDate()
        expect(result).toEqual(mockDate)
    })

    it(`Dado á chamada do método "createRecordTransfer",
    deve fazer um push no "user.transfers" do registro criado e retornar o "user".`, () => {
        jest.useFakeTimers().setSystemTime(new Date(2023, 10, 11, 11));
        const mockDate = bankTransferService.formatDate()
        const mockRecord = mockUser = { 
            "id": "1",
            "name": "Test Test",
            "email" : "test@test.com",
            "password": "Teste@123",
            "agency": "0000",
            "account": "00000-0",
            "saldo": 0,
            "transfers" : [
                {
                    "id": '1',
                    "value": 0,
                    "date": '11/11/2023',
                    "hour": '11:00:00',
                    "type": 'pix',
                    "operation": 'Crédito'
                } 
            ]
        }
        expect(bankTransferService.createRecordTransfer(mockUser,mockTransfer,mockDate,'Crédito')).toEqual(mockRecord)
        
    })
})