import { Button, Input, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'
import { URL_BASE } from '.'
import { FormWrapper } from './style'
import { ITouristSpot, emptyState } from './interfaces'
import Base from './Base'
import Modal from './Modal'

const Edit = (props: RouteComponentProps) => {
    const itemEdit: ITouristSpot = props.match.params as ITouristSpot
    const history = useHistory()
    const [inputError, setInputError] = useState(false)
    const [values, setValues] = useState<ITouristSpot>(itemEdit)
    console.log(values)

    const handleOpenList = () => {
        history.push('/')
    }

    function clearForm() {
        setValues(emptyState)
        setInputError(false)
    }

    function edit(values: ITouristSpot) {
        const init: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(values)
        }

        return fetch(`${URL_BASE}/items/${values.id}/`, init)
            .then(async response => {
                if (response.ok) {
                    const resposta = await response.json();
                    return resposta;
                }

                throw new Error('Não foi possível cadastrar os dados :(');
            })
    }

    const handleEdit = (values: ITouristSpot) => {
        edit(values)
            .then(() => {
                console.log('Editado com sucesso!');
                history.push(`/view/${values.id}`);
            });
    }

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()

        if (values.name.length && values.description.length) {
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
        <Base onClick={handleOpenList}>
            <Modal open={true} title='Edição' onClick={handleOpenList}>
                <form onSubmit={handleSubmit}>
                    <FormWrapper>
                        <Input
                            placeholder='Nome'
                            name='name'
                            type='text'
                            value={values.name}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder='Descrição'
                            name='description'
                            type='text'
                            value={values.description}
                            onChange={handleChange}
                        />
                        {inputError && (
                            <Typography variant='caption' color='error'>
                                * Os dois campos são obrigatórios
                            </Typography>
                        )}
                        <Button name='button' variant='contained' color='primary' onClick={handleSubmit}>
                            Confirmar
                        </Button>
                    </FormWrapper>
                </form>

                <div style={{ marginTop: 50 }}>
                    <Link to='/' >
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <ArrowBack /> Voltar à lista
                        </div>
                    </Link>
                </div>
            </Modal>
        </Base>
    )
}

export default Edit