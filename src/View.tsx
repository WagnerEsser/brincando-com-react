import { Typography } from '@material-ui/core'
import { ArrowBack, Cached, Delete, Edit } from '@material-ui/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'
import { IItem, Wrapper, LoadingWrapper } from './Home'

const View = (props: RouteComponentProps) => {
    const { id } = props.match.params as { id: string }
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [values, setValues] = useState<IItem>({
        id: '---',
        value1: '---',
        value2: '---'
    })

    const refresh = useCallback(() => {
        if (id.length > 0) {
            const URL = `http://localhost:8080/items/${id}`
            fetch(URL)
                .then(async response => {
                    const item = await response.json()
                    setValues(item)
                    setTimeout(() => {
                        setLoading(false)
                    }, 500)
                })
        }
    }, [id])

    useEffect(() => {
        refresh()
    }, [refresh])

    const handleDelete = (id: string) => (event: { preventDefault: () => void }) => {
        event.preventDefault()

        const init: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        }

        return fetch(`http://localhost:8080/items/${id}/`, init)
            .then(async response => {
                if (response.ok) {
                    const resposta = await response.json();
                    history.push('/')
                    return resposta;
                }

                throw new Error('Não foi possível excluir o item :(');
            })
    }

    return (
        <Wrapper>
            <Typography variant='h4' style={{ marginBottom: 30 }}>
                Informações do ponto turítico
            </Typography>

            { loading && (
                <LoadingWrapper>
                    <Cached style={{ marginTop: 20 }} />
                    <Typography>Carregando ponto turístico...</Typography>
                </LoadingWrapper>
            )}

            { !loading && (
                <div style={{ display: 'flex', placeContent: 'space-between' }}>
                    {values.value1} - {values.value2}
                    <div>
                        <Link to={`/edit/${values.id}/${values.value1}/${values.value2}`}>
                            <Edit />
                        </Link>
                        &nbsp;
                        <a href='.' onClick={ handleDelete(values.id) }>
                            <Delete />
                        </a>
                    </div>
                </div>
            ) }

            <div style={{ marginTop: 50 }}>
                <Link to='/' >
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <ArrowBack /> Voltar à página inicial
                    </div>
                </Link>
            </div>
        </Wrapper>
    )
}

export default View