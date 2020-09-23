import { Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 15px;
`

const PageNotFound = () => {
    return (
        <Wrapper>
            <Link to='/' style={{ display: 'flex', alignItems: 'center'}}>
                <ArrowBack style={{ marginRight: 5 }} />
                Página inicial
            </Link>
            <hr />
            <Typography variant='h4'>Página não encontrada!</Typography>
        </Wrapper>
    )
}

export default PageNotFound
