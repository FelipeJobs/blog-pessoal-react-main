import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'

import { buscaId, post, put } from '../../../Services/Service'
import Tema from '../../../Models/Tema'

import "./CadastroTema.css"

function CadastroTema() {

    let history = useNavigate()

    const { id } = useParams<{ id: string }>()
    /* o Params ele é usado para capturar os parâmetros que o usuário passa, neste caso o parâmetro é o id */

    const [token, setToken] = useLocalStorage('token')

    /* que estipulamos como o tema será iniciado é como um construtor. */
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    /* confere se o usuário está logado, visto que se ele não estiver ele não terá um token */
    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
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

                alert('Tema atualizado com sucesso');

            } catch (error) {
                console.log(`Error: ${error}`)
                alert("Erro, por favor verifique a quantidade minima de caracteres")
            }

        } else {

            try {
                await post(`/tema`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                
                alert('Tema cadastrado com sucesso');
                
            } catch (error) {
                console.log(`Error: ${error}`)
                alert("Erro, por favor verifique a quantidade minima de caracteres")
            }
        }
        
        back() /* serve para depois que o usuário fizer o submit ele ser redirecionado para tema. */

    }

    function back() {
        history('/temas')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField
                    value={tema.descricao}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    id="descricao"
                    label="descricao"
                    variant="outlined"
                    name="descricao"
                    margin="normal"
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema