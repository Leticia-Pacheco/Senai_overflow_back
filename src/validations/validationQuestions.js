// Import dos esquemas do celebrate
const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {

    index: celebrate({
        [Segments.QUERY]: Joi.object().keys({
            search: Joi.string().min(3).required(),
        }),
    }),

    //podemos usar o lenght() para definir um número fixo, caso não tenha um número mínimo e um máximo
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required().min(5).max(255),
            description: Joi.string().required().min(10).max(255),
            gist: Joi.string().min(20).max(255),
            categories: Joi.string().required() //mudamos de Joi.array() para Joi.string()
        }),

        /*[Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
        }).unknown()*/
    }),
};