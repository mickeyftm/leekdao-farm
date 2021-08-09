import React from 'react'
import { Card, CardBody, Heading, Text } from 'leek-uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useLockBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useLockBalance() || new BigNumber(0)
  const reservedBalance = new BigNumber(2500000000000000000000000)
  const yieldFarmBalance = new BigNumber(5000000000000000000000000)
  const farms = useFarms()
  const leekPrice = usePriceCakeBusd()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance).minus(reservedBalance).minus(yieldFarmBalance) : new BigNumber(0)
  const cakeSupply = getBalanceNumber(circSupply)

  let leekPerBlock = 0
  if (farms && farms[0] && farms[0].leekPerBlock) {
    leekPerBlock = new BigNumber(farms[0].leekPerBlock).div(new BigNumber(10).pow(18)).toNumber()
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Leek Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(leekPrice.times(totalSupply))} decimals={0} prefix="$" />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total Locked')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">Community Reserved</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(reservedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">Yield Farm Reserved</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(yieldFarmBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New LEEK/block')}</Text>
          <Text bold fontSize="14px">
            {leekPerBlock}
          </Text>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
