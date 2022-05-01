import React from "react";
import { Box, Button, colors, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className="background">
      <Grid alignItems="center" xs={6}>
        <Box padding={15}>
          <form>
           
            <Typography className="tit"
              align="center"
              variant="h4"
            >
              Bem vindo ao blog  Vida de um Dev
            </Typography>
            <TextField
              id="usuario"
              label="usuário" /* dentro da caixa com id usuário vai estar usuario dentro*/
              variant="outlined"/* esse comando deixa a caixa branca, logo, normal. */
              name="usuario"
              margin="normal"
              style={{backgroundColor: 'lightblue'}}
              fullWidth
              className="usua"
            />
            <TextField
              id="senha"
              label="senha"
              variant="outlined"
              name="senha"
              margin="normal"
              style={{backgroundColor: 'lightblue', color: 'black'}}
              type="password"/* mudei o tipo para a senha não fica vísivel quando for digitada */
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
              <Link to="/home" className="text-decorator-none">
                <Button type="submit" variant="contained" style={{backgroundColor: 'aquamarine'}} >
                  Login
                </Button>
              </Link>
            </Box>
          </form>
          <Box marginTop={2}>
           
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              className="cadastro"
            >
              Cadastrar
            </Typography>
          </Box>
        </Box>
      </Grid>

    </Grid>
  );
}

export default Login;
