import { Button, Dialog, Input, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { format } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IP_SERVER } from '..'

export interface ITravel {
    id?: string
    driver: string
    board: string
    vacantLocations: number
    value: string
    waitingTime: number
    date: Date
}

const Travels: FC = () => {
    const [travels, setTravels] = useState<ITravel[]>([])
    const [loading, setLoading] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [selected, setSelected] = useState<ITravel>()

    const handleSearch = () => {
        setLoading(true)
        setTimeout(() => {
            fetch(`${IP_SERVER}/travels`)
                .then(async response => {
                    if (response.ok) {
                        const travels: ITravel[] = await response.json();
                        setTravels(travels)
                    } else {
                        throw new Error('Ocorreu algum erro na comunicação com o servidor');
                    }
                    setLoading(false)
                }).catch(err => console.log(err))
        }, 1000)
    }

    useEffect(() => {
        handleSearch()
    }, [])

    const handleOpen = () => {
        setEditOpen(value => !value)
    }

    const handleSelect = (travel: ITravel) => () => {
        setSelected(travel)
        handleOpen()
    }

    const handleEditPrice = () => {
        if (!selected) { return }

        return fetch(`${IP_SERVER}/travels/${selected.id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ ...selected })
        })
            .then(async response => {
                if (response.ok) {
                    handleOpen()
                    handleSearch()
                } else {
                    alert('Ocorreu algum erro na comunicação com o servidor');
                }
            }).catch(err => console.log(err))
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>  {
        if (selected) {
            setSelected({ ...selected, value: event.target.value as string })
        }
    }

    return (
        <>
            <Typography variant='h3'>Suas viagens</Typography>

            { loading && (
                <Typography color='textPrimary'>
                    Carregando...
                </Typography>
            )}

            { travels.map(travel =>
                <>
                    <Typography>Motorista: {travel.driver}</Typography>
                    <Typography>Placa: {travel.board}</Typography>
                    <Typography>Valor pago: R$ {travel.value}</Typography>
                    <Button size='small' variant='contained' onClick={handleSelect(travel)}>
                        Editar valor pago
                    </Button>
                    <Typography>Data: {format(new Date(travel.date), 'dd/MM/yyyy')}</Typography>
                    <br />
                </>
            )}
            
            { !loading && travels.length === 0 && (
                <Typography color='primary'>
                    Não há viagens registradas ainda.
                </Typography>
            )}

            <Link to='/map'>
                Voltar ao mapa
            </Link>

            <Dialog open={editOpen} onClose={handleOpen}>
                <div onClick={handleOpen} style={{ cursor: 'pointer' }}>
                    <Close />
                </div>
                <Input
                    type='text'
                    value={selected?.value}
                    onChange={handleChange}
                />
                <Button variant='contained' color='primary' onClick={handleEditPrice}>
                    Salvar
                </Button>
            </Dialog>
        </>
    )
}

export default Travels