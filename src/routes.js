const express = require("express");

const authMiddleware = require("./middleware/authorization");
// const uploadQuestion = require("./middleware/uploadSingleImage");

const studentController = require("./controllers/students");
const studentImageController = require("./controllers/studentsImages");
const questionController = require("./controllers/questions");
const answersController = require("./controllers/answers");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");
const categoriesController = require("./controllers/categories");

// Import das validações
const validationStudents = require("./validations/validationStudents");
const validationQuestions = require("./validations/validationQuestions");
const validationAnswers = require("./validations/validationAnswers");
const uploadFirebase = require("./services/uploadFirebase");
const uploadSingleImage = require("./middleware/uploadSingleImage");

const routes = express.Router();


/* Configuração do multer. Dizemos como guardaremos(diskStorage) a imagem e aonde(pasta uploads)
const multer = Multer();*/

/*const upload = multer.single("arquivo");

// Configuração para ver se está funcionando
routes.post("/upload", (req, res) => {

    const handleError = (error) => {
        if (error) {
            res.status(404).send({ error: "Arquivo inválido!" });
        }

        console.log(req.file);

        res.send(req.file);
    }

    upload(req, res, handleError);
});

// Configuração da rota*/

// Rotas públicas
routes.post("/sessions", sessionController.store);
routes.post("/students", studentController.store);


routes.use(authMiddleware); //esta rota pede o token


// Rotas privadas

// Rotas de estudantes

// routes.post(
//     "/students",
//     uploadQuestion,
//     validationStudents.create,
//     studentController.store
// );

routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);
routes.post(
    "/students/:id/images", 
    uploadSingleImage, 
    uploadFirebase, 
    studentImageController.store
);


// Rotas de perguntas
routes.get("/questions", validationQuestions.index, questionController.index);
routes.post(
    "/questions", 
    uploadSingleImage,
    uploadFirebase,
    validationQuestions.create,
    questionController.store
);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);


// Rotas de respostas
routes.post(
    "/questions/:id/answers",
    validationAnswers.create,
    answersController.store
);


// Rotas do feed
routes.get("/feed", feedController.index);

// Rotas das categorias
routes.get("/categories", categoriesController.index);


module.exports = routes;