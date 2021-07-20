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
import Row, { AddressColumn, ChoiceColumn, VotingPowerColumn } from './Row'
import ListRow from "./ListRow"


const AllHistoryResultCard: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading>Lucky Draw History Results</Heading>
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
                        Round
                    </Text>
                </VotingPowerColumn>
            </Row>
            {/* {comp}
            {
                displayList.length > 0 && (<Flex alignItems="center" justifyContent="center" py="8px" px="24px">
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
            } */}
        </Card>
    )
}

export default AllHistoryResultCard