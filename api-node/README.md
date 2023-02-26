<h1>Teste-Estágio-Canais Back-end</h1>

# 📌 Tópicos

<!--ts-->

- [Descricao](#-Descricao)
- [Tecnologias](#-Tecnologias)
- [Tarefas](#-Features)
- [Aplicacao](#-Como-Posso-Rodar-a-Aplicacao?)
  
  <!--te-->

# 📄 Descricao

> A aplicação tem como objetivo principal realizar transferências bancárias como pix, ted e doc.

# Tecnologias

- [TypeScript](https://www.typescriptlang.org)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node](https://nodejs.org/en/)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/pt-BR/) 


# 🎯 Features

<pre>
 ✅ Authenticação de usuário -> '/auth'
 ✅ Registro de novo usuário -> '/register'
 ✅ Transferências -> '/transfer'
 ✅ Busca usuário pelo ID -> '/user/{id}'
</pre>

<h3>🟦 POST:  '/auth'</h3>
<pre>
 requestBody: {
    "email": "email@test.com",
    "password": "Teste@123"
 }

 ("password" deve conter letras maíusculas, minusculas, caracteres especiais e números.)
</pre>
<pre>
 response: {
  ✅ status: 200,
  body: {
      "id": "1",
      "name": "Test Test",
      "email" : "test@test.com",
      "password": "Teste@123",
      "agency": "0000",
      "account": "00000-0",
      "saldo": 30,
      "transfers" : []
  },
  ❌ status: 400,
  body: { error:'Esse usuário não existe!' }
 }
</pre>

<h3>🟦 POST:  '/register'</h3>
<pre>
 requestBody: {
    "name": "Joao da Silva",
    "email": "email@test.com",
    "password": "Teste@123"
 }

 ("password" deve conter letras maíusculas, minusculas, caracteres especiais e números.)
</pre>
<pre>
 response: {
  ✅ status: 201,
  body: {
      "id": "1",
      "name": "Joao da Silva",
      "email" : "test@test.com",
      "password": "Teste@123",
      "agency": "0000",
      "account": "00000-0",
      "saldo": 30,
      "transfers" : []
  },
  ❌ status: 400,
  body: { error: 'Endereço de email já cadastrado.' }
 }
</pre>

<h3>🟦 POST:  '/transfer'</h3>
<pre>
 requestBody: {
    "email" : "test@test.com",
    "password": "Teste@123"
    "beneficiaryAgency": "1111",
    "beneficiaryAccount": "11111-1",
    "value": 10,
    "type": "pix"
 }

 ("password" deve conter letras maíusculas, minusculas, caracteres especiais e números.)
</pre>
<pre>
 response: {
  ✅ status: 201,
  body: {
    "message": "Sua transferência foi realizada com sucesso!",
    "saldo_emissor": "R$ 20.00",
    "saldo_receptor": "R$ 10.00"
  },
  ❌ status: 400,
  body: { 
    "message": "Sua transferência não foi completada, pois não é possivel realizar uma transferência para a sua própria conta." 
  },

  body: { 
    "message": "Sua transferência não foi completada, pois a senha informada está incorreta." 
  },

  body: { 
    "message": "Sua transferência não foi completada, pois a agencia e conta informada não existem."
  },

  body: { 
    "message": "Sua transferência não foi completada, pois transferências PIX tem um valor limite de R$5.000,00"
  },

  body: { 
    "message": "Sua transferência não foi completada, pois transferências TED tem um valor mínimo de R$5.000,00 e máximo de R$10.000,00"
  },

  body: { 
    "message": "Sua transferência não foi completada, pois transferências DOC tem um valor mínimo de R$10.000,00"
  }
 }
</pre>

<h3>🟩 GET:  '/user/{id}'</h3>
<pre>
 response: {
  ✅ status: 201,
  body: {
      "id": "1",
      "name": "Joao da Silva",
      "email" : "test@test.com",
      "password": "Teste@123",
      "agency": "0000",
      "account": "00000-0",
      "saldo": 20,
      "transfers" : [
        {
          "id": "1",
          "value": 10.00,
          "date": "19/02/2023",
          "hour": "14:20:06",
          "type": "pix",
          "operation": "Crédito"
        }
      ]
  },
  ❌ status: 404,
  body: { error: 'Não encontramos o usuário informado.' }
 }
</pre>

# 📑 Como Posso Rodar a Aplicacao?
<h3 style='color: orange'>Deploy:</h3>
disponibilizado em: https://api-node-opal.vercel.app

<br/>
<h3 style='color: orange'>Executar o projeto e acessar ambiente de desenvolvimento:</h3>
<br/>
<p>Executar aplicação</p>
<pre>npm run start</pre>
(disponibilizado em: http://localhost:3333/)

<br/>
<p>Rodar testes</p>
<pre>npm run test</pre> 
