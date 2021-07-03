import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, Modal } from 'leek-uikit'
import { ConfirmedIcon } from './helpers'

type ConfirmationPendingContentProps = { onDismiss: () => void }

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

const CustomLightSpinner = styled(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

const ConfirmationPendingContent = ({ onDismiss }: ConfirmationPendingContentProps) => {
  return (
    <Modal title="Waiting for confirmation" onDismiss={onDismiss}>
      <ConfirmedIcon>
        <CustomLightSpinner src="/images/blue-loader.svg" alt="loader" size="90px" />
      </ConfirmedIcon>
    </Modal>
  )
}

export default ConfirmationPendingContent
