import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    ChevronDownIcon,
    Flex,
    Heading,
    Button,
    ChevronUpIcon,
    Text,
} from 'leek-uikit'
import Row, { AddressColumn, VotingPowerColumn } from '../General/Row'
import WinnersListRow from "../General/WinnersListRow"
import { useGetCurrentRound, useFetchWinnersAndRound } from '../../api'
import LoadingContent from '../General/LoadingContent'
import { loadingStore } from '../../store/store'

const LIST_PER_VIEW = 5

const AllHistoryResultCard: React.FC = () => {
    const round = useGetCurrentRound()
    const winnersList = useFetchWinnersAndRound(round).sort((itemA, itemB) => itemB.round - itemA.round);
    const [showAll, setShowAll] = useState(false)
    const displayList = showAll ? winnersList : winnersList.slice(0, LIST_PER_VIEW)
    const { isLoading } = loadingStore.getState()

    const handleClick = () => {
        setShowAll(!showAll)
    }
    let comp;

    if (!isLoading) {
        if (displayList.length === 0) {
            comp = <Flex alignItems="center" justifyContent="center" py="32px">
                <Heading as="h5">No Winners found</Heading>
            </Flex>
        } else {
            comp = displayList.map((item) => (
                <WinnersListRow key={item.address} address={item.address} round={item.round} />
            ))
        }
    } else {
        comp = <LoadingContent />
    }

    return (
        <Card>
            <CardHeader>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading>Lucky Draw Winners History Results</Heading>
                    <Text>Total Winners: {winnersList.length}</Text>
                </Flex>
            </CardHeader>

            <Row>
                <AddressColumn>
                    <Text fontSize="12px" color="textSubtle" textTransform="uppercase" bold>
                        Lucky Draw Winner Address
                    </Text>
                </AddressColumn>
                <VotingPowerColumn>
                    <Text fontSize="12px" color="textSubtle" textTransform="uppercase" bold>
                        Round No
                    </Text>
                </VotingPowerColumn>
            </Row>
            {comp}
            {
                !isLoading && displayList.length > 0 && (<Flex alignItems="center" justifyContent="center" py="8px" px="24px">
                    <Button
                        onClick={handleClick}
                        variant="text"
                        endIcon={
                            showAll ? (
                                <ChevronUpIcon color="primary" width="21px" />
                            ) : (
                                <ChevronDownIcon color="primary" width="21px" />
                            )
                        }
                    >
                        {showAll ? "Hide" : "See All"}
                    </Button>
                </Flex>)
            }
        </Card>
    )
}

export default AllHistoryResultCard