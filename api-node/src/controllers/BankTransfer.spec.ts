const request = require('supertest');
const express = require('express');
import { z } from 'zod';
import app from '../app';
import db from '../data/data';
import User from '../models/User';
import AuthUserService from '../services/AuthUserService';
import AuthUser from './AuthUser';
import Transfer from '../models/Transfer'

type transfer = z.infer<typeof Transfer.transferBank>

describe('BankTransfer', () => {
    let mockTransfer: transfer
    beforeEach(() => {
        db.users = [
            {
                "id": "1",
                "name": "Test Test",
                "email" : "test@test.com",
                "password": "Teste@123",
                "agency": "0000",
                "account": "00000-0",
                "saldo": 20000,
                "transfers" : []
            },
            {
                "id": "2",
                "name": "Testing",
                "email" : "testing@test.com",
                "password": "Teste@123",
                "agency": "1111",
                "account": "11111-1",
                "saldo": 0,
                "transfers" : []
            }
        ]
        mockTransfer = {
            "email": 'test@test.com',
            "password": 'Teste@123',
            "beneficiaryAgency": '1111',
            "beneficiaryAccount": '11111-1',
            "value": 10,
            "type": 'pix'
        }
    })
    afterAll(() => {
        db.users = [
            { 
                "id": "1",
                "name": "Kauê Couto",
                "email" : "kauecouto@gmail.com",
                "password": "Senha@123",
                "agency": "2255",
                "account": "11233-2",
                "saldo": 50000.00,
                "transfers" : [
                    {
                        "id": "1",
                        "value": 50000.00,
                        "date": "14/02/2023",
                        "hour": "14:20:06",
                        "type": "pix",
                        "operation": "Crédito"
                    }
                ]
            },
            { 
                "id": "2",
                "name": "Isabella Ferro",
                "email" : "isabellaferro@gmail.com",
                "password": "Senha@123",
                "agency": "1122",
                "account": "22333-5",
                "saldo": 0.00,
                "transfers" : []
            }
        ]
    })

    it(`Dado á chamada do método "sendBankTransfer", 
    quando valor da transferência for maior que R$5000 e o tipo for 'pix', 
    deve retornar statusCode "400" e json com o erro..`, async() => {
        mockTransfer['value'] = 6000
        const response = await request(app).post("/transfer").send(mockTransfer)
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({
            message: "Sua transferência não foi completada, pois transferências PIX tem um valor limite de R$5.000,00"
        })
    })

    it(`Dado á chamada do método "sendBankTransfer", 
    quando valor da transferência for menor que R$5000 e maior que R$1000 e o tipo for 'ted', 
    deve retornar statusCode "400"  e json com o erro.`, async () => {
        mockTransfer['value'] = 4000
        mockTransfer['type'] = 'ted'
        const response = await request(app).post("/transfer").send(mockTransfer)
        mockTransfer['value'] = 11000
        const responseTwo = await request(app).post("/transfer").send(mockTransfer)
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({
            message: "Sua transferência não foi completada, pois transferências TED tem um valor mínimo de R$5.000,00 e máximo de R$10.000,00"
        })
        expect(responseTwo.status).toEqual(400)
        expect(responseTwo.body).toEqual({
            message: "Sua transferência não foi completada, pois transferências TED tem um valor mínimo de R$5.000,00 e máximo de R$10.000,00"
        })
    })

    it(`Dado á chamada do método "sendBankTransfer", 
    quando valor da transferência for menor que 10000 e o tipo for 'doc', 
    deve retornar statusCode "400" e json com o erro.`, async() => {
        mockTransfer['value'] = 4000
        mockTransfer['type'] = 'doc'
        const response = await request(app).post("/transfer").send(mockTransfer)
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({
            message: "Sua transferência não foi completada, pois transferências DOC tem um valor mínimo de R$10.000,00"
        })
    })

    it(`Dado á chamada do método "sendBankTransfer", 
    quando a agência e conta do emissor for a mesma que a do receptor, 
    deve retornar statusCode "400" e json com o erro.`, async() => {
        mockTransfer['beneficiaryAccount'] = '00000-0'
        mockTransfer['beneficiaryAgency'] = '0000'
        const response = await request(app).post("/transfer").send(mockTransfer)
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({
            message: "Sua transferência não foi completada pois, não é possivel realizar uma transferência para a sua própria conta."
        })
    })

    it(`Dado á chamada do método "sendBankTransfer", 
    quando a senha estiver incorreta, 
    deve retornar statusCode "400" e json com o erro.`, async() => {
        mockTransfer['password'] = 'Test@1234'
        const response = await request(app).post("/transfer").send(mockTransfer)
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({
            message: "Sua transferência não foi completada pois a senha informada está incorreta."
        })
    })

    it(`Dado á chamada do método "sendBankTransfer", 
    caso a agência e conta informada não existam, 
    deve retornar statusCode "400" e json com o erro.`, async() => {
        mockTransfer['beneficiaryAccount'] = '99999-9'
        mockTransfer['beneficiaryAgency'] = '9999'
        const response = await request(app).post("/transfer").send(mockTransfer)
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({
            message: "Sua transferência não foi completada pois a agencia e conta informada não existem."
        })
    })

    it(`Dado á chamada do método "sendBankTransfer", quando todos os dados estiverem validados, deve fazer a operação de transferência e retornar statusCode "201" e json com uma mensagem de sucesso.`, async() => {
        const response = await request(app).post("/transfer").send(mockTransfer)
        expect(response.status).toEqual(201)
        expect(response.body).toEqual({
            message: "Sua transferência foi realizada com sucesso!",
            saldo_emissor: "R$ 19990.00",
            saldo_receptor: "R$ 10.00"
        })
    })
})