import { Button, Dialog, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React, { FC } from 'react'

interface IProps {
    open: boolean
    onClose(): void
}

const TravelInfo: FC<IProps> = props =>
    <Dialog open={props.open} onClose={props.onClose}>
        <div onClick={props.onClose} style={{ cursor: 'pointer' }}>
            <Close style={{ float: 'right' }} />
        </div>
        <Typography>Placa: XXX-0000</Typography>
        <Typography>Locais vagos: 2</Typography>
        <Typography>Valor: R$ 00,00</Typography>
        <Typography>Tempo de espera: 10min</Typography>
        <Button variant='contained' color='secondary' onClick={props.onClose}>
            Cancelar
        </Button>
        <Button variant='contained' color='primary'>
            Confirmar
        </Button>
    </Dialog>

export default TravelInfo