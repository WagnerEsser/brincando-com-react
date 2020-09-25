import { Button, Divider, Input, List, ListItem, Typography } from '@material-ui/core'
import { Cached, Delete, Edit } from '@material-ui/icons'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 500px;
    min-height: 400px;
    margin: 50px auto auto auto;
    padding: 40px;
    background-color: #d7d7d7;
    border-radius: 15px;
    text-align: center;
`
export const FormWrapper = styled.div`
    display: grid;
    grid-gap: 20px;
`
export const LoadingWrapper = styled.div`
    width: 100%;
`

export interface IItem {
    id: string
    value1: string
    value2: string
}

export const emptyState: IItem = {
    id: '',
    value1: '',
    value2: ''
}

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [inputError, setInputError] = useState(false)
    const [values, setValues] = useState<IItem>(emptyState)
    const [items, setItems] = useState<IItem[]>([])

    const update = () => {
        const URL = 'http://localhost:8080/items'
        fetch(URL)
            .then(async response => {
                const items = await response.json()
                setItems([...items])
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
    }

    useEffect(() => {
        update()
    }, [])

    function clearForm() {
        setValues(emptyState)
        setInputError(false)
    }

    function create(values: IItem) {
        return fetch('http://localhost:8080/items', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(async (respostaDoServidor) => {
                if (respostaDoServidor.ok) {
                    const resposta = await respostaDoServidor.json();
                    return resposta;
                }

                throw new Error('Não foi possível cadastrar os dados :(');
            });
    }

    const handleCreate = (values: IItem) => {
        create(values)
            .then(() => {
                console.log('Cadastrou com sucesso!');
                update()
            });
    }

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()

        if (values.value1.length && values.value2.length) {
            handleCreate(values)
            setInputError(false)
            clearForm()
            update()
        } else {
            setInputError(true)
        }
    }

    const handleDelete = (id: string) => (event: { preventDefault: () => void }) => {
        event.preventDefault()

        const init: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        }

        return fetch(`http://localhost:8080/items/${id}/`, init)
            .then(async response => {
                if (response.ok) {
                    const resposta = await response.json();
                    update()
                    return resposta;
                }

                throw new Error('Não foi possível excluir o item :(');
            })
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const name = event.target.getAttribute('name') || ''
        setValues({
            ...values,
            [name]: event.target.value
        })
    }

    return (
        <Wrapper>
            <Typography variant='h4' style={{ marginBottom: 30 }}>
                Página inicial
            </Typography>

            <form onSubmit={handleSubmit}>
                <FormWrapper>
                    <Input
                        placeholder='Valor 1'
                        name='value1'
                        type='text'
                        value={values.value1}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder='Valor 2'
                        name='value2'
                        type='text'
                        value={values.value2}
                        onChange={handleChange}
                    />
                    {inputError && (
                        <Typography variant='caption' color='error'>
                            * Os dois campos são obrigatórios
                        </Typography>
                    )}
                    <Button name='button' variant='contained' color='primary' onClick={handleSubmit}>
                        Confirmar
                    </Button>
                </FormWrapper>
            </form>

            { loading && (
                <LoadingWrapper>
                    <Cached style={{ marginTop: 20 }} />
                    <Typography>Carregando lista...</Typography>
                </LoadingWrapper>
            )}

            { !loading && items.length > 0 && (
                <List style={{ marginTop: 20 }}>
                    {items.map(item =>
                        <Fragment key={item.id}>
                            <ListItem style={{ display: 'flex', placeContent: 'space-between' }}>
                                <div>
                                    {item.value1} - {item.value2}
                                </div>
                                <div>
                                    <Link to={`/edit/${item.id}/${item.value1}/${item.value2}`}>
                                        <Edit />
                                    </Link>
                                    &nbsp;
                                    <a href='.' onClick={handleDelete(item.id)}>
                                        <Delete />
                                    </a>
                                </div>
                            </ListItem>
                            <Divider />
                        </Fragment>
                    )}
                </List>
            )}
            { !loading && items.length === 0 && (
                <Typography color='primary' style={{ marginTop: 50 }}>
                    Lista Vazia! Realize o cadastro do primeiro item acima!
                </Typography>
            )}
        </Wrapper>
    )
}

export default Home