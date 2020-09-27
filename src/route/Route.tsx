import { IconButton, Input, Typography } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React, { useState } from 'react'
import { IRoute } from './interfaces'
import TravelInfo from './travel-info/TravelInfo'

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
        <div style={{
            width: 300,
            height: 300,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <form onSubmit={handleSubmit}>
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
                <IconButton color='primary' onClick={handleSubmit}>
                    <Search />
                </IconButton>
            </form>

            { error && (
                <Typography style={{ color: 'red' }}>
                    {error}
                </Typography>
            )}

            { openModal && (
                <TravelInfo open={openModal} onClose={handleClose} />
            )}
        </div>
    )
}

export default Route