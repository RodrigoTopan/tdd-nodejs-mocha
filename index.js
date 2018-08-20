const { readFile } = require('fs');
const { join } = require('path');
const { promisify } = require('util');
//5 passo, criamos a estrutura
//Para não dar problema de path(caminho de arquivo), usamos a função join
function lerComCallback(callback) {
    readFile(join(__dirname, 'items.json'), (error, result) => {
        if (error) {
            //Validamos o erro, e caso ele exista,retornamos 
            //seguindo a convenção para erros
            //console.error('ERROR', error);
            return callback(error);
        }
        return callback(null, JSON.parse(result));
    })
}

function lerComPromise() {
    //convertemos para caso de função que não segue o padrão de callback
    //de callback (1º arg erro, 2º sucesso)
    //nestes casos, o promisify nao vai funcionar
    //Instanciar uma Promise
    //5º passo -> estrutura
    //Resolve -> sucesso
    // Reject -> deu merda
    return new Promise((resolve, reject) => {
        /*readFile(join(__dirname, 'items.json'), (erro, resultado) => {
            //fazemos um ternário para retornar a função
            //Se o erro possuir algum falor, ele joga uma exceção
            //Senão ele resolve com sucesso
            const resultadoJSON = JSON.parse(resultado)
            return erro ? reject(erro) : resolve(resultadoJSON)
        })*/
        readFile(join(__dirname, 'items.json'), (erro, resultado) =>
            erro ? reject(erro) : resolve(JSON.parse(resultado)));
    });
}

function convertendoParaPromise() {
    const lerComCallbackAsync = promisify(lerComCallback);
    return lerComCallbackAsync();
}


module.exports = {
    lerComCallback,
    lerComPromise,
    convertendoParaPromise
}