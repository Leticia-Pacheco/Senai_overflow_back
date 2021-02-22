const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

// Import dos models
const Student = require("../models/Student");
const Question = require("../models/Question");
const Category = require("../models/Category");
const Answer = require("../models/Answer");

const conexao = new Sequelize(dbConfig.url, dbConfig.config);

// Inicializa os models
Student.init(conexao);
Question.init(conexao);
Category.init(conexao);
Answer.init(conexao);


// Inicializa os relacionamentos
Student.associate(conexao.models);
Question.associate(conexao.models);
Category.associate(conexao.models);
Answer.associate(conexao.models);


// for (let assoc of Object.keys(Category.associations)) {
//     for (let accessor of Object.keys(Category.associations[assoc].accessors)) {
//         console.log(Category.name + '.' + Category.associations[assoc].accessors[accessor] + '()');
//     }
// }