import React from "react"
import { Text, ErrorIcon } from "leek-uikit"
import styled from "styled-components"
import { ColumnCenter } from "./Column"

type ErrorMessageProps = {
    errorMessage: string
}

const Icon = styled(ColumnCenter)`
  padding: 20px 0;
`

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
    return (
        <Icon>
            <ErrorIcon color="failure" width="60px" />
            <Text color="failure" fontSize="20px" mt="10px">{errorMessage}</Text>
        </Icon>
    )
}

export default ErrorMessage