import React from "react";
import styled from "styled-components";
import { BaseLayout, Flex, Heading } from "leek-uikit";
import FormCard from "./AirdropCard/FormCard";
import InfoCard from "./AirdropCard/InfoCard";
import Hero from "./Hero"

const ParticipationLayout = styled(BaseLayout)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding-left: 50px;
  padding-right: 50px;
  padding-top:50px;
  padding-bottom:50px;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
   padding:30px
  }
`

const Airdrop = () => {
    return (
        <div>
            <Hero />
            <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
                <Heading size="xl" color="secondary" mt="40px">
                    Participate our AirDrop Right now!
                </Heading>
            </Flex>
            <ParticipationLayout>
                <FormCard />
                <InfoCard />
            </ParticipationLayout>

        </div>
    )
}

export default Airdrop