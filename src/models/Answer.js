const {Model, DataTypes} = require("sequelize");

class Answer extends Model {
    // Inicialização dos campos da tabela
    static init(sequelize){
        super.init(
            // Aqui no init informamos o que será informado na hora de editar algo, adicionar algo e afins. 
            {
                description: DataTypes.TEXT,
                student_id: DataTypes.INTEGER
            },
            {
                sequelize,
            }
        );
    }

    static associate(models){
        this.belongsTo(models.Question);
        this.belongsTo(models.Student);
    }
}

module.exports = Answer;