import { Button, Input, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'
import { IItem, emptyState, Wrapper, FormWrapper } from './Home'

const Edit = (props: RouteComponentProps) => {
    const itemEdit: IItem = props.match.params as IItem
    const history = useHistory()
    const [inputError, setInputError] = useState(false)
    const [values, setValues] = useState<IItem>(itemEdit)

    function clearForm() {
        setValues(emptyState)
        setInputError(false)
    }

    function edit(values: IItem) {
        const init: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
              },
            body: JSON.stringify(values)
        }

        return fetch(`http://localhost:8080/items/${values.id}/`, init)
            .then(async response => {
                if (response.ok) {
                    const resposta = await response.json();
                    return resposta;
                }
        
                throw new Error('Não foi possível cadastrar os dados :(');
            })
    }

    const handleEdit = (values: IItem) => {
        edit(values)
            .then(() => {
              console.log('Editado com sucesso!');
              history.push(`/view/${values.id}`);
            });
    }

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()

        if (values.value1.length && values.value2.length) {
            handleEdit(values)
            clearForm()
            setInputError(false)
            history.push('/')
        } else {
            setInputError(true)
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const name = event.target.getAttribute('name') || ''
        setValues({ ...values, [name]: event.target.value })
    }

    return (
        <Wrapper>
            <Typography variant='h4' style={{ marginBottom: 30 }}>
                Edição
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
            
            <div style={{ marginTop: 50}}>
                <Link to='/' >
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <ArrowBack /> Voltar à página inicial
                    </div>
                </Link>
            </div>
        </Wrapper>
    )
}

export default Edit