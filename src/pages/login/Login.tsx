import React, { ChangeEvent } from "react";
import { Box, Button, colors, Grid, TextField, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import { useState,useEffect } from "react";
import UserLogin from "../../Models/UserLogin";
import useLocalStorage from 'react-use-localstorage';
import { login } from "../../Services/Service";

/* Basicamente O use states defini como uma variável será inicializada quando for renderizada(tipo um construtor) */

function Login() {
  // Redireciona o usuário para determinada pagina
  let history = useNavigate()

  const [token, setToken] = useLocalStorage('token')
  /*Userlocalstory: serve para gravar informações no navegador,  e podemos utilizar essa informação para fazer uma chegagem do comprimento das regras de negócio. Por exemplo ver se a pessoa se autenticou para entrar numa determina rota */
  
  const [userLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: ""
  })

  // userEffect serve para trabalhar efeitos colaterais, isso é, colocamos uma informação para ele analisar dentro do array e caso alguma alteração ocorra nessa informação a function que está dentro do userEffect é ativada.
  useEffect(() => {
    if(token !== ""){
        history('/home')
       
    }
}, [token])

  /*Basicamente a função update atualiza o valor de user login. ademais, com change event manipula valores de campos htmls. logo toda essa função é usada para atualizar a model com o dado que o usuário fornecer no campo de input do formulário html. */
  
  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      /* esses três pontos espalhas tudo que tem dentro de user login que no caso são os atributos informados no useStates(Spread Operator) */
      
      [e.target.name]: e.target.value
      /* name se refere a propriedade de campo do TextField e uso o target.value para pegar o valor digitado pelo usuário no campo especificado, ou seja, de acordo com o name. */
    })
  }
  /* usei o FormElement porque agora terei que verificar o formulário como um todo e não somente o campo de input. */
  async function logar(e: ChangeEvent<HTMLFormElement>) {
   
    e.preventDefault() /* vai impedir que a tela seja atualizada quando o usuário clicar no botão */

    try {
      await login(`/usuarios/logar`, userLogin, setToken)
      alert("Parabéns você está Dentro do Vida de Dev !!!!")

  } catch (error) {
      alert("Confira se os dados estão corretos e se você já está cadastrado")
  }
}
  
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className="background">
      <Grid alignItems="center" xs={6}>
        <Box padding={15}>
          <form onSubmit={logar}>

            <Typography className="tit"
              align="center"
              variant="h4"
            >
              Bem vindo ao blog  Vida de um Dev
            </Typography>
            <TextField
              id="usuario"
              value={userLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              label="usuário" /* dentro da caixa com id usuário vai estar usuario dentro*/
              variant="outlined"/* esse comando deixa a caixa branca, logo, normal. */
              name="usuario"
              margin="normal"
              style={{ backgroundColor: 'lightblue' }}
              fullWidth
              className="usua"
            />
            <TextField
              id="senha"
              value={userLogin.senha}/* com isso eu pg o valor digitado */
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              /* com o change quando o campo do TextField foir modificado a função update model será ativada, por isso referencio a função. */
              label="senha"
              variant="outlined"
              name="senha"
              margin="normal"
              style={{ backgroundColor: 'lightblue', color: 'black' }}
              type="password"/* mudei o tipo para a senha não fica vísivel quando for digitada */
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
              <Button type="submit" variant="contained" style={{ backgroundColor: 'aquamarine' }} >
                Login
              </Button>
            </Box>
          </form>
          <Box marginTop={2}>
            <Link to='/cadastrar' className="text-decorator-none">
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                className="cadastro"
              >
                Cadastrar
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>

    </Grid>
  );
  }

export default Login;
