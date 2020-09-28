import { Button, Dialog, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { IP_SERVER } from '../..'
import { ITravel } from '../../travels/Travels'

const Wrapper = styled.div`
    padding: 30px;
    
`
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
        fetch(`${IP_SERVER}/travelOptions`)
            .then(async response => {
                if (response.ok) {
                    const options: ITravel[] = await response.json();
                    const travelOption = options[Math.floor(Math.random() * options.length)]

                    setValues(travelOption)
                }
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
                throw new Error('Ocorreu algum erro na comunicação com o servidor');
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        handleUpdate()
    }, [])

    const handleConfirm = () => {
        return fetch(`${IP_SERVER}/travels`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                ...values,
                id: undefined,
                date: new Date().toDateString()
            }),
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
            <Wrapper>
                <div onClick={props.onClose} style={{ cursor: 'pointer' }}>
                    <Close style={{ float: 'right' }} />
                </div>
                {loading && (
                    <Typography color='textPrimary' style={{ marginBottom: 20 }}>
                        Carregando...
                    </Typography>
                )}
                {values && !loading && (
                    <>
                        <Typography>
                            <strong>Motorista:</strong> {values.driver}
                        </Typography>
                        <Typography>
                            <strong>Placa:</strong> {values.board}
                        </Typography>
                        <Typography>
                            <strong>Locais vagos:</strong> {values.vacantLocations}
                        </Typography>
                        <Typography>
                            <strong>Valor:</strong> R$ {values.value}
                        </Typography>
                        <Typography style={{ marginBottom: 20 }}>
                            <strong>Tempo de espera:</strong> {values.waitingTime} min
                        </Typography>
                    </>
                )}
                {!values && !loading && (
                    <Typography color='primary' style={{ marginTop: 15, marginBottom: 20 }}>
                        Não há motoristas disponíveis.
                    </Typography>
                )}
                <Button variant='contained' color='default' onClick={handleUpdate} style={{ marginRight: 10 }}>
                    Buscar outro
                </Button>
                <Button variant='contained' color='secondary' onClick={props.onClose} style={{ marginRight: 10 }}>
                    Cancelar
                </Button>
                <Button variant='contained' color='primary' onClick={handleConfirm} disabled={loading}>
                    Confirmar
                </Button>
            </Wrapper>
        </Dialog>
    )
}

export default TravelInfo