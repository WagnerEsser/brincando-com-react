import { Button, Divider, Input, List, ListItem, Tooltip, Typography } from '@material-ui/core'
import { Cached, Visibility } from '@material-ui/icons'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { URL_BASE } from '.'
import Base from './Base'
import { emptyState, ITouristSpot } from './interfaces'
import Modal from './Modal'
import { AddButton, FormWrapper, LoadingWrapper } from './style'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [inputError, setInputError] = useState(false)
    const [openList, setOpenList] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [values, setValues] = useState<ITouristSpot>(emptyState)
    const [items, setItems] = useState<ITouristSpot[]>([])

    const handleOpenList = () => {
        setOpenList(value => !value)
    }

    const handleOpenForm = () => {
        setOpenForm(value => !value)
    }

    const refresh = () => {
        const URL = URL_BASE + '/items'
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
        refresh()
    }, [])

    function clearForm() {
        setValues(emptyState)
        setInputError(false)
    }

    function create(values: ITouristSpot) {
        return fetch(URL_BASE + '/items', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(async (respostaDoServidor) => {
                if (respostaDoServidor.ok) {
                    const resposta = await respostaDoServidor.json()
                    return resposta;
                }

                throw new Error('Não foi possível cadastrar os dados :(')
            });
    }

    const handleCreate = (values: ITouristSpot) => {
        create(values)
            .then(() => {
                console.log('Cadastrou com sucesso!')
                refresh()
            })
    }

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()

        if (values.name.length && values.description.length) {
            handleOpenForm()
            handleCreate(values)
            setInputError(false)
            clearForm()
            refresh()
        } else {
            setInputError(true)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const name = event.target.getAttribute('name') || ''
        setValues({
            ...values,
            [name]: event.target.value
        })
    }

    return (
        <Base onClick={handleOpenList}>
            <Modal open={openList && !openForm} title='Pontos turísticos!' onClick={handleOpenList}>
                {loading && (
                    <LoadingWrapper>
                        <Cached />
                        <Typography>Carregando lista...</Typography>
                    </LoadingWrapper>
                )}

                {!loading && items.length > 0 && (
                    <List style={{ marginTop: 20 }}>
                        {items.map(item =>
                            <Fragment key={item.id}>
                                <ListItem style={{ display: 'flex', placeContent: 'space-between' }}>
                                    <Link to={`/item/${item.id}`}>
                                        {item.name} - {item.description}
                                    </Link>
                                    <div>
                                        <Link to={`/view/${item.id}`}>
                                            <Visibility />
                                        </Link>
                                    </div>
                                </ListItem>
                                <Divider />
                            </Fragment>
                        )}
                    </List>
                )}
                {!loading && items.length === 0 && (
                    <Typography color='primary' style={{ marginTop: 50 }}>
                        Lista Vazia! Realize o cadastro do primeiro item abaixo!
                    </Typography>
                )}

                <Tooltip title='Adicionar novo ponto turístico'>
                    <AddButton fontSize='large' color='primary' onClick={handleOpenForm} />
                </Tooltip>
            </Modal>

            <Modal open={openForm} title='Novo ponto turístico' onClick={handleOpenForm}>
                <form onSubmit={handleSubmit}>
                    <FormWrapper>
                        <Input
                            placeholder='Nome'
                            name='name'
                            type='text'
                            value={values.name}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder='Descrição'
                            name='description'
                            type='text'
                            value={values.description}
                            onChange={handleChange}
                        />
                        {inputError && (
                            <Typography variant='caption' color='error'>
                                * Os dois campos são obrigatórios
                            </Typography>
                        )}
                        <Button name='button' variant='contained' color='primary' onClick={handleSubmit}>
                            Cadastrar
                        </Button>
                    </FormWrapper>
                </form>
            </Modal>
        </Base>
    )
}

export default Home