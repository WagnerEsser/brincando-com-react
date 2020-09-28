import { Button, Dialog, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IP_SERVER } from '../..'
import { ITravel } from '../../travels/Travels'

interface IProps {
    open: boolean
    onClose(): void
}

const TravelInfo: FC<IProps> = props => {
    const history = useHistory()
    const [values, setValues] = useState<ITravel | undefined>()
    const [loading, setLoading] = useState(false)

    const handleUpdate = () => {
        setLoading(true)
        setTimeout(() => {
            fetch(`${IP_SERVER}/travelOptions`)
                .then(async response => {
                    if (response.ok) {
                        const options: ITravel[] = await response.json();
                        const travelOption = options[Math.floor(Math.random() * options.length)]

                        setValues(travelOption)
                    }
                    setLoading(false)
                    throw new Error('Ocorreu algum erro na comunicação com o servidor');
                }).catch(err => console.log(err))
        }, 1000)
    }

    useEffect(() => {
        handleUpdate()
    }, [])

    const handleClick = () => {
        return fetch(`${IP_SERVER}/travels`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ ...values, date: new Date().toDateString() }),
        })
            .then(async response => {
                if (response.ok) {
                    history.push('/travels')
                } else {
                    alert('Ocorreu algum erro na comunicação com o servidor');
                }
            }).catch(err => console.log(err))
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <div onClick={props.onClose} style={{ cursor: 'pointer' }}>
                <Close style={{ float: 'right' }} />
            </div>
            { loading && (
                <Typography color='textPrimary'>
                    Carregando...
                </Typography>
            )}
            { values && !loading && (
                <>
                    <Typography>Motorista: {values.driver}</Typography>
                    <Typography>Placa: {values.board}</Typography>
                    <Typography>Locais vagos: {values.vacantLocations}</Typography>
                    <Typography>Valor: R$ {values.value}</Typography>
                    <Typography>Tempo de espera: {values.waitingTime} min</Typography>
                </>
            )}
            { !values && (
                <Typography color='primary'>
                    Não há motoristas disponíveis.
                </Typography>
            )}
            <Button variant='contained' color='default' onClick={handleUpdate}>
                Buscar outro
            </Button>
            <Button variant='contained' color='secondary' onClick={props.onClose}>
                Cancelar
            </Button>
            <Button variant='contained' color='primary' onClick={handleClick} disabled={loading}>
                Confirmar
            </Button>
        </Dialog>
    )
}

export default TravelInfo