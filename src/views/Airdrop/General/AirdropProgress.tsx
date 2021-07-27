import React from 'react'
import styled from 'styled-components'
import { Progress } from 'leek-uikit'

interface IfoCardProgressProps {
    progress: number
}

const StyledProgress = styled.div`
  margin-bottom: 16px;
`

const AirdropProgress: React.FC<IfoCardProgressProps> = ({ progress }) => {
    return (
        <StyledProgress>
            <Progress primaryStep={progress} />
        </StyledProgress>
    )
}

export default AirdropProgress