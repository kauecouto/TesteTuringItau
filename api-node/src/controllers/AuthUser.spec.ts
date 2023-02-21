const request = require('supertest');
const express = require('express');
import { z } from 'zod';
import app from '../app';
import db from '../data/data';
import User from '../models/User';
import AuthUserService from '../services/AuthUserService';
import AuthUser from './AuthUser';

type user = z.infer<typeof User.userSchema>

const authUserService = new AuthUserService()
describe('AuthUser', () => {
    let mockUser: user
    beforeEach(() => {
        db.users = [
            {
                "id": "1",
                "name": "Test Test",
                "email" : "test@test.com",
                "password": "Teste@123",
                "agency": "0000",
                "account": "00000-0",
                "saldo": 0,
                "transfers" : []
            }
        ]

        jest.resetAllMocks()
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
    
    it(`Dado á chamada da rota "/auth",
    quando encontrar um usuário autenticado,
    deve retornar statusCode "200" e json com os dados.`, async() => {
        const response = await request(app).post("/auth").send({
            email: 'test@test.com',
            password: 'Teste@123'
        })
        expect(response.status).toEqual(200)
        expect(response.body).toEqual(mockUser) 
    })
    
    it(`Dado á chamada da rota "/auth", 
    quando o usuário não estiver autenticado, 
    deve retornar statusCode "400" e json com o erro.`, async() => {
        const response = await request(app).post("/auth").send({
            email: 'joao@test.com',
            password: 'JoaoTest@123'
        })
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({error:'Esse usuário não existe!'}) 
    })

    it(`Dado á chamada do método "createUser", 
    caso tenha algum usuário cadastrado com os dados informados, 
    deve retornar statusCode "400" e json com o erro.`, async() => {
        const response = await request(app).post("/register").send({
            name: 'joao test',
            email: 'test@test.com',
            password: 'Teste@123'
        })
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({error: 'Endereço de email já cadastrado.'}) 
    })

    it(`Dado á chamada do método "createUser" quando não encontrar nenhum usuário com os dados informados, 
    deve criar no "banco de dados" um novo usuário e retornar statusCode "201" com json tendo os dados do user criado.`, async() => {
        const response = await request(app).post("/register").send({
            name:'joao teste',
            email: 'joao@test.com',
            password: 'JoaoTest@123'
        })
        expect(response.status).toEqual(200) 
    })

    it(`Dado á chamada do método "getUserByID", quando não for encontrado um usuário com o index informado, deve retornar statusCode "404"  e json com o erro.`, async() => {
        const response = await request(app).get("/user/1000")
        expect(response.status).toEqual(404)
        expect(response.body).toEqual({error: 'Não encontramos o usuário informado.'})
    })

    it(`Dado á chamada do método "getUserByID", quando encontrado um usuário com o index informado, deve retornar statusCode "200"  e json com os dados do usuário.`, async() => {
        const response = await request(app).get("/user/0")
        expect(response.status).toEqual(200)
        expect(response.body).toEqual(mockUser) 
    })

    afterAll(() => {
        db.users = [
            {
                "id": "1",
                "name": "Test Test",
                "email" : "test@test.com",
                "password": "Teste@123",
                "agency": "0000",
                "account": "00000-0",
                "saldo": 0,
                "transfers" : []
            },
            { 
                "id": "2",
                "name": "Kauê Couto",
                "email" : "kauecouto@gmail.com",
                "password": "Senha@123",
                "agency": "2255",
                "account": "11233-2",
                "saldo": 18000.00,
                "transfers" : [
                    {
                        "id": "1",
                        "value": 59.90,
                        "date": "14/02/2023",
                        "hour": "14:20:06",
                        "type": "pix",
                        "operation": "Crédito"
                    },
                    {
                        "id": "2",
                        "value": 29.90,
                        "date": "14/02/2023",
                        "hour": "14:40:55",
                        "type": "pix",
                        "operation": "Débito"
                    }
                ]
            },
            { 
                "id": "3",
                "name": "Isabella Ferro",
                "email" : "isabellaferro@outlook.com",
                "password": "Senha@123",
                "agency": "1122",
                "account": "22333-5",
                "saldo": 0.00,
                "transfers" : [
                    {
                        "id": "1",
                        "value": 29.90,
                        "date": "14/02/2023",
                        "hour": "14:20:08",
                        "type": "pix",
                        "operation": "Débito"
                    },
                    {
                        "id": "2",
                        "value": 109.90,
                        "date": "14/02/2023",
                        "hour": "14:40:40",
                        "type": "pix",
                        "operation": "Débito"
                    }
                ]
            }
        ]
    })
})