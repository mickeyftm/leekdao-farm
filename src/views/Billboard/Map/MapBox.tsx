import React, { useState, useEffect } from 'react';
import MapGL, {
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import Pins from './Pins';
import BillboardForm from './BillboardForm';
import { useGetBillboardDetails } from "../api/index"

const TOKEN = process.env.REACT_APP_MAP_TOKEN

const geolocateStyle = {
    top: 0,
    left: 0,
    padding: '10px'
};

const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: '10px'
};

const navStyle = {
    top: 72,
    left: 0,
    padding: '10px'
};

const scaleControlStyle = {
    bottom: 36,
    left: 0,
    padding: '10px'
};

const Map = () => {
    const [viewport, setViewport] = useState({
        latitude: 51.29,
        longitude: 0,
        zoom: 1.5,
        bearing: 0,
        pitch: 0
    });

    const cities = useGetBillboardDetails();

    const [popupInfo, setPopupInfo] = useState(null);

    useEffect(() => {
        const mapbox = document.getElementsByClassName('mapboxgl-map')[0]
        if (mapbox) {
            if (popupInfo) {
                mapbox.setAttribute("style", "position: absolute; width: 100%; height: 100%; overflow: hidden; visibility: inherit; opacity:50%")
            } else {
                mapbox.setAttribute('style', 'position: absolute; width: 100%; height: 100%; overflow: hidden; visibility: inherit;')

            }
        }
    }, [popupInfo])


    return (
        <>
            <MapGL
                {...viewport}
                width="100%"
                height="100vh"
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={setViewport}
                mapboxApiAccessToken={TOKEN}
            >

                <Pins data={cities} onClick={setPopupInfo} zoom={viewport.zoom} />

                {popupInfo && (
                    <Popup
                        tipSize={10}
                        anchor="bottom"
                        longitude={popupInfo.longitude}
                        latitude={popupInfo.latitude}
                        closeOnClick={false}
                        onClose={setPopupInfo}
                    >
                        <BillboardForm info={popupInfo} />
                    </Popup>
                )}

                <GeolocateControl style={geolocateStyle} />
                <FullscreenControl style={fullscreenControlStyle} />
                <NavigationControl style={navStyle} />
                <ScaleControl style={scaleControlStyle} />
            </MapGL>
        </>
    );
}

export default Map