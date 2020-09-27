import { Button } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
// import SimpleMap from './SimpleMap'

const Map = () => {

    return (
        <>
            {/* <SimpleMap /> */}
            <Link to='/route'>
                <Button variant='contained'>
                    <Search />&nbsp;
                    Para onde?
                </Button>
            </Link>
        </>
    )
}

export default Map