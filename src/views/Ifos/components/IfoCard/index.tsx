import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Card, CardBody, CardRibbon, Button, useModal } from 'leek-uikit'
import { Ifo, IfoStatus } from 'config/constants/types'
import moment from 'moment'
import useI18n from 'hooks/useI18n'
import { useIfoContract } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import IfoCardHeader from './IfoCardHeader'
import ParticipateModal from './ParticipateModal'
import IfoCardProgress from './IfoCardProgress'
import IfoCardDetails from './IfoCardDetails'

export interface IfoCardProps {
  ifo: Ifo
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`

const getStatus = (isOpen: boolean | null, hasClosed: boolean | null) => {
  if (!isOpen && !hasClosed) {
    return 'coming_soon'
  }

  if (isOpen && !hasClosed) {
    return 'live'
  }

  if (!isOpen && hasClosed) {
    return 'finished'
  }

  return null
}

const getRibbonComponent = (status: IfoStatus, TranslateString: (translationId: number, fallback: string) => any) => {
  if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString(999, 'Coming Soon')} />
  }

  if (status === 'finished') {
    return <CardRibbon variantColor="primary" text={TranslateString(999, 'FINISHED')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString(999, 'LIVE NOW!')} />
  }

  return null
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const { id, address, name, mainToken, subTitle, startTime, endTime, salesAmount, projectSiteUrl } = ifo
  const [state, setState] = useState({
    isLoading: true,
    status: null,
    openingTime: 0,
    closingTime: 0,
    rate: 0,
    availableToken: 0,
  })
  const { account } = useWallet()
  const contract = useIfoContract(address)

  const TranslateString = useI18n()

  const Ribbon = getRibbonComponent(state.status, TranslateString)

  useEffect(() => {
    const fetchProgress = async () => {
      const [openingTime, closingTime, isOpen, hasClosed, rate, availableToken] = await Promise.all([
        contract.methods._openingTime().call(),
        contract.methods._closingTime().call(),
        contract.methods.isOpen().call(),
        contract.methods.hasClosed().call(),
        contract.methods._rate().call(),
        contract.methods.remainingTokens().call(),
      ])

      const status = getStatus(isOpen, hasClosed)

      setState({
        isLoading: false,
        status,
        openingTime,
        closingTime,
        rate,
        availableToken,
      })
    }

    fetchProgress()
  }, [contract, setState])

  const isActive = state.status === 'live'
  const isFinished = state.status === 'finished'

  const launchTime =
    moment.utc(Number(state.openingTime) * 1000).format('MMMM Do YYYY, HH:mm') ||
    moment.utc(startTime * 1000).format('MMMM Do YYYY, HH:mm')
  const closingTime =
    moment.utc(Number(state.closingTime) * 1000).format('MMMM Do YYYY, HH:mm') ||
    moment.utc(endTime * 1000).format('MMMM Do YYYY, HH:mm')

  const remainingTokens = getBalanceNumber(new BigNumber(state.availableToken))

  const progress = isActive || isFinished ? ((salesAmount - remainingTokens) / salesAmount) * 100 : 0

  const [onPresentParticipateModal] = useModal(
    <ParticipateModal tokenName={name} contract={contract} mainToken={mainToken} rate={state.rate} />,
  )

  return (
    <>
      <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive={isActive}>
        <CardBody>
          <IfoCardHeader ifoId={id} name={name} subTitle={subTitle} />
          <IfoCardProgress progress={progress} />
          {!account ? (
            <UnlockButton fullWidth />
          ) : (
            <Button fullWidth onClick={onPresentParticipateModal} disabled={!isActive}>
              Participate
            </Button>
          )}
          <Divider />
          <IfoCardDetails
            launchTime={launchTime}
            closingTime={closingTime}
            projectSiteUrl={projectSiteUrl}
            salesAmount={salesAmount}
            rate={state.rate}
            mainToken={mainToken}
            tokenName={name}
            availableToken={state.availableToken}
          />
        </CardBody>
      </StyledIfoCard>
    </>
  )
}

export default IfoCard
