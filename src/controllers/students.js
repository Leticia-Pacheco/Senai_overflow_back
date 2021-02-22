const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const { generateToken } = require("../utils");

module.exports = {
    // Função que será executada pela rota
    async index(req, res) {
        try {
            const students = await Student.findAll();

            res.send(students); //o send é como se fosse a resposta, então se o mandamos, a função encerra pois a requisição só será respondida uma vez.
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },

    async find(req, res) {
        // Recupera o id do aluno
        const studentId = req.params.id;
        
        // let aluno = await Student.findByPk(alunoId, {
        //     attributes: ["id", "nome", "ra", "email"]
        // }  --> nesse caso, especificamos o que queremos que seja exibido

        try{
            let student = await Student.findByPk(studentId, {
                attributes: ["id", "ra", "name", "email"],
            }); //Aqui mostramos na tela todos os dados do aluno
            // Se aluno não existir, retornar not found(erro 204) com uma mensagem de erro
            if (!student)
                return res.status(404).send({ error: "Aluno não encontrado!" });
    
            res.send(student);
        }catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },

    async store(req, res) {
        // Recebe os dados do body
        const { ra, name, email, password } = req.body;

        try{
            let student = await Student.findOne({  //findOne procura um registro específico, nós que passamos esse parâmetro (pelo where, que no caso, passamos o ra).
                where: {
                    ra: ra,
                },
            });

            if (student)
                return res.status(400).send({ error: "Aluno já cadastrado!" });
        
            // Aqui estamos criptografando a senha
            const passwordCript = bcrypt.hashSync(password);

            // aqui estamos passando a senha criptografada
            student = await Student.create({ 
                ra, 
                name, 
                email, 
                password: passwordCript,
            });

            const token = generateToken({
                studentId: student.id,
                studentName: student.name,
            });

            // Retorna resposta de sucesso
            res.status(201).send({
                student: {
                    studentId: student.id,
                    name: student.name,
                    ra: student.ra,
                    email: student.email,
                },
                token,
            });
        }catch (error) {
            console.log(error);
            res.status(500).send({error});
        }

        // Incrementa o último id
        // const nextId = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1;

        // Adiciona o aluno na lista
        // alunos.push({ id: nextId, ra, nome, email, senha });
    },

    async delete(req, res) {
        // Recuperar o id do aluno
        const studentId = req.params.id;

        try{
            let student = await Student.findByPk(studentId);

            if(!student)
                return res.status(404).send({error: "Aluno não encontrado!"});

            await student.destroy(); // --> Destrói a instância indicada, ou seja, indicamos o ID do aluno

            // Devolve a resposta de sucesso
            res.status(204).send();                
        } catch (error) {
            console.log(error);
            res.status(500).send({error});
        }
    },

    async update(req, res) {
        // Recuperar o id do aluno
        const studentId = req.params.id;

        // Recuperar os dados do body
        const { name, email } = req.body;

        try{
            let student = await Student.findByPk(studentId);

            if(!student) res.status(404).send({error: "Aluno não encontrado!!"});

            student.name = name;
            student.email = email;

            student.save();        

            // Retornar resposta
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send({error});
        }


        // Fazer a alteração --> fazíamos na lista fixa
        // alunos = alunos.map(
        //     a => a.id.toString() === alunoId ? { ...a, nome, email } : a
        // );
    },
};