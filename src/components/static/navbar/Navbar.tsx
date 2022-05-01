import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <AppBar position="static" className="back">
        <Toolbar variant="regular" className="bar">
          <Box className="cursor">
            <Typography className="titut" variant="h5">
              Vida de um Dev
            </Typography>
          </Box>
          <Box display="flex" justifyContent="start">
            <Box mx={5} className="cursor">
              <Typography className="titut" variant="h6" >
                Postagens
              </Typography>
            </Box>
            <Box mx={5} className="cursor">
              <Typography className="titut" variant="h6" >
                Temas
              </Typography>
            </Box>
            <Box mx={5} className="cursor">
              <Typography className="cadastrar" variant="h6">
                Cadastrar tema
              </Typography>
            </Box>
            <Link to="/login" className="text-decorator-none"> 
              <Box mx={5} className="cursor" id="log" >
                <Typography variant="h6" color="inherit">
                  Logout
                </Typography>
              </Box>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
