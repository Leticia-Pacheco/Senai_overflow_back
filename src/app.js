// Importa o express
const express = require("express")

// Import dos erros
const { errors } = require("celebrate");

// O cors é um middleware --> serve para decidir se pode ou não ser acessado
const cors = require("cors");

// Para configurar o arquivo
require("dotenv").config();

/* Estamos mostrando o que a variável tem dentro
console.log(process.env.TESTE);*/

// Importa as rotas
const routes = require("./routes");

/* Importa a conexão com o bd ***Quando escrevemos a pasta sem indicar um arquivo específico, automaticamente ele redireciona para o 
index da pasta indicada. */ 
require("./database");

// Cria a aplicação express
const app = express();

app.use(express.json());

app.use(cors());

// Definimos a pasta uploads como pública, servindo arquivos estáticos
app.use("/uploads", express.static("uploads")); 

app.use(routes);

app.use(errors());

module.exports = app;