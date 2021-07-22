import React from 'react'
import truncateWalletAddress from "utils/truncateWalletAddress"
import { getChainExplorerUrl } from 'utils/chainExplorer'
import { Flex, LinkExternal, Text } from 'leek-uikit'
import Row, { AddressColumn, VotingPowerColumn } from './Row'

interface ListProps {
    address: string,
    round: number
}

const chainId = process.env.REACT_APP_CHAIN_ID

const WinnersListRow: React.FC<ListProps> = ({ address, round }) => {
    return (
        <Row>
            <AddressColumn>
                <Flex alignItems="center">
                    <LinkExternal href={getChainExplorerUrl(chainId, address)}>{truncateWalletAddress(address)}</LinkExternal>
                </Flex>
            </AddressColumn>
            <VotingPowerColumn>
                <Flex alignItems="center" justifyContent="end">
                    <Text>Round: #{round}</Text>
                </Flex>
            </VotingPowerColumn>
        </Row>
    )
}

export default WinnersListRow