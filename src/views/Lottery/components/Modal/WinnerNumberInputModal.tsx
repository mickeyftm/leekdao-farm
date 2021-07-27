import React, { useState } from 'react'
import { Button, Modal, Flex, Input, Heading, useModal } from 'leek-uikit'
import { useLottery } from 'hooks/useContract'
import LuckyDrawTransactionModal from "./LuckyDrawTransactionModal"
import ConfirmationPendingContent from './ConfirmationPendingModal'
import { store } from "../../store/store"
import { GET_LUCKY_DRAW_TRANSACTION_HASH, RESET_TO_DEFAULT_STATE } from '../../store/reducer'

type WinnerNumberInputProps = {
    onDismiss: () => void
    account: string
}

const WinnerNumberInputModal = ({ onDismiss, account }: WinnerNumberInputProps) => {
    const [number, setNumber] = useState(0)
    const [onPresentLuckyDrawTransactionModal] = useModal(<LuckyDrawTransactionModal onDismiss={() => { return null }} />)
    const [onPresentConfrimationModal] = useModal(<ConfirmationPendingContent onDismiss={() => { return null }} />)
    const contract = useLottery();
    const isNumberValid = number > 0

    const submitRequest = async () => {
        onPresentConfrimationModal();
        store.dispatch({ type: RESET_TO_DEFAULT_STATE })
        const result = await contract.methods.luckyDraw(number).send({ from: account })
        if (result) {
            const action = {
                type: GET_LUCKY_DRAW_TRANSACTION_HASH,
                luckyDrawTx: result.transactionHash,
            }
            store.dispatch(action);
            onPresentLuckyDrawTransactionModal();
        }
        return null;

    }
    return (
        <Modal title="Set Winners Number" onDismiss={onDismiss}>
            <div>
                <Heading color="primary" size="md" mb="10px">Winners Number of this Round:</Heading>
                <div>
                    <Input
                        placeholder="Enter Winners Number..."
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(parseInt(e.currentTarget.value) || 0)}
                        min="0" />
                </div>
            </div>


            <Flex alignItems="center" justifyContent="space-between">
                <Button onClick={submitRequest} mt="20px" disabled={!isNumberValid}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={onDismiss} mt="20px" >
                    Close
                </Button>
            </Flex>
        </Modal>
    )
}

export default WinnerNumberInputModal