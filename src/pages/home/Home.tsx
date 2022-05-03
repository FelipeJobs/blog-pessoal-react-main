import React from "react";
import { Typography, Box, Grid, Button } from "@material-ui/core";
import "./Home.css";
import TabPostagem from "../../components/Postagem/TabPostagem/TabPostagem";

function Home() {
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
          <Box paddingX={10}>
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
          </Grid>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}></Box>
            <Button
              variant="outlined"
              color="secondary"
              className="botao"
            >
              Ver Postagens
            </Button>
          </Box>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Box>
        <img src= 'cachorro.gif' alt="cão correndo" className="img"/>
        </Box>
        <Grid xs={12} className="postagem">
          <TabPostagem/>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
