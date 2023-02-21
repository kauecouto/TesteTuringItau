import AuthUserService from "./AuthUserService"
import db from "../data/data"
import User from "../models/User"
import { z } from "zod"

type user = z.infer<typeof User.userSchema>
const authUserService = new AuthUserService()


describe('AuthUserService', () => {
    let mockUser: user
    beforeEach(() => {
        jest.resetAllMocks()
        mockUser = { 
            "id": "1",
            "name": "Teste Test",
            "email" : "teste@test.com",
            "password": "Test@1234",
            "agency": "0000",
            "account": "00000-0",
            "saldo": 0,
            "transfers" : []
        }
        
    })

    it(`Dado á chamada do método "validUser", 
    quando encontrado o usuário no banco,
    deve retornar um array com o objeto do usuário.`, () => {
        jest.spyOn(db.users, 'filter').mockReturnValue([mockUser]);
        const result = authUserService.validUser({email: mockUser.email, password: mockUser.password});
        expect(result).toEqual([mockUser]);
    })

    it(`Dado á chamada do método "validUser",
    quando não encontrado um usuário no banco,
    deve retornar um array vázio.`, () => {

        const result = authUserService.validUser({email: mockUser.email, password: mockUser.password});
        expect(result).toEqual([]);
    })
})