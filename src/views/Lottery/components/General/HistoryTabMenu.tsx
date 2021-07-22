import React from 'react'
import { ButtonMenu, ButtonMenuItem } from 'leek-uikit'

const HistoryTabMenu = ({ setActiveIndex, activeIndex }) => {
    return (
        <ButtonMenu activeIndex={activeIndex} onClick={setActiveIndex} size="sm" variant="subtle">
            <ButtonMenuItem>Round Info</ButtonMenuItem>
            <ButtonMenuItem>History Winners</ButtonMenuItem>
        </ButtonMenu>
    )
}

export default HistoryTabMenu