import React from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from './Column'
import ErrorMessage from "./ErrorMessage"
import LoadingContent from './LoadingContent'
import TransactionMessage from './TransactionMessage'
import { useGetTransactionHash } from '../api'

type TransactionSubmittedContentProps = {
    onDismiss: () => void
    account: string
}

const TransactionSubmittedContent = ({ onDismiss, account }: TransactionSubmittedContentProps) => {
    const response = useGetTransactionHash(account, 1)

    let comp;

    if (response) {
        if (response.error) {
            comp = <ErrorMessage errorMessage={response.error} />
        } else {
            comp = <TransactionMessage transactionHash={response.transactionHash} />
        }
    } else {
        comp = <LoadingContent />
    }

    return (
        <Modal title="Transaction Submission" onDismiss={onDismiss}>
            {comp}
            <AutoColumn gap="8px" justify="center">
                <Button onClick={onDismiss} mt="20px">
                    Close
                </Button>
            </AutoColumn>
        </Modal>
    )
}

export default TransactionSubmittedContent