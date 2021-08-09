import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex } from 'leek-uikit'
import { ifosConfig } from 'config/constants'
import useI18n from 'hooks/useI18n'
import Footer from 'components/Footer'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)


const Ifo = () => {
  const TranslateString = useI18n()

  return (
    <div>
      <IfoCards isSingle>
        {activeIfo !== undefined ? <IfoCard ifo={activeIfo} /> :
          <Flex alignItems="center" justifyContent="center">
            <Text mb="16px" bold fontSize="30px">No IDOs Right Now</Text>
          </Flex>
        }
      </IfoCards>
      <LaunchIfoCallout>
        <div>
          <Title as="h2">{TranslateString(592, 'How to take part')}</Title>
          <Heading mb="16px">{TranslateString(594, 'Before Sale')}:</Heading>
          <List>
            <li>Buy MATIC</li>
            <li>Wait for the Sale to start</li>
          </List>
          <Flex mb="16px">
            <LinkExternal href="https://quickswap.exchange/#/swap" mr="16px">
              Buy MATIC
            </LinkExternal>
          </Flex>
          <Heading mb="16px">{TranslateString(600, 'During Sale')}:</Heading>
          <List>
            <li>While the sale is live, commit your MATIC tokens to buy the tokens</li>
          </List>
          <Heading mb="16px">{TranslateString(604, 'After Sale')}:</Heading>
          <List>
            <li>Claim the tokens you bought, along with any unspent funds.</li>
            <li>{TranslateString(608, 'Done!')}</li>
          </List>
        </div>
        <div>
          <div>
            <Title as="h2">{TranslateString(512, 'Want to launch your own IDO?')}</Title>
            <Text mb={3}>
              Launch your project with LEEK, Polygon Network’s most transparent and active DeFi Platform
            </Text>
            <Button as="a" href="https://forms.gle/bry8f1ZJa5u4VRGZ6" external>
              Contact Us
            </Button>
          </div>
        </div>
      </LaunchIfoCallout>

      <Footer />
    </div>
  )
}

export default Ifo
