const {Model, DataTypes} = require("sequelize");

class Question extends Model {
    // Inicialização dos campos da tabela
    static init(sequelize) {
        super.init(
            {
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                image: DataTypes.STRING,
                gist: DataTypes.STRING
            },
            {
                sequelize, 
            }
        );
    }

    // Configuração de relacionamentos
    static associate(models){
        // this --> FALANDO SOBRE ESSA CLASSE(PERGUNTA)
        // belongsTo --> PERTENCE A |
        // models.Aluno         <----
        this.belongsTo(models.Student);
        this.belongsToMany(models.Category, {through: "question_categories"});
        this.hasMany(models.Answer);
    }
}

module.exports = Question;