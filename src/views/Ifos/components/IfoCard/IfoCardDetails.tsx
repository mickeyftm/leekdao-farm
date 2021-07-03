import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from 'leek-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import numeral from 'numeral'

export interface IfoCardDetailsProps {
  launchTime: string
  closingTime: string
  salesAmount: number
  projectSiteUrl: string
  rate: number
  mainToken: string
  tokenName: string
  availableToken: number
}

const StyledIfoCardDetails = styled.div`
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

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  launchTime,
  closingTime,
  salesAmount,
  projectSiteUrl,
  rate,
  mainToken,
  tokenName,
  availableToken,
}) => {
  const TranslateString = useI18n()
  const tokenNumber = getBalanceNumber(new BigNumber(availableToken))

  return (
    <>
      <StyledIfoCardDetails>
        <Item>
          <Display>Launch Time</Display>
          <Text>
            <Link
              href="https://www.timeanddate.com/time/zones/aest"
              target="blank"
              rel="noopener noreferrer"
              ml="4px"
              style={{ display: 'inline' }}
            >
              {launchTime}
            </Link>
          </Text>
        </Item>

        <Item>
          <Display>Closing Time</Display>
          <Text>
            <Link
              href="https://www.timeanddate.com/time/zones/aest"
              target="blank"
              rel="noopener noreferrer"
              ml="4px"
              style={{ display: 'inline' }}
            >
              {closingTime}
            </Link>
          </Text>
        </Item>

        <Item>
          <Display>{TranslateString(584, 'For Sale')}</Display>
          <Text>
            {numeral(salesAmount).format('0,0')} {tokenName}
          </Text>
        </Item>

        <Item>
          <Display>Available Token</Display>
          <Text>
            {numeral(tokenNumber).format('0,0')} {tokenName}
          </Text>
        </Item>

        <Item>
          <Display>LEEK per MATIC</Display>
          <Text>
            1 {mainToken} = {rate} {tokenName}
          </Text>
        </Item>
      </StyledIfoCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {TranslateString(412, 'View project site')}
      </LinkExternal>
    </>
  )
}

export default IfoCardDetails
