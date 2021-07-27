import React from 'react'
import {
    Card,
    CardHeader,
    Flex,
    Heading,
    LinkExternal,
    Button,
    useModal,
    Text,
} from 'leek-uikit'
import truncateWalletAddress from "utils/truncateWalletAddress"
import { getChainExplorerUrl } from 'utils/chainExplorer'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useLottery } from 'hooks/useContract'
import styled from "styled-components"
import WinnerNumberInputModal from '../Modal/WinnerNumberInputModal'
import { ColumnCenter } from "../General/Column"
import ApproveTransactionModal from '../Modal/ApproveTransactionModal'
import ConfirmationPendingContent from '../Modal/ConfirmationPendingModal'
import ErrorMessageModal from '../Modal/ErrorMessageModal'
import { useGetCurrentRound, useGetWinners, useGetNotParticipatedList, updateParticipationStatus } from '../../api'
import { store } from "../../store/store"
import { GET_ADDRESS_TRANSACTION_HASH, RESET_TO_DEFAULT_STATE, UPDATE_ERROR_MESSAGE } from "../../store/reducer"

const chainId = process.env.REACT_APP_CHAIN_ID

const StyledResultCard = styled(Card) <{ size: number }>`
  background-repeat: no-repeat;
  background-size: contain;
  max-height: ${({ size }) => size}px;
  width: 100%;
`

const ResultContainer = styled(ColumnCenter)`
  padding: 20px 0;
`

const LOTTERY_OWNER = process.env.REACT_APP_LOTTERY_OWNER

const LotteryResultCard: React.FC = () => {
    const winners = useGetWinners()
    const round = useGetCurrentRound();
    const { account } = useWallet();
    const isOwner = LOTTERY_OWNER === account
    const notParticpatedList = useGetNotParticipatedList()
    const [onPresentWinnerNumberInputModal] = useModal(<WinnerNumberInputModal onDismiss={() => { return null }} account={account} />)
    const [onPresentApproveTransactionModal] = useModal(<ApproveTransactionModal onDismiss={() => { return null }} />)
    const [onPresentConfrimationModal] = useModal(<ConfirmationPendingContent onDismiss={() => { return null }} />)
    const [onPresentErrorMessageModal] = useModal(<ErrorMessageModal onDismiss={() => { return null }} />)
    const contract = useLottery();
    const state = store.getState()
    const isAddressSentToContract1 = state.error === "There are no new participants"
    const isAddressSentToContract2 = state.addressTx && state.addressTx.length > 0

    const submitRequest = async () => {
        onPresentConfrimationModal();
        store.dispatch({ type: RESET_TO_DEFAULT_STATE })
        if (notParticpatedList.error) {
            const action = {
                type: UPDATE_ERROR_MESSAGE,
                error: notParticpatedList.error,
            }
            store.dispatch(action);
            onPresentErrorMessageModal()
        } else {
            const result = await contract.methods.participate(notParticpatedList).send({ from: account })
            if (result) {
                const action = {
                    type: GET_ADDRESS_TRANSACTION_HASH,
                    addressTx: result.transactionHash,
                    error: result.error,
                }
                store.dispatch(action);
                onPresentApproveTransactionModal();
                await updateParticipationStatus();
            }
        }

        return null;


    }

    let comp;

    if (winners && winners.length > 0) {
        comp = <div>
            <Heading color="primary">Congratulations! {winners.length === 1 ? "Winner is:" : "Winners are"}</Heading>
            <ResultContainer>
                {
                    winners.map((item) => (
                        <LinkExternal key={item} href={getChainExplorerUrl(chainId, item)} fontSize="18px"> 🏆 {truncateWalletAddress(item)}</LinkExternal>
                    ))
                }

            </ResultContainer>
        </div>
    } else {
        comp = <Flex alignItems="center" justifyContent="center" padding="20px">
            <Heading as="h5" style={{ textAlign: "center", lineHeight: "1.5" }}>No winners Found. Let us expect who will be the winner.</Heading>
        </Flex>

    }

    return (
        <StyledResultCard size={250 + winners.length * 30}>
            <CardHeader>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading>Last Round Winner(s)</Heading>
                    {
                        round > 0 ? <Text>Round: #{round - 1}</Text> : ""
                    }

                </Flex>
            </CardHeader>

            <div style={{ padding: "20px" }}>
                {comp}
                {
                    isOwner && (

                        <div>
                            <Flex alignItems="center" justifyContent="space-between">
                                <Button onClick={submitRequest} disabled={isAddressSentToContract1 || isAddressSentToContract2}>Approve</Button>
                                <Button onClick={onPresentWinnerNumberInputModal} disabled={!isAddressSentToContract1 && !isAddressSentToContract2}>Lucky Draw</Button>
                            </Flex>
                        </div>
                    )
                }
            </div>

        </StyledResultCard>
    )
}

export default LotteryResultCard