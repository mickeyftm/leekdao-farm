import React from 'react'
import styled from 'styled-components'
import { Text, Link } from 'leek-uikit'
import { getBlockInfo } from 'utils/chainExplorer'
import numeral from 'numeral'

interface AirdropInfoDetailsProps {
    startBlock: number
    endBlock: number
    airdropAmount: number
    vipAirdropAmount: number
    remainingTokens: number
    tokenName: string
    totalAmount: number
}


const StyledAirdropInfoDetails = styled.div`
  margin-bottom: 24px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
`

const chainId = process.env.REACT_APP_CHAIN_ID

const AirdropInfoDetails: React.FC<AirdropInfoDetailsProps> = ({
    startBlock,
    endBlock,
    airdropAmount,
    vipAirdropAmount,
    remainingTokens,
    totalAmount,
    tokenName
}) => {

    return (
        <>
            <StyledAirdropInfoDetails>
                <Item>
                    <Display>Start Block</Display>
                    <Text>
                        <Link
                            href={getBlockInfo(chainId, startBlock)}
                            target="blank"
                            style={{ display: 'inline' }}
                        >
                            # {startBlock}
                        </Link>
                    </Text>
                </Item>

                <Item>
                    <Display>End Block</Display>
                    <Text>
                        <Link
                            href={getBlockInfo(chainId, endBlock)}
                            target="blank"
                            style={{ display: 'inline' }}
                        >
                            # {endBlock}
                        </Link>
                    </Text>
                </Item>

                <Item>
                    <Display>AirDrop Amount/Person</Display>
                    <Text>
                        {numeral(airdropAmount).format('0,0')} {tokenName}
                    </Text>
                </Item>

                <Item>
                    <Display>AirDrop Amount/VIP Person</Display>
                    <Text>
                        {numeral(vipAirdropAmount).format('0,0')} {tokenName}
                    </Text>
                </Item>

                <Item>
                    <Display>Total Airdrop Amount</Display>
                    <Text>
                        {numeral(totalAmount).format('0,0')} {tokenName}
                    </Text>
                </Item>

                <Item>
                    <Display>Remaining Amount</Display>
                    <Text>
                        {numeral(remainingTokens).format('0,0')} {tokenName}
                    </Text>
                </Item>
            </StyledAirdropInfoDetails>
        </>
    )
}

export default AirdropInfoDetails
