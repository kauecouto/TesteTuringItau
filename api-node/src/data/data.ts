const db = {
    "users": [
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
}


export default db