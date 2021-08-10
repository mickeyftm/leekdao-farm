import React from "react"
import styled from "styled-components"
import BigNumber from "bignumber.js"
import { getBalanceNumber } from "utils/formatBalance"
import { Text, Button, Heading, Flex, Box, BaseLayout, LinkExternal, Link } from "leek-uikit"
import truncateWalletAddress from "utils/truncateWalletAddress"
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from "components/UnlockButton"
import { getChainExplorerUrl } from "utils/chainExplorer"
import { bidStore } from "../store/store"
import { SHOW_FORM } from "../store/reducer"

const chainId = process.env.REACT_APP_CHAIN_ID

const BillboardLayout = styled(BaseLayout)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding:30px;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 0.8fr 1fr;
  }
`

const BillboardDetails = (props) => {
    const { info, baseInfo } = props;
    const { ipfsHash, desc, bidLevel, owner, twitter } = info;
    const basePrice = baseInfo && baseInfo.basePrice
    const formatedBasePrice = getBalanceNumber(new BigNumber(basePrice));
    const { account } = useWallet()

    const bid = () => {
        bidStore.dispatch({ type: SHOW_FORM })
    }

    return (
        <BillboardLayout>
            <img src={`https://ipfs.infura.io/ipfs/${ipfsHash}`} alt="city" width={300} />
            <Box>
                <div style={{ marginBottom: "10px" }}>
                    <Heading size="lg" color="secondary">{desc}</Heading>
                </div>

                <Flex alignItems="center" justifyContent="start">
                    <Text bold marginRight="10px">Owner:</Text>
                    <LinkExternal href={getChainExplorerUrl(chainId, owner)}>{truncateWalletAddress(owner)}</LinkExternal>
                </Flex>

                {
                    twitter && <Flex alignItems="center" justifyContent="start">
                        <Text bold marginRight="10px">Twitter:</Text>
                        <Link href={`https://twitter.com/${twitter}`} target="_blank">@{twitter}</Link>
                    </Flex>
                }

                <Flex alignItems="center" justifyContent="start">
                    <Text bold marginRight="10px">Bid Level:</Text>
                    <Text>{bidLevel}</Text>
                </Flex>

                <Flex alignItems="center" justifyContent="start">
                    <Text bold marginRight="10px">Bid Price:</Text>
                    <Text>{formatedBasePrice * bidLevel} LEEK</Text>
                </Flex>

                {
                    account ? <Button size="sm" mt="10px" onClick={bid}>Bid Here</Button> : <UnlockButton size="sm" mt="10px" />
                }

            </Box>
        </BillboardLayout >
    )
}

export default React.memo(BillboardDetails)