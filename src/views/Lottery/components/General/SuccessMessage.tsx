import React from "react"
import { Text, CheckmarkCircleIcon } from "leek-uikit"
import styled from "styled-components"
import { ColumnCenter } from "./Column"

const Icon = styled(ColumnCenter)`
  padding: 20px 0;
`

const SuccessMessage: React.FC = () => {
    return (
        <Icon>
            <CheckmarkCircleIcon color="success" width="60px" />
            <Text color="success" fontSize="20px" mt="10px">Thank you for your participation!</Text>
        </Icon>
    )
}

export default SuccessMessage