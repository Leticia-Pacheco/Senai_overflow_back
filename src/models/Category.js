const {Model, DataTypes} = require("sequelize");

class Category extends Model {
    /*
     * Inicialização dos campos da tabela
     * aqui configuramos os campos da tabela
     * os campos automáticos não precisam ser declarados
     */
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING
            },
            {
                sequelize,
            }
        );
    }

    // Configuração de relacionamentos
    // Devemos fazer o relacionamento tanto no arquivo Aluno quanto no Pergunta
    static associate(models){
        this.belongsToMany(models.Question, {through: "question_categories"});
    }
}

module.exports = Category;