import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'


const SimpleMap = (props: any) => {
    const [center] = useState({ lat: -26.301942, lng: -48.847685 })
    const [zoom] = useState(11)

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyD7fLgzXiX5e7BVbrOW90ybNOV2wupTTmk' }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <Marker
                    lat={-26.301942}
                    lng={-48.847685}
                    name="My Marker"
                    color="blue"
                />
            </GoogleMapReact>
        </div>
    )
}

export default SimpleMap