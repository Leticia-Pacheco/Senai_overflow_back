const { index } = require("./questions");
const Question = require("../models/Question");

module.exports = {
  async index(req, res) {
    const { page } = req.query;

    try {
      const totalQuestion = await Question.count();

      const feed = await Question.findAll({
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
            association: "Student", //associação com o modulo Student
            attributes: ["id", "name", "image"], //quero que traga o id e o nome do aluno que publicou
          },
          {
            association: "Categories",
            through: { attributes: [] },
            attributes: ["id", "description"],
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
        limit: page ? [(page - 1) * 5, 5] : undefined, //limit: [5, 5] --> É como se fosse o offset, mas reduzido.
        //offset: 5 --> Serve para, quando as 5 postagens acabarem, puxar as outras 5 e assim por diante.
      });

      res.header("X-Total-Count", totalQuestion);
      res.header("Access-Control-Expose-Headers", "X-Total-Count");

      setTimeout(() => {
        res.send(feed);
      }, 1000);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};