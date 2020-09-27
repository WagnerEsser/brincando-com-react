import { Button } from '@material-ui/core'
import React, { FC } from 'react'
import { Wrapper } from './style'

interface IProps {
    onClick(): void
}

const Base: FC<IProps> = props =>
    <Wrapper>
        <Button
            onClick={props.onClick}
            variant='contained'
            color='secondary'
            style={{ float: 'right', marginTop: '30px', marginRight: '30px' }}>
            Pontos turísticos
        </Button>
        {props.children}
    </Wrapper>

export default Base