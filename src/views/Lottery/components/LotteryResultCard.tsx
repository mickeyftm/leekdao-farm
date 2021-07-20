import React from 'react'
import {
    Card,
    CardHeader,
    Flex,
    Heading,
    LinkExternal,
    Button,
    useModal,
    Text
} from 'leek-uikit'
import truncateWalletAddress from "utils/truncateWalletAddress"
import { getChainExplorerUrl } from 'utils/chainExplorer'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from "styled-components"
import TransactionSubmittedContent from "./TransactionSubmittedModal"
import { ColumnCenter } from "./Column"
import { useGetCurrentRound, useGetWinners } from '../api'

const chainId = process.env.REACT_APP_CHAIN_ID

const StyledResultCard = styled(Card)`
  background-repeat: no-repeat;
  background-size: contain;
  max-height: 250px;
  width: 100%;
  margin-bottom:30px;
`

const ResultContainer = styled(ColumnCenter)`
  padding: 20px 0;
`

const LOTTERY_OWNER = process.env.REACT_APP_LOTTERY_OWNER

const LotteryResultCard: React.FC = () => {
    const winner = useGetWinners(0)
    const round = useGetCurrentRound();
    const { account } = useWallet();
    const isOwner = LOTTERY_OWNER === account
    const [onPresentTransactionSubmittedModal] = useModal(<TransactionSubmittedContent onDismiss={() => { return null }} account={account} />)

    let comp;

    if (winner.length > 0) {
        comp = <div>
            <Heading color="primary">Congratulations! Winner is:</Heading>
            <ResultContainer>
                <LinkExternal href={getChainExplorerUrl(chainId, winner)} fontSize="18px"> {truncateWalletAddress(winner)}</LinkExternal>
            </ResultContainer>
        </div>
    } else {
        comp = <Flex alignItems="center" justifyContent="center" padding="20px">
            <Heading as="h5" style={{ textAlign: "center", lineHeight: "1.5" }}>This Round is still ongoing. Let us expect who will be the winner.</Heading>
        </Flex>

    }

    return (
        <StyledResultCard>
            <CardHeader>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading>Last Round Winner</Heading>
                    {
                        round > 0 ? <Text>Round: #{round - 1}</Text> : ""
                    }

                </Flex>
            </CardHeader>

            <div style={{ padding: "20px" }}>
                {comp}
                {
                    isOwner && (<Button fullWidth onClick={onPresentTransactionSubmittedModal}>Lucky Draw</Button>)
                }
            </div>

        </StyledResultCard>
    )
}

export default LotteryResultCard