const db = {
    "users": [
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
}


export default db