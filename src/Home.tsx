import { Button, Input, List, ListItem, Typography } from '@material-ui/core'
import { Cached } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 500px;
    min-height: 400px;
    margin: 50px auto auto auto;
    padding: 40px;
    background-color: #d7d7d7;
    border-radius: 15px;
    text-align: center;
`

const FormWrapper = styled.div`
    display: grid;
    grid-gap: 20px;
`
const LoadingWrapper = styled.div`
    width: 100%;
`

interface IItem {
    id: string
    value1: string
    value2: string
}

const emptyState: IItem = {
    id: '',
    value1: '',
    value2: ''
}

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [inputError, setInputError] = useState(false)
    const [values, setValues] = useState<IItem>(emptyState)
    const [items, setItems] = useState<IItem[]>([
        { id: '1', value1: 'aaa', value2: 'bbb' },
        { id: '2', value1: 'aaa', value2: 'bbb' },
        { id: '3', value1: 'aaa', value2: 'bbb' },
        { id: '4', value1: 'aaa', value2: 'bbb' },
        { id: '5', value1: 'aaa', value2: 'bbb' }
    ])

    useEffect(() => {
        const URL = 'http://localhost:8080/items'
        fetch(URL)
            .then(async response => {
                const items = await response.json()
                setItems([...items])
                setLoading(false)
            })
    }, [])

    function clearForm() {
        setValues(emptyState)
        setInputError(false)
    }

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        if (values.value1.length && values.value2.length) {
            setItems([...items, values])
            clearForm()
            setInputError(false)
        } else {
            setInputError(true)
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const name = event.target.getAttribute('name') || ''
        setValues({
            ...values,
            [name]: event.target.value
        })
    }

    return (
        <Wrapper>
            <Typography variant='h4' style={{ marginBottom: 30 }}>
                Página inicial
            </Typography>

            <form onSubmit={handleSubmit}>
                <FormWrapper>
                    <Input
                        placeholder='Valor 1'
                        name='value1'
                        type='text'
                        value={values.value1}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder='Valor 2'
                        name='value2'
                        type='text'
                        value={values.value2}
                        onChange={handleChange}
                    />
                    { inputError && (
                        <Typography variant='caption' color='error'>
                            * Os dois campos são obrigatórios
                        </Typography>
                    ) }
                    <Button name='button' variant='contained' color='primary' onClick={handleSubmit}>
                        Confirmar
                    </Button>
                </FormWrapper>
            </form>

            { loading && (
                <LoadingWrapper>
                    <Cached style={{ marginTop: 20 }} />
                    <Typography>Carregando lista...</Typography>
                </LoadingWrapper>
            ) }


            <List>
                {items.map(item =>
                    <ListItem key={item.id}>
                        {item.value1} - {item.value2}
                    </ListItem>
                )}
            </List>
        </Wrapper>
    )
}

export default Home