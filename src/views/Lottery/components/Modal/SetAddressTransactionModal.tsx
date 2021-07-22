import React from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from '../General/Column'
import ErrorMessage from "../General/ErrorMessage"
import LoadingContent from '../General/LoadingContent'
import TransactionMessage from '../General/TransactionMessage'
import { useSetParticipantsToContract } from '../../api'
import store from "../../store/store"

type TransactionSubmittedContentProps = {
    onDismiss: () => void
}

const SetAddressTransactionModal = ({ onDismiss }: TransactionSubmittedContentProps) => {
    useSetParticipantsToContract()
    const state = store.getState();
    let comp;

    if (state.error && state.error.length > 0) {
        comp = <ErrorMessage errorMessage={state.error} />
    } else if (state.addressTx && state.addressTx.length > 0) {
        comp = <TransactionMessage transactionHash={state.addressTx} />
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

export default SetAddressTransactionModal