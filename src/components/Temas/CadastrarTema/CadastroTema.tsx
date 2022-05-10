import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'

import { buscaId, post, put } from '../../../Services/Service'
import Tema from '../../../Models/Tema'

import "./CadastroTema.css"
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { toast } from 'react-toastify'

function CadastroTema() {

    let history = useNavigate()

    const { id } = useParams<{ id: string }>()
    /* o Params ele é usado para capturar os parâmetros que o usuário passa, neste caso o parâmetro é o id */

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );

    /* que estipulamos como o tema será iniciado é como um construtor. */
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    /* confere se o usuário está logado, visto que se ele não estiver ele não terá um token */
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

    /* essa função verifica se o id que o usuário passou existe e assim vai ativar a função findbyID */
    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])


    /* essa função faz a conexão com a API */
    async function findById(id: string) {
        await buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    /* atualiza o banco de dados de acordo com os valores que o usuário digitar no formulário.(do tema) */
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    /* Essa função serve tanto para cadastrar um novo tema como atualizar um tema, então primeiramento devemos verificar se já existe o id do tema, caso exista ele vai atualizar com o método put(try), caso não existe vai entrar no else e o tema será cadastrado com o método post. */
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault() /* para não atualizar a tela */

        if (id !== undefined) {

            try {
                await put(`/tema`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toast.info('Tema atualizado com sucesso!!!', {
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
                console.log(`Error: ${error}`)
               
                toast.error('Erro, por favor verifique a quantidade minima de caracteres', {
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
                await post(`/tema`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                
                toast.success('Tema cadastrado com sucesso!!!', {
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
                console.log(`Error: ${error}`)
                toast.error('Erro, por favor verifique a quantidade minima de caracteres', {
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
        
        back() /* serve para depois que o usuário fizer o submit ele ser redirecionado para tema. */

    }

    function back() {
        history('/temas')
    }

    return (
      
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit} >
                <Typography variant="h3" className='formulariocadastrotema' component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField
                    value={tema.descricao}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    id="descricao"
                    label="Descricao"
                    variant="outlined"
                    name="descricao"
                    margin="normal"
                    fullWidth
                    style={{backgroundColor: 'lightblue'}}
                />
                <Button style={{backgroundColor: 'aquamarine'}} type="submit" variant="contained" className='ola' >
                    Finalizar
                </Button>
                
            </form>
        </Container>
        
        
       
      
    )
    
}


export default CadastroTema