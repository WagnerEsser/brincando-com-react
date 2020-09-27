import { Button, Input, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ILogin } from './interfaces'
import { Form, Wrapper } from './style'

const initial: ILogin = {
    login: '',
    password: ''
}

const Login = () => {
    const [values, setValues] = useState<ILogin>(initial)
    const [error, setError] = useState<string>()
    const history = useHistory()

    const handleConfirm = () => {
        console.log('oi')

        return fetch('http://localhost:8080/users')
            .then(async response => {
                if (response.ok) {
                    const users: ILogin[] = await response.json();
                    const find = users.find(user =>
                        user.login === values.login &&
                        user.password === values.password
                    )
                    if (find) {
                        localStorage.setItem('login', values.login)
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
            <Typography variant='h3'>For You</Typography>

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
                    <Button variant='contained' onClick={handleConfirm} color='primary'>
                        Entrar
                    </Button>
                </Form>
            </form>

            { error && (
                <Typography style={{ color: 'red' }}>
                    {error}
                </Typography>
            )}

            <Typography style={{ color: 'blue', cursor: 'pointer' }}>
                Esqueceu a senha?
            </Typography>

            <Button variant='contained' color='secondary'>
                Criar nova conta
            </Button>
        </Wrapper>
    )
}

export default Login