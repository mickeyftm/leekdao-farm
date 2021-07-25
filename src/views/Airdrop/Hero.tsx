import React from 'react'
import { Box, Flex, Heading, Image } from 'leek-uikit'
import styled from 'styled-components'
import Container from 'components/layout/Container'

const StyledHero = styled(Box)`
 background-image: linear-gradient(180deg, #c0cefa 20%, #c0fae3 100%);
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
                            LeekDAO AirDrop
                        </Title>
                        <Heading mb="16px">
                            Join the LEEK Token AirDrop to Embrace the Future
                        </Heading>
                    </Box>
                    <DesktopImage src="./images/airdrop/airdrop.png" width={200} height={200} />
                </Flex>
            </Container>
        </StyledHero >
    )
}

export default Hero