import React from 'react'
import { ButtonMenu, ButtonMenuItem } from 'leek-uikit'

const HistoryTabMenu = ({ setActiveIndex, activeIndex }) => {
    return (
        <ButtonMenu activeIndex={activeIndex} onClick={setActiveIndex} size="sm" variant="subtle">
            <ButtonMenuItem>Current Round</ButtonMenuItem>
            <ButtonMenuItem>All Histories</ButtonMenuItem>
        </ButtonMenu>
    )
}

export default HistoryTabMenu