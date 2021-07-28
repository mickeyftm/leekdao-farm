import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Text, Heading, Link } from 'leek-uikit'

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 40px 0;
  width: 100%;
`

const StepContainer = styled(Flex)`
  gap: 24px;
  width: 100%;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const StyledStepCard = styled(Box)`
  display: flex;
  align-self: baseline;
  position: relative;
  background: ${({ theme }) => theme.colors.borderColor};
  padding: 1px 1px 3px 1px;
  border-radius: ${({ theme }) => theme.radii.card};
`

const InlineLink = styled(Link)`
  display: inline;
`

const StepCardInner = styled(Box)`
  width: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.card.background};
  border-radius: ${({ theme }) => theme.radii.card};
`

const Title = styled(Heading).attrs({ as: 'h2', size: 'xl' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
  margin-top:20px;
`

type Step = { title: string; subtitle: string; label: string }

const StepCard: React.FC<{ step: Step }> = ({ step }) => {
    return (
        <StyledStepCard width="100%">
            <StepCardInner height={['200px', '180px', null, '200px']}>
                <Text mb="16px" fontSize="15px" bold textTransform="uppercase" style={{ textAlign: "right" }}>
                    {step.label}
                </Text>
                <Heading mb="16px" fontSize="20px" color="secondary">
                    {step.title}
                </Heading>
                <Text color="textSubtle">{step.subtitle}</Text>
            </StepCardInner>
        </StyledStepCard>
    )
}

const HowToPlay: React.FC = () => {
    const steps: Step[] = [
        {
            label: "Step 1",
            title: "Fill in the Form",
            subtitle: 'Only the person whose DeGenScore is over 30 can have access to this game.',
        },
        {
            label: "Step 2",
            title: "Wait for the Draw",
            subtitle: 'The lucky draw will be open in person and regularly.',
        },
        {
            label: "Step 3",
            title: "Check for Prizes",
            subtitle: "Each round winner(s) will be displayed in public.",
        },
    ]
    return (
        <Box width="100%" style={{ marginBottom: "30px" }}>
            <Flex mt="30px" mb="40px" alignItems="center" flexDirection="column">
                <Title mb="24px" fontSize="30px" color="secondary">
                    How to Play
                </Title>
                <Text>It is a very simple game! But you will receive satisified returns</Text>
            </Flex>
            <StepContainer>
                {steps.map((step) => (
                    <StepCard key={step.label} step={step} />
                ))}
            </StepContainer>
            <Divider />
            <Flex justifyContent="center" alignItems="center" flexDirection={['column', 'column', 'row']}>
                <Flex maxWidth="100px" mr="8px" mb="16px">
                    <img src="./images/lottery/question.png" alt="question" />
                </Flex>
                <Flex maxWidth="300px" flexDirection="column">
                    <Heading mb="16px">
                        Still got questions?
                    </Heading>
                    <Text>
                        Check our in-depth guide on
                        <InlineLink href="https://docs.leekdao.xyz" marginLeft="5px" target="_blank">
                            how to play the LeekDAO Lucky Draw!
                        </InlineLink>
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default HowToPlay