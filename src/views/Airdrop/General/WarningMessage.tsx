import React from "react"
import { Text, WarningIcon } from "leek-uikit"
import styled from "styled-components"
import { ColumnCenter } from "./Column"

type WarningMessageProps = {
    waringMessage: string
}

const Icon = styled(ColumnCenter)`
  padding: 20px 0;
`

const WarningMessage: React.FC<WarningMessageProps> = ({ waringMessage }) => {
    return (
        <Icon>
            <WarningIcon color="warning" width="60px" />
            <Text color="warning" fontSize="20px" mt="10px" style={{ width: "350px", textAlign: "center" }}>{waringMessage}</Text>
        </Icon>
    )
}

export default WarningMessage