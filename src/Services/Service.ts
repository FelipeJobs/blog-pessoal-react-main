import axios from "axios"; /* •	Axios e usado para fazer a conexão com o back end, no react ele é uma biblioteca que permite que façamos requisições http para o nosso back end. Ele tb permite cancelar requisições. */
export const api = axios.create({
    baseURL: 'https://blogpessoallipinho.herokuapp.com'
})

export const cadastroUsuario = async (url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data.token)
}



/*Any significa que é qualquer tipo primitivo é usado para dar uma tipagem genérica. */

/* Definindo uma função como async, podemos utilizar a palavra-chave await antes de qualquer expressão que retorne uma promessa. Dessa forma, a execução da função externa (a função async) será pausada até que a Promise seja resolvida.
 */

/* A palavra-chave await recebe uma Promise e a transforma em um valor de retorno (ou lança uma exceção em caso de erro). Quando utilizamos await, o JavaScript vai aguardar até que a Promise finalize. Se for finalizada com sucesso (o termo utilizado é fulfilled), o valor obtido é retornado. Se a Promise for rejeitada (o termo utilizado é rejected), é retornado o erro lançado pela exceção.*/
