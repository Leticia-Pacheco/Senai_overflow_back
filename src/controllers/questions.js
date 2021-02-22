const { Op } = require("sequelize");
const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {
  async index(req, res) {
    const { search } = req.query;

    try {
      const questions = await Question.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "image",
          "gist",
          "created_at",
          "StudentId",
        ],
        include: [
          {
            association: "Student",
            attributes: ["id", "name", "image"],
          },
          {
            association: "Categories",
            attributes: ["id", "description"],
            through: { attributes: [] },
          },
          {
            association: "Answers",
            attributes: ["id", "description", "created_at"],
            include: {
              association: "Student",
              attributes: ["id", "name", "image"],
            },
          },
        ],
        order: [["created_at", "DESC"]],
        where: {
          [Op.or]: [
            {
              title: {
                [Op.substring]: search,
              },
            },
            {
              description: {
                [Op.substring]: search,
              },
            },
          ],
        },
      });

      res.send(questions);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    const { title, description, gist, categories } = req.body;

    const categoriesArr = categories.split(","); //Criamos essa constante para definir que as categorias são um array (já que tivemos que mudar de Joi.array() para Joi.string()).

    const { studentId } = req;

    try {
      // busca o aluno pelo ID
      let student = await Student.findByPk(studentId);

      // Se o aluno não existir, retorna um erro
      if (!student)
        return res.status(404).send({ error: "Aluno não encontrado!" });

      // Crio a pergunta para o aluno se ele existir
      let question = await student.createQuestion({
        title,
        description,
        image: req.file ? req.file.firebaseUrl : null,
        gist,
      });

      await question.addCategories(categoriesArr);

      // Retorno status de sucesso
      res.status(201).send({
        // Aqui devolvemos os dados da questão
        id: question.id,
        title: question.title,
        description: question.description,
        created_at: question.created_at,
        gist: question.gist,
        // Aqui devolvemos a imagem
        image: req.file ? req.file.firebaseUrl : null,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async find(req, res) {
    const questionId = req.params.id;

    let question = await Question.findByPk(questionId);

    try {
      if (!question)
        return res.status(204).send({ error: "Pergunta não encontrada!" });

      delete question;

      res.send(question);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async update(req, res) {
    const questionId = req.params.id;

    const { title, description } = req.body;

    const { studentId } = req;

    try {
      const question = await Question.findByPk(questionId);

      if (!question) 
        return res.status(404).send({ erro: "Questão não encontrada!!" });

      if (question.studentId != studentId)
        return res.status(404).send({ error: "Não autorizado!!" });

      question.title = title;
      question.description = description;

      question.save();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const questionId = req.params.id;

    // Headers porque está como chave estrangeira
    // const studentId = req.headers.authorization; --> exemplo de requisição da autorização
    const { studentId } = req;

    try {
      const question = await Question.findOne({
        where: {
          id: questionId,
          student_id: studentId,
        },
      });

      if (!question) res.status(404).send({ error: "Questão não encontrada!!" });

      await question.destroy();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};
