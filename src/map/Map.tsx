import { Button } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import SimpleMap from './SimpleMap'

const Map = () => {

    return (
        <>
            <SimpleMap />
            <div style={{
                position: 'absolute',
                top: 50,
                left: '50%',
                width: 300,
                marginLeft: '-150px'
            }}>
                <Link to='/route'>
                    <Button variant='contained' color='secondary' style={{ width: '100%' }}>
                        <Search />&nbsp;
                        Para onde?
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default Map