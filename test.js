/*
1.Criar a suite de testes em test.js
2. Criar o teste que vai falhar
3. Fazer a asserção = verificar o valor esperado e o valor corrente
4. Rodar o teste no terminal e tem que dar erro -mocha -w test.js
5. Montar a implementação estrutural da função lá no index.js
6. chamar a função
7. Implementar a função objetiva
*/
const { deepEqual } = require('assert');
const { lerComCallback, lerComPromise, convertendoParaPromise } = require('./index');

describe('Vai executar funções assincronas', () => {
    it('Deve receber valores do arquivo resolvendo com callback', (done) => {
        //6º passo, chamar a função ler com callback
        lerComCallback((error, result) => {
            const expected = {
                "gender": "male",
                "hair_color": "brown",
                "height": "180",
                "mass": "80",
                "name": "Han Solo",
                "skin_color": "fair",
                "created": "2014-12-10T16:49:14.582000Z",
                "edited": "2014-12-20T21:17:50.334000Z",
                "starship": {
                    "name": "Millennium Falcon",
                    "model": "YT-1300 light freighter"
                }
            }
            //Jogar asserção dentro do callback
            deepEqual(result, expected);
            //No caso de callback functions, devemos receber o done do mocha, da função it
            //para informar que a nossa função terminou
            done();
        })
        //3º passo = asserção
        //deepEqual(null, expected);
    });

    it('Deve receber valores de arquivo, resolvendo com then/catch', () => {
        const expected = {
            "gender": "male",
            "hair_color": "brown",
            "height": "180",
            "mass": "80",
            "name": "Han Solo",
            "skin_color": "fair",
            "created": "2014-12-10T16:49:14.582000Z",
            "edited": "2014-12-20T21:17:50.334000Z",
            "starship": {
                "name": "Millennium Falcon",
                "model": "YT-1300 light freighter"
            }
        }
        //No caso de promises, o mocha resolve somente 
        //retornando a função sem precisar do done
        lerComPromise().then(resultado => {
            deepEqual(resultado, expected);
        })
    });

    it('Deve Receber valores de arquivo, resolvendo com async/await e convertendo para promise', async () => {
        const expected = {
            "gender": "male",
            "hair_color": "brown",
            "height": "180",
            "mass": "80",
            "name": "Han Solo",
            "skin_color": "fair",
            "created": "2014-12-10T16:49:14.582000Z",
            "edited": "2014-12-20T21:17:50.334000Z",
            "starship": {
                "name": "Millennium Falcon",
                "model": "YT-1300 light freighter"
            }
        }
        //Para usar o await, para guardar o valor em uma variável
        // Precisamos adicionar o async
        const resultado = await convertendoParaPromise();
        deepEqual(resultado, expected);
    });
});