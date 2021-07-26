import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from 'leek-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import numeral from 'numeral'

interface AirdropInfoDetailsProps {
    launchTime: string
    salesAmount: number
    tokenName: string
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

const AirdropInfoDetails: React.FC<AirdropInfoDetailsProps> = ({
    launchTime,
    salesAmount,
    tokenName
}) => {

    return (
        <>
            <StyledAirdropInfoDetails>
                <Item>
                    <Display>Launch Time</Display>
                    <Text>
                        <Link
                            href="https://www.timeanddate.com/worldclock/timezone/utc"
                            target="blank"
                            rel="noopener noreferrer"
                            ml="4px"
                            style={{ display: 'inline' }}
                        >
                            {launchTime} UTC
                        </Link>
                    </Text>
                </Item>

                <Item>
                    <Display>AirDrop Amount</Display>
                    <Text>
                        {numeral(salesAmount).format('0,0')} {tokenName}
                    </Text>
                </Item>
            </StyledAirdropInfoDetails>

        </>
    )
}

export default AirdropInfoDetails
