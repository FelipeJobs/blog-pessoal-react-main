import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'

import { busca, buscaId, post, put } from '../../../Services/Service';
import Tema from '../../../Models/Tema'
import Postagem from '../../../Models/Postagem'
import './CadastrarPostagem.css'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function CadastroPostagem() {

    let history = useNavigate()

    const { id } = useParams<{ id: string }>()

    const [temas, setTemas] = useState<Tema[]>([])

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null
    })

    useEffect(() => {
        if (token === "") {
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
    }, [token])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema]) /* vai verificar se o tema foi escolhido e com isso ele vai acionar o setpostagem */

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/tema", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    /* essa função será acionado se os campos de input de postagem forem preenchidos e com isso ela vai atualizar os valores de acordo com os valores de cada campo */
    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    
    /* essa função serve para o usuário cadastrar ou atualizar e tb o usuário será redirecionado para outra página. */
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                await put(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
                
                   toast.info('Postagem atualizada com sucesso!!!', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored'
                    });

            } catch (error) {
                    toast.error('Erro ao atualizar, verifique os campos', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored'
                    });
            }

        } else {
            try {
                await post(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
                    toast.success('Postagem cadastrada com sucesso!!!', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored'
                    });
                
            } catch (error) {
                
                    toast.error('Erro ao cadastrar, verifique os campos', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored'
                    });
                
            }
        }
        back()
    }

    function back() {
        history('/Postagens')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" className='tituloformulariopost' component="h1" align="center" >Formulário de cadastro postagem</Typography>

                <TextField
                    value={postagem.titulo}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
                    id="titulo" label="titulo" variant="outlined"
                    name="titulo" margin="normal" fullWidth
                />

                <TextField
                    value={postagem.texto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
                    id="texto" label="texto" name="texto" variant="outlined"
                    margin="normal" fullWidth
                />

                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>

                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"

                        onChange={(e) => buscaId(`/tema/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}
                    >
                        {
                            /* usando o map para percorrer a lista de temas, o menu item cria uma lista com as descrições do tema. */
                            temas.map(item => (
                                <MenuItem value={item.id}>{item.descricao}</MenuItem>
                            ))
                        }

                    </Select>

                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default CadastroPostagem