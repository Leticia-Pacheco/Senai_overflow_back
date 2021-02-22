// Import dos esquemas do celebrate
const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
    //podemos usar o lenght() para definir um número fixo, caso não tenha um número mínimo e um máximo
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            description: Joi.string().required().min(10).max(255)
        }),

        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    })
}