const Question = require("../models/Question");
const Answer = require("../models/Answer");

module.exports = {
    
    async index(req, res){
        try{

            const answers = await Answer.findAll();

            res.send(answers);

        } catch (error) {

            console.log(error);

            res.status(500).send({error});
        }
    },

    async store(req, res){
        const questionId = req.params.id;
        
        const { studentId } = req;
        
        const { description } = req.body;

        try{

            //Busca a pergunta pelo ID, verificando se a questão existe para fazer a resposta
            const question = await Question.findByPk(questionId);

            // Se a pergunta não existir, retorna um erro
            if(!question)
                return res.status(404).send({ error: "Pergunta não encontrada!" });

            // Se existir, criar a resposta para a pergunta com o aluno do token
            const answer = await question.createAnswer({ description, student_id: studentId });

            // Responde com status de sucesso
            res.status(201).send(answer);

        } catch (error) {
            console.log(error);
            res.status(500).send({error});
        }
    },

    find(req, res){

    },

    update(req, res){

    },

    delete(req, res){

    }
}