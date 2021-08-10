import React, { useState, useEffect } from 'react';
import MapGL, {
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import useTheme from 'hooks/useTheme'
import Pins from './Pins';
import BillboardForm from './BillboardForm';
import BillboardDetails from './BillboardDetails';
import { useGetBillboardDetails } from "../api/index"
import { bidStore, billboardStore } from "../store/store"
import { HIDE_FORM } from '../store/reducer';


const TOKEN = process.env.REACT_APP_MAP_TOKEN

const geolocateStyle = {
    top: 0,
    left: 0,
    padding: '10px',
};

const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: '10px',
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
    const { isDark } = useTheme()

    useGetBillboardDetails();

    const { cities } = billboardStore.getState();

    const { show } = bidStore.getState()

    const [popupInfo, setPopupInfo] = useState(null);

    useEffect(() => {
        const mapbox = document.getElementsByClassName('mapboxgl-map')[0]
        const closeButton = document.getElementsByClassName('mapboxgl-popup-close-button')[0]
        const popupContent = document.getElementsByClassName("mapboxgl-popup-content")[0]

        if (mapbox) {
            if (popupInfo) {
                mapbox.setAttribute("style", "position: absolute; width: 100%; height: 100%; overflow: hidden; visibility: inherit; opacity:50%")


                if (isDark) {
                    popupContent.setAttribute('style', "background:#18151f")
                    closeButton.setAttribute('style', "font-size:50px; width:50px;color:#c9c4d4")
                } else {
                    popupContent.setAttribute('style', "background:#fff")
                    closeButton.setAttribute('style', "font-size:50px; width:50px;color:#483f5a")
                }
            } else {
                mapbox.setAttribute('style', 'position: absolute; width: 100%; height: 100%; overflow: hidden; visibility: inherit;')

            }
        }
    }, [popupInfo, isDark])

    let comp = <BillboardForm info={popupInfo} setPopupInfo={setPopupInfo} />;

    if (popupInfo && popupInfo.ipfsHash) {
        if (show) {
            comp = <BillboardForm info={popupInfo} setPopupInfo={setPopupInfo} />
        } else {
            comp = <BillboardDetails info={popupInfo} />
        }
    }


    return (
        <>
            <MapGL
                {...viewport}
                width="100%"
                height="100vh"
                mapStyle={!isDark ? "mapbox://styles/mapbox/streets-v10" : 'mapbox://styles/mapbox/dark-v10'}
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
                        onClose={() => {
                            setPopupInfo(null)
                            bidStore.dispatch({ type: HIDE_FORM })
                        }
                        }
                    >
                        {comp}
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