import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaPostagem.css';
import Postagem from '../../../Models/Postagem';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../Services/Service';

function ListaPostagem() {
  let history = useNavigate()
  const [postagens, setPostagens] = useState<Postagem[]>([])
  const [token, setToken] = useLocalStorage('token')

  useEffect(() => {
    if (token === '') {
      alert('você precisa se logar primeiro')
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
    </>)
}

export default ListaPostagem;