import React from 'react'
import { Box, Button, Flex, Heading } from 'leek-uikit'
import styled from 'styled-components'
import Container from 'components/layout/Container'
import DesktopImage from './components/DesktopImage'

const StyledHero = styled(Box)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  padding-bottom: 32px;
  padding-top: 32px;
`

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
  margin-top:20px;
`

const newPage = () => {
    const w = window.open('about:blank');
    w.location.href = "https://snapshot.org/#/leekdao.eth/create";
}

const Hero = () => {
    return (
        <StyledHero>
            <Container>
                <Flex alignItems="center" justifyContent="space-between">
                    <Box pr="32px">
                        <Title>
                            Voting
                        </Title>
                        <Heading mb="16px">
                            Have your say in the future of the LEEKDAO Ecosystem
                        </Heading>
                        <Button onClick={newPage}>
                            Make a Proposal
                        </Button>
                    </Box>
                    <DesktopImage src="./images/voting/voting-presents.png" width={361} height={214} />
                </Flex>
            </Container>
        </StyledHero >
    )
}

export default Hero