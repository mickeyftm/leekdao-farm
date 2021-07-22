import React from 'react'
import truncateWalletAddress from "utils/truncateWalletAddress"
import { getChainExplorerUrl } from 'utils/chainExplorer'
import { Flex, LinkExternal, Text } from 'leek-uikit'
import Row, { AddressColumn, ChoiceColumn, VotingPowerColumn } from './Row'

interface ListProps {
    address: string,
    level: string,
    score: string
}

const chainId = process.env.REACT_APP_CHAIN_ID

const ParticipantsListRow: React.FC<ListProps> = ({ address, level, score }) => {
    return (
        <Row>
            <AddressColumn>
                <Flex alignItems="center">
                    <LinkExternal href={getChainExplorerUrl(chainId, address)}>{truncateWalletAddress(address)}</LinkExternal>
                </Flex>
            </AddressColumn>
            <ChoiceColumn>
                <Text>{level}</Text>
            </ChoiceColumn>
            <VotingPowerColumn>
                <Flex alignItems="center" justifyContent="end">
                    {score}
                </Flex>
            </VotingPowerColumn>
        </Row>
    )
}

export default ParticipantsListRow