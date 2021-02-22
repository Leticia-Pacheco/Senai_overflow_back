// Exportação do app, que traz o express. Não precisamos colocar a extensão .js porque ele automaticamente faz.
const app = require("./app");

// Criando uma variável para definir a porta que utilizaremos.
const PORT = process.env.PORT || 3333; //no Hiroku, ele que coloca á porta, ou seja, aqui ela é 3333, lá
//é a que ele quiser

// Para concatenar podemos usar o (+) ou (${nomeVariavel}), e aí, temos que escrever a frase dentro de 2 crases(``).
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});