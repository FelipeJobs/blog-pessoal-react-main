import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';


import "./DeletarTema.css"
import Tema from '../../../Models/Tema';
import { buscaId, deleteId } from '../../../Services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function DeletarTema() {

    let history = useNavigate();

    const { id } = useParams<{ id: string }>();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );

    const [tema, setTema] = useState<Tema>()

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
            history("/login")

        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        await buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function sim() {
        history('/temas')

        try {
            await deleteId(`/tema/${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            
            alert('Tema deletado com sucesso');
            
        } catch (error) {
            alert('Erro ao deletar');
        }

    }

    function nao() {
        history('/temas')
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar o Tema:
                            </Typography>
                            <Typography color="textSecondary">
                                { tema?.descricao }
                            </Typography>
                        </Box>
                    </CardContent>

                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box mx={2}>
                                <Button onClick={nao} variant="contained" size='large' color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>

                </Card>
            </Box>
        </>
    )
}

export default DeletarTema