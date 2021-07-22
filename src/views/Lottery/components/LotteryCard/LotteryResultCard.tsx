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
import styled from "styled-components"
import SetAddressTransactionModal from '../Modal/SetAddressTransactionModal'
import WinnerNumberInputModal from '../Modal/WinnerNumberInputModal'
import { ColumnCenter } from "../General/Column"
import { useGetCurrentRound, useGetWinners } from '../../api'
import { store } from "../../store/store"

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
    const [onPresentSetAddressTransactionModal] = useModal(<SetAddressTransactionModal onDismiss={() => { return null }} />)
    const [onPresentWinnerNumberInputModal] = useModal(<WinnerNumberInputModal onDismiss={() => { return null }} account={account} />)
    const state = store.getState();
    const isAddressSentToContract1 = state.error === "No new participants attended"
    const isAddressSentToContract2 = state.addressTx && state.addressTx.length > 0


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
        <StyledResultCard size={250 + winners.length * 25}>
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
                            <Flex alignItems="center" justifyContent="space-between" mt="20px">
                                <Button onClick={onPresentSetAddressTransactionModal} disabled={isAddressSentToContract1 || isAddressSentToContract2}>Approve</Button>
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