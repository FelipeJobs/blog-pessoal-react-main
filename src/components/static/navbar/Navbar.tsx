import React from "react";
import {AppBar,Toolbar,Typography,Box,} from "@material-ui/core";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/action";
import {toast} from 'react-toastify'

function Navbar() {
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  
  let history = useNavigate()
  const dispatch = useDispatch()


  /* essa função é para apagar o token que fica armazenado no LocalStorage(navegador) */
  function logout() {
    dispatch(addToken(''));
    toast.info('Deslogado com sucesso!!', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark'
     
      });
    history('/login')
  }

  var navBarComponent;
  
  if(token != ''){
    navBarComponent =
    <AppBar position="static" className="back">
    <Toolbar variant="regular" className="bar">
      <Link to='/home' className="text-decorator-none">
        <Box className="cursor" >
          <Typography className="titut" variant="h5">
            Vida de um Dev
          </Typography>
        </Box>
      </Link>

      <Box display="flex" justifyContent="start">
        <Link to='/postagens' className="text-decorator-none">
          <Box mx={5} className="cursor">
            <Typography className="titut" variant="h6" >
              Postagens
            </Typography>
          </Box>
        </Link>

        <Link to='/temas' className="text-decorator-none">
          <Box mx={5} className="cursor">
            <Typography className="titut" variant="h6" >
              Temas
            </Typography>
          </Box>
        </Link>

        <Link to='/formularioTema' className="text-decorator-none">
        <Box mx={5} className="cursor">
          <Typography className="cadastrar" variant="h6">
            Cadastrar tema
          </Typography>
        </Box>
        </Link>
        <Box mx={5} className="cursor" id="log" onClick={logout}>
          <Typography variant="h6" color="inherit">
            Logout
          </Typography>
        </Box>

      </Box>

    </Toolbar>

  </AppBar>

  }

  return (
    <>
        {navBarComponent}
    </>
  );
}

export default Navbar;
