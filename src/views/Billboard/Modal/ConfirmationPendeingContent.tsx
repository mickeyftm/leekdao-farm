import React from 'react'
import { Modal } from 'leek-uikit'
import LoadingContent from 'components/Transaction/LoadingContent'

type ConfirmationPendingContentProps = { onDismiss: () => void }

const ConfirmationPendingContent = ({ onDismiss }: ConfirmationPendingContentProps) => {
    return (
        <Modal title="Waiting for confirmation" onDismiss={onDismiss}>
            <LoadingContent />
        </Modal>
    )
}

export default ConfirmationPendingContent