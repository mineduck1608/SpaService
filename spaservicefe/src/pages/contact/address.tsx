import React, { PropsWithChildren, useState, useEffect } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const LoadScriptFixed = LoadScript as unknown as React.FC<PropsWithChildren<{
    googleMapsApiKey: string
}>>

const GoogleMapFixed = GoogleMap as unknown as React.FC<PropsWithChildren<{
    mapContainerStyle: React.CSSProperties,
    center: google.maps.LatLngLiteral,
    zoom: number,
    onLoad?: (map: google.maps.Map) => void
}>>

const Address = () => {
    const location = {
        lat: 10.781833909720303, 
        lng: 106.70546890071094
    }

    return (
        <div className='w-full h-[400px] md:h-[500px] lg:h-[600px] mt-20 mb-10'>
            <LoadScriptFixed googleMapsApiKey='API_KEY'>
                <GoogleMapFixed
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={location}
                    zoom={13}
                    onLoad={map => console.log('Map loaded:', map)}
                />
            </LoadScriptFixed>
        </div>
    )
}

export default Address
