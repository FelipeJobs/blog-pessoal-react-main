export type Action = {type:'ADD_TOKEN'; payload:string};/* o payload armazena o token, mas poderia armazenar outra informação. */

export const addToken = (token:string):Action =>({
    type:"ADD_TOKEN",
    payload:token
});
