import React, { useEffect } from "react";
import { Typography, Box, Grid, Button } from "@material-ui/core";
import "./Home.css";
import TabPostagem from "../../components/Postagem/TabPostagem/TabPostagem";
import ModalPostagem from "../../components/Postagem/ModalPostagem/ModalPostagem";
import { Link, useNavigate } from "react-router-dom";
import { TokenState } from "../../store/tokens/tokensReducer";
import { useSelector } from "react-redux";

function Home() {
  let history = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );
  
  useEffect(() => {
    if (token == "") {
        alert("Você precisa estar logado")
        history("/login")

    }
}, [token])
  
  return (
    <>
      <Grid  className="home"
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
       
      >
        <Grid alignItems="center" justifyContent="center" xs={12} sm={6}>
          <Grid alignItems="center">
          <Box paddingY={0}  >
            <div className="centralizar">
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align ="center"
              className="titulo"
              
            >
            Bem vindes ao blog  Vida de um Dev!!
            </Typography>
            </div>
            
          </Box>

          <Box display="flex" justifyContent="center">
            <Box paddingLeft={30}>
              <ModalPostagem />
            </Box>
            <Link to = '/postagens' className="text-decorator-none">
            <Button
              variant="outlined"
              color="secondary"
              className="botao"
            >
              Ver Postagens
            </Button>
            </Link>
            </Box>
            
          </Grid>
        
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Box>
        <img src= 'cachorro.gif' alt="cão correndo" className="img"/>
        </Box>

        {/* <Grid xs={12} className="postagem">
          <TabPostagem/>
        </Grid>* */}
      </Grid>
    </>
  );
}

export default Home;
