import React from "react"
import { Card, CardHeader, Heading, Flex, Button, useModal, Text } from 'leek-uikit'

const InfoCard = () => {
    return (
        <Card>
            <CardHeader>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading>Token Info</Heading>
                </Flex>
            </CardHeader>
        </Card>
    )

}

export default InfoCard