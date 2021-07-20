import React, { useState } from "react";
import { BaseLayout, Box, Flex, Heading } from "leek-uikit";
import Container from "components/layout/Container";
import styled from "styled-components";
import Hero from "./Hero";
import LotteryCard from "./components/LotteryCard";
import ParticipationListCard from "./components/ParticipationListCard"
import LotteryResultCard from "./components/LotteryResultCard"
import HowToPlay from "./components/HowToPlay"
import HistoryTabMenu from "./components/HistoryTabMenu";
import AllHistoryResultCard from "./components/AllHistoryResultCard"

const LotteryRoundContainer = styled.div`
 background-image:linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%);
`

const CurrentLayout = styled(BaseLayout)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding-left: 150px;
  padding-right: 150px;
  padding-top:50px;
  padding-bottom:50px;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1.5fr 1fr;
  }

  @media (max-width: 768px) {
   padding:30px
  }
`

const HistoryLayout = styled(Container)`
  margin: 0 auto;
  padding-left: 150px;
  padding-right: 150px;
  padding-top:50px;
  padding-bottom:50px;

  @media (max-width: 768px) {
   padding:30px
  }
`

const Lottery = () => {
    const [historyTabMenuIndex, setHistoryTabMenuIndex] = useState(0)
    return (
        <div>
            <Hero />
            <LotteryCard />

            <LotteryRoundContainer>
                <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
                    <Heading mt="24px" size="xl">
                        Lucky Draw Rounds
                    </Heading>
                    <Box mt="30px">
                        <HistoryTabMenu
                            activeIndex={historyTabMenuIndex}
                            setActiveIndex={(index) => setHistoryTabMenuIndex(index)} />
                    </Box>
                </Flex>

                {historyTabMenuIndex === 0 ? <CurrentLayout>
                    <ParticipationListCard />
                    <LotteryResultCard />
                </CurrentLayout> :
                    <HistoryLayout>
                        <AllHistoryResultCard />
                    </HistoryLayout>
                }



            </LotteryRoundContainer>

            <Container>
                <HowToPlay />
            </Container>
        </div>
    )
}

export default Lottery