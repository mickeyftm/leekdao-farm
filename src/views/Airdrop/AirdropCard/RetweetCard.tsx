import React from 'react'
import { Card, CardBody, Heading, CardHeader, Flex, Text } from 'leek-uikit'
import styled from 'styled-components'
import { Tweet } from 'react-twitter-widgets'

const StyledTwitterCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
`

const RetweetCard = () => {

    return (
        <StyledTwitterCard>
            <CardHeader>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading>AirDrop Annoucement</Heading>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text mb="10px">* Retweet this tweet, and copy the link to the participation form</Text>
                <Tweet
                    tweetId="1395016666249981956"
                    options={{
                        height: '300',
                        chrome: 'noheader, nofooter',
                        width: '60%'
                    }}
                />
            </CardBody>
        </StyledTwitterCard>
    )
}

export default RetweetCard