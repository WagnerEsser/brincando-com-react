import { Button, Dialog, Input, Typography } from '@material-ui/core'
import { Close, Delete, Edit } from '@material-ui/icons'
import { format } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IP_SERVER } from '..'


const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 500px;
    min-height: 400px;
    margin-top: 70px;
    margin-bottom: 30px;
    padding: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    border: 2px solid black;
`
const WrapperEdit = styled.div`
    padding: 30px;
    text-align: center;
    
`
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
        fetch(`${IP_SERVER}/travels`)
            .then(async response => {
                if (response.ok) {
                    const travels: ITravel[] = await response.json();
                    setTravels(travels)
                } else {
                    throw new Error('Ocorreu algum erro na comunicação com o servidor');
                }
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }).catch(err => console.log(err))
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

    const handleRemove = (id?: string) => () => {
        if (id) {
            return fetch(`${IP_SERVER}/travels/${id}/`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' }
            })
                .then(async response => {
                    if (response.ok) {
                        handleSearch()
                    } else {
                        throw new Error('Não foi possível excluir o item :(');
                    }
                })
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (selected) {
            setSelected({ ...selected, value: event.target.value as string })
        }
    }

    return (
        <Wrapper>
            <Typography variant='h3' style={{ marginBottom: 20 }}>
                Suas viagens
            </Typography>

            { loading && (
                <Typography color='textPrimary' style={{ marginBottom: 20 }}>
                    Carregando...
                </Typography>
            )}

            { travels.map(travel =>
                <div key={travel.id}>
                    <Typography>
                        <strong>Motorista:</strong> {travel.driver}
                    </Typography>
                    <Typography>
                        <strong>Placa:</strong> {travel.board}
                    </Typography>
                    <Typography>
                        <strong>Valor pago:</strong> R$ {travel.value}&nbsp;
                        <span onClick={handleSelect(travel)} style={{ cursor: 'pointer' }}>
                            <Edit fontSize='small' />
                        </span>
                    </Typography>
                    <Typography>
                        <strong>Data:</strong> {format(new Date(travel.date), 'dd/MM/yyyy')}
                    </Typography>
                    <div onClick={handleRemove(travel.id)} style={{ cursor: 'pointer' }}>
                        <Delete />
                    </div>
                    <br />
                </div>
            )}

            { !loading && travels.length === 0 && (
                <Typography color='primary' style={{ marginBottom: 15 }}>
                    Não há viagens registradas.
                </Typography>
            )}

            <Link to='/map'>
                Voltar ao mapa
            </Link>

            <Dialog open={editOpen} onClose={handleOpen}>
                <WrapperEdit>
                    <div onClick={handleOpen} style={{ cursor: 'pointer' }}>
                        <Close style={{ float: 'right' }} />
                    </div>
                    <Input
                        type='text'
                        value={selected?.value}
                        onChange={handleChange}
                        style={{ marginTop: 20, marginBottom: 20 }}
                    />
                    <Button variant='contained' color='primary' onClick={handleEditPrice}>
                        Salvar
                    </Button>
                </WrapperEdit>
            </Dialog>
        </Wrapper>
    )
}

export default Travels