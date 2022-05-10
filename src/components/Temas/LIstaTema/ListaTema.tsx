import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaTema.css';
import Tema from '../../../Models/Tema';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../Services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaTema() {
    let  history = useNavigate()
    const[temas,setTemas] = useState<Tema[]>([])

    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );

    useEffect(() => {
      if(token === ''){

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
        history("/login") 
      }

    },[token])

    async function getTema(){
      await busca('/tema',setTemas, {
        headers:{
          'Authorization':token // no cabeçalho da requisição vai receber o token igual era feito no insonia.
        }
      })

    }
    useEffect(() => {
      getTema()}, [temas.length] // sempre que o tema tiver seu tamano alterado a função get tema será ativada.
    )

  return (
    <>
    {/* com o map eu poderei mapear o array de tema */}
    {temas.map(tema => (
    
      <Box m={2} >
        <Card variant="outlined">
          <CardContent className='fundo'>
            <Typography className='tema' gutterBottom>
              Tema
            </Typography>

            <Typography variant="h5" component="h2">
              {tema.descricao}
            </Typography>

          </CardContent>

          <CardActions className='fundo'>
            <Box display="flex" justifyContent="center" mb={1.5} >
            {/* com o link atualizar e deletar eu mostro a rota que será atualizada e tb capturo o id para deletar ou atualizar */}
              <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1} className='fundo'>
                  <Button variant="contained" className="marginLeft" size='small' style={{background: 'aquamarine'}} >
                    atualizar
                  </Button>
                </Box>
              </Link>
              
              <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' style={{background: 'red'}}>
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
    ))}
      </>
      )
      }
  



export default ListaTema;