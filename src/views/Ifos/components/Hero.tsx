import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from 'leek-uikit'
import Container from 'components/layout/Container'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #black;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 32px;
`
const Hero = () => {
  return (
    <StyledHero>
      <Container>
        <Title>Initial Dex Offering</Title>
        <Blurb>Invest in Innovative Projects</Blurb>
      </Container>
    </StyledHero>
  )
}

export default Hero
