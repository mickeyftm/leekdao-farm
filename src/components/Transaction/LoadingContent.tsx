import React from 'react'
import styled, { keyframes } from 'styled-components'
import { ColumnCenter } from "./Column"

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.img`
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;

`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 40px 0;
`

const CustomLightSpinner = styled(Spinner) <{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

const LoadingContent = () => {
    return (
        <ConfirmedIcon>
            <CustomLightSpinner src="./images/blue-loader.svg" alt="loader" size="90px" />
        </ConfirmedIcon>
    )
}

export default LoadingContent