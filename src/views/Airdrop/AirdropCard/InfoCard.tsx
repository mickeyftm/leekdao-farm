import React from "react"
import styled from "styled-components"
import moment from "moment"
import { Card, CardHeader, Heading, Flex, Button, useModal, Text, LinkExternal, Box } from 'leek-uikit'
import { getChainExplorerUrl } from "utils/chainExplorer"
import UnlockButton from "components/UnlockButton"
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { airdropConfig } from "config/constants"
import registerToken from "utils/wallet"
import AirdropInfoHeader from "../General/AirdropInfoHeader"
import AirdropInfoDetails from "../General/AirdropInfoDetails"

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const InfoLayout = styled.div`
    padding:30px;

    @media (max-width: 768px) {
        padding:20px
    }
`

const StyledInfoCard = styled(Card)`
  background-repeat: no-repeat;
  background-size: contain;
  max-height: 400px;
  width: 100%;
`

const InfoCard = () => {
    const { id, name, description, startTime, salesAmount, tokenAddress, tokenDecimals, projectSiteUrl } = airdropConfig
    const launchTime =
        moment.utc(startTime * 1000).format('MMMM Do YYYY, HH:mm')

    const { account } = useWallet()
    const address = tokenAddress[CHAIN_ID]

    return (
        <StyledInfoCard>
            <CardHeader>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading>AirDrop Info</Heading>
                </Flex>
            </CardHeader>

            <InfoLayout>
                <AirdropInfoHeader airdropId={id} name={name} description={description} />
                <AirdropInfoDetails launchTime={launchTime} salesAmount={salesAmount} tokenName={id.toUpperCase()} />

                <hr />
                <Flex alignItems="center" justifyContent="space-between">
                    <div>
                        <LinkExternal mb="5px" style={{ cursor: "pointer" }} href={getChainExplorerUrl(CHAIN_ID, address)}>View Token Contract</LinkExternal>
                        <LinkExternal mb="5px" style={{ cursor: "pointer" }} href={projectSiteUrl}>View Project Site</LinkExternal>
                        {account && (
                            <Flex justifyContent="flex-start" alignItems="center" mb="10px" style={{ cursor: "pointer" }}>
                                <Box
                                    onClick={() => registerToken(address, name, tokenDecimals)}
                                >
                                    <Text color="primary" bold fontSize="16px" mr="5px">
                                        Add to Metamask
                                    </Text>
                                </Box>
                                <img src="./images/metamask.svg" alt="metamask" width="20px" />
                            </Flex>
                        )}
                    </div>

                    {
                        account ? <Button>Claim AirDrop</Button> : <UnlockButton />
                    }
                </Flex>


            </InfoLayout>
        </StyledInfoCard>
    )

}

export default InfoCard