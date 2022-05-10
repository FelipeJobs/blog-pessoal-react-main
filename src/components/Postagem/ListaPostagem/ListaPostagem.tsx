import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import './ListaPostagem.css';
import Postagem from '../../../Models/Postagem';

import { busca } from '../../../Services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function ListaPostagem() {
  let history = useNavigate()
  const [postagens, setPostagens] = useState<Postagem[]>([])
  
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );


  useEffect(() => {
    if (token === '') {
      
        toast.error('você precisa se logar primeiro!!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark'
        });
      history('/login')
    }
  }, [token])

  async function getPostagem() {
    await busca('/postagem', setPostagens, {
      header: {
        'Authorization': token
      }
    }
    )
  }

  useEffect(() => {
    getPostagem()
  }, [postagens.length]
  )

  return (
    <>
    <Grid className='backgroundlistpost'>
      {postagens.map(postagem =>
        <Box m={2} >
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Postagens
              </Typography>
              <Typography variant="h5" component="h2">
                {postagem.titulo}
              </Typography>
              <Typography variant="body2" component="p">
                {postagem.texto}
              </Typography>
              <Typography variant="body2" component="p">
                {postagem.tema?.descricao}
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>

                <Link to={`/formularioPostagem/ ${postagem.id}`} className="text-decorator-none" >
                  <Box mx={1}>
                    <Button variant="contained" className="marginLeft" size='small' color="primary" >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link to={`/formularioDeletar/ ${postagem.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button variant="contained" size='small' color="secondary">
                      deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>)}
        </Grid>
    </>)
}

export default ListaPostagem;