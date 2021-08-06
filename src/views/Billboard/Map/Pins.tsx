import React, { useCallback } from 'react';
import { Marker } from 'react-map-gl';
import styled from 'styled-components';

const ICON = `M12,2 C8.14,2 5,5.14 5,9 C5,13.17 9.42,18.92 11.24,21.11 C11.64,21.59 12.37,21.59 12.77,21.11 C14.58,18.92 19,13.17 19,9 C19,5.14 15.86,2 12,2 Z M15,10 L13,10 L13,12 C13,12.55 12.55,13 12,13 C11.45,13 11,12.55 11,12 L11,10 L9,10 C8.45,10 8,9.55 8,9 C8,8.45 8.45,8 9,8 L11,8 L11,6 C11,5.45 11.45,5 12,5 C12.55,5 13,5.45 13,6 L13,8 L15,8 C15.55,8 16,8.45 16,9 C16,9.55 15.55,10 15,10 Z`;

const SIZE = 35;

const StyledSvg = styled.svg`
    cursor: pointer;
    fill: #AB3395;
    stroke: none;
    transform: translate(-20px, -32px);
`

const StyledImg = styled.img`
    width: 50px;
    height: 50px; 
    borderRadius:50%;
    transform: translate(-20px, -32px);
`

function Pins(props) {
    const { data, onClick } = props;

    return (
        <div>
            {
                data && data.map((city) => (
                    <Marker key={city.id} longitude={city.longitude} latitude={city.latitude} >
                        {
                            city.ipfsHash ?
                                <StyledImg src={`https://ipfs.infura.io/ipfs/${city.ipfsHash}`} alt="city" onClick={() => onClick(city)} /> :
                                <StyledSvg
                                    height={SIZE}
                                    viewBox="0 0 24 24"
                                    onClick={() => onClick(city)}
                                >
                                    <path d={ICON} />
                                </StyledSvg>
                        }


                    </Marker >
                ))
            }
        </div >
    )
}

export default React.memo(Pins);