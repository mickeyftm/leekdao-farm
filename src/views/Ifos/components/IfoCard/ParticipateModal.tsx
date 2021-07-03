import React, { useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
// import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, useModal } from 'leek-uikit'
import BalanceInput from 'components/Input/BalanceInput'
import { getBalanceNumber, getMainTokenBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import TransactionSubmittedContent from './TransactionSubmittedContent'
import ConfirmationPendingContent from "./ConfirmationPendingContent"
import store from "../../store/store"
import { GET_TRANSACTION_HASH } from "../../store/reducer"

interface Props {
    tokenName: string
    onDismiss?: () => void
    contract: any
}

const ParticipateModal: React.FC<Props> = ({ tokenName, onDismiss = () => null, contract }) => {
    const [value, setValue] = useState('')
    const wallet = useWallet();
    const balance = getBalanceNumber(new BigNumber(wallet.balance)).toFixed(4)
    const { account } = useWallet();
    const inputValue = getMainTokenBalance(new BigNumber(value))

    const buyTokens = async () => {
        onPresentPendingModal()
        const result = await contract.methods.buyTokens(account).send({ from: account, value: inputValue })
        if (result) {
            const action = {
                type: GET_TRANSACTION_HASH,
                hash: result.transactionHash
            }
            store.dispatch(action)
            onPresentSubmittedModal();
        }
    }

    const [onPresentPendingModal] = useModal(<ConfirmationPendingContent onDismiss={onDismiss} />)
    const [onPresentSubmittedModal] = useModal(<TransactionSubmittedContent onDismiss={onDismiss} />)

    return (
        <>
            <Modal title="Participate LEEK IDO" onDismiss={onDismiss}>
                <BalanceInput
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    symbol="MATIC"
                    max={balance}
                    onSelectMax={() => setValue(balance)}
                />
                <Flex justifyContent="space-between" mb="24px">
                    <Button variant="primary" mr="8px" onClick={buyTokens}>
                        Buy {tokenName}
                    </Button>

                    <Button variant="secondary" mr="8px" onClick={onDismiss}>
                        Cancel
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}

export default ParticipateModal
