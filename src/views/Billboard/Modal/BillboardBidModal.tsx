import React from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from 'components/Transaction/Column'
import TransactionMessage from 'components/Transaction/TransactionMessage'
import { store } from "../store/store"

type TransactionSubmittedContentProps = {
    onDismiss: () => void
}

const BillboardBidModal = ({ onDismiss }: TransactionSubmittedContentProps) => {
    const { bidHash } = store.getState()

    return (
        <Modal title="Transaction Submitted" onDismiss={onDismiss}>
            <TransactionMessage transactionHash={bidHash} />
            <AutoColumn gap="8px" justify="center">
                <Button onClick={onDismiss} mt="20px">
                    Close
                </Button>
            </AutoColumn>
        </Modal>
    )
}

export default BillboardBidModal