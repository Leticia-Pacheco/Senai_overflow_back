// Import dos esquemas do celebrate
const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {

    // O pattern serve para definir quais os caracteres que podem ser usados na requisição
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            ra: Joi.string().required().length(8).pattern(/^[0-9]+$/),
            name: Joi.string().required().min(3).max(255),
            email: Joi.string().required().min(8).max(255).email(),
            password: Joi.string().required().min(4).max(255)
        }),

        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
        }).unknown()
    }),
}