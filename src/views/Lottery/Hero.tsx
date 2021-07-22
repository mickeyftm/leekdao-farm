import React from 'react'
import { Box, Flex, Heading, Image } from 'leek-uikit'
import styled from 'styled-components'
import Container from 'components/layout/Container'

const StyledHero = styled(Box)`
 background-image: linear-gradient(180deg, #c0f6fa 0%, #d9f8fa 100%);
  padding-bottom: 32px;
  padding-top: 32px;
`

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
  margin-top:20px;
`

const DesktopImage = styled(Image)`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`

const Hero = () => {
  return (
    <StyledHero>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Box pr="32px">
            <Title>
              LeekDAO Lucky Draw
            </Title>
            <Heading mb="16px">
              Sometimes the Good Things in Life Do Come Easy
            </Heading>
          </Box>
          <DesktopImage src="./images/lottery/luckyDraw.png" width={250} height={250} />
        </Flex>
      </Container>
    </StyledHero >
  )
}

export default Hero