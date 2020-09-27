import { Typography } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import React, { FC } from 'react'
import styled from 'styled-components'

interface IProps {
    title: string
    open: boolean
    onClick(): void
}

export const Wrapper = styled.div`
    width: 500px;
    min-height: 400px;
    margin: 50px auto auto auto;
    padding: 20px 40px 40px 40px;
    background-color: #eaeaeaf2;
    box-shadow: 0 0 5px white;
    border-radius: 15px;
    text-align: center;
`

const Modal: FC<IProps> = props =>
    <Wrapper style={{ display: props.open ? 'block' : 'none' }}>
        <HighlightOff
            style={{ float: 'right', marginRight: '-20px', cursor: 'pointer' }}
            onClick={props.onClick}
        />
        <Typography variant='h4' style={{ marginBottom: 20, marginTop: 20 }}>
            {props.title}
        </Typography>
        {props.children}
    </Wrapper>

export default Modal