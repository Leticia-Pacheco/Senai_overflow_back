const {Model, DataTypes} = require("sequelize");

class Student extends Model {
    // Inicialização dos campos da tabela
    static init(sequelize){
        super.init(
            {
                ra: DataTypes.STRING,
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                image: DataTypes.STRING,
            },
            {
                sequelize, 
            }
        );
    }

    // Configuração de relacionamentos
    // Devemos fazer o relacionamento tanto no arquivo Aluno quanto no Pergunta
    static associate(models){
        this.hasMany(models.Question);
        this.hasMany(models.Answer);
    }
}

module.exports = Student;