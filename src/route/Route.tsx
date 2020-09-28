import { Button, Input, Typography } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import TravelInfo from './travel-info/TravelInfo'

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 350px;
    min-height: 250px;
    margin-top: 100px;
    margin-bottom: 30px;
    padding: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    border: 2px solid black;
`
const Form = styled.div`
    text-align: center;
`

export interface IRoute {
    origin: string
    destiny: string
}

const initial: IRoute = {
    origin: '',
    destiny: ''
}

const Route = () => {
    const [values, setValues] = useState<IRoute>(initial)
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState<string>()

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const name = event.target.getAttribute('name') || ''
        setValues({ ...values, [name]: event.target.value })
    }

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()

        if (values.origin.length && values.destiny.length) {
            setOpenModal(true)
        } else {
            setError('Valores inválidos.')
        }
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <Wrapper>
            <Typography variant='h4' style={{ marginBottom: 20 }}>
                Insira seu trajeto:
            </Typography>

            <form onSubmit={handleSubmit}>
                <Form>
                    <Input
                        placeholder='Origem'
                        type='text'
                        name='origin'
                        value={values.origin}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder='Destino'
                        type='text'
                        name='destiny'
                        value={values.destiny}
                        onChange={handleChange}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                        style={{ marginTop: 15 }}>
                        <Search /> Pesquisar motoristas
                    </Button>
                </Form>
            </form>

            { error && (
                <Typography style={{ color: 'red', marginTop: 15 }}>
                    {error}
                </Typography>
            )}

            { openModal && (
                <TravelInfo open={openModal} onClose={handleClose} />
            )}
        </Wrapper>
    )
}

export default Route