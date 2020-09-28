import { Button, Input, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { IP_SERVER } from '..'

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 350px;
    min-height: 350px;
    margin-top: 100px;
    padding: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    border: 2px solid black;
`
const Form = styled.div`
    text-align: center;
`

export interface ILogin {
    login: string
    password: string
}

const initial: ILogin = {
    login: '',
    password: ''
}

const Login = () => {
    const [values, setValues] = useState<ILogin>(initial)
    const [error, setError] = useState<string>()
    const history = useHistory()

    const handleConfirm = () => {
        return fetch(`${IP_SERVER}/users`)
            .then(async response => {
                if (response.ok) {
                    const users: ILogin[] = await response.json();
                    const find = users.find(user =>
                        user.login === values.login &&
                        user.password === values.password
                    )
                    if (find) {
                        history.push('/map')
                    } else {
                        setError('Login e senha inválidos! Tente novamente.')
                    }

                    return users;
                }
                throw new Error('Ocorreu algum erro na comunicação com o servidor');
            }).catch(err => console.log(err))
    }

    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const name = event.target.getAttribute('name') || ''
        setValues({ ...values, [name]: event.target.value })
    }

    return (
        <Wrapper>
            <Typography variant='h3' style={{ marginBottom: 20 }}>
                For You
            </Typography>

            <form onSubmit={handleConfirm}>
                <Form>
                    <Input
                        name='login'
                        type='text'
                        placeholder='Login'
                        value={values.login}
                        onChange={handleChange}
                    />
                    <Input
                        name='password'
                        type='password'
                        placeholder='Senha'
                        value={values.password}
                        onChange={handleChange}
                    />
                    <Button
                        variant='contained'
                        onClick={handleConfirm}
                        color='primary'
                        style={{ marginBottom: 20, marginTop: 20 }}>
                        Entrar
                    </Button>
                </Form>
            </form>

            { error && (
                <Typography style={{ color: 'red', marginBottom: 20 }}>
                    {error}
                </Typography>
            )}

            <Typography style={{ color: 'blue', cursor: 'pointer', marginBottom: 5 }}>
                Esqueceu a senha?
            </Typography>

            <Button variant='contained' color='secondary'>
                Criar nova conta
            </Button>
        </Wrapper>
    )
}

export default Login