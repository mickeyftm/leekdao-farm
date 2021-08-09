import React from 'react'
import { Modal } from 'leek-uikit'
import LoadingContent from 'components/Transaction/LoadingContent'

type ConfirmationPendingContentProps = {
    title: string
    onDismiss: () => void
}

const ConfirmationPendingContent = ({ title, onDismiss }: ConfirmationPendingContentProps) => {
    return (
        <Modal title={title} onDismiss={onDismiss}>
            <LoadingContent />
        </Modal>
    )
}

export default ConfirmationPendingContent