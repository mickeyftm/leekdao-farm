import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from 'leek-uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import Footer from 'components/Footer'
import FarmStakingCard from './components/FarmStakingCard'
// import LotteryCard from './components/LotteryCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import TokenVesting from './components/TokenVesting'

const Hero = styled.div`
  align-items: center;
  background-image: url('./images/leek/3.png');
  background-size: 200px 200px;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding-top: 200px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('./images/leek/3.png'), url('./images/leek/3b.png');
    background-position: left center, right center;
    height: 230px;
    padding-top: 0;
  }
`

const BannerImg = styled.img`
  width: 100%;
  margin-bottom:20px;
  margin-top:20px;
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="20px" color="primary">
          {TranslateString(576, 'LeekDAO')}
        </Heading>
        <Text fontSize="18px">{TranslateString(578, 'Popular DEFI app on MATIC Mainnet.')}</Text>
        <Text color="warning">Project in Beta. Please use it at your own risk</Text>
      </Hero>
      <div>
        <a href="./#/farms">
          <BannerImg src="./images/banner.png" alt="banner" />
        </a>
      </div>
      <div>
        <Cards>
          {/* <FarmStakingCard /> */}
          <TwitterCard />
          {/* <CakeStats />
          <TotalValueLockedCard /> */}
          <TokenVesting />
        </Cards>
        <Footer />
      </div>
    </Page>
  )
}

export default Home
