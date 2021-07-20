import React, { useState } from "react"
import { Card, Heading, Flex, Button, useModal, Text } from 'leek-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from "styled-components"
import UnlockButton from "components/UnlockButton";
import AddressInput from "./AddressInput";
import DeGenScoreModal from "./DeGenScoreModal";
import ParticipationModal from "./ParticipationModal"

const StyledLotteryCard = styled(Card)`
  background-repeat: no-repeat;
  background-size: contain;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  width: 100%;
  margin-top:30px;
  margin-bottom:30px;
`

const Title = styled(Heading).attrs({ as: 'h2', size: 'lg' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
  margin-top:20px;
`

const LotteryCard = () => {
    const [address, setAddress] = useState("");
    const { account } = useWallet();
    const isAddressNull = address.trim().length === 0
    const isAddressValid = address.trim().length === 42 && address.startsWith("0x")

    const [onPresentDeGenScoreModal] = useModal(
        <DeGenScoreModal onDismiss={() => { return null }} address={address} />,
    )
    const [onPresentParticipationModal] = useModal(
        <ParticipationModal onDismiss={() => { return null }} address={address} />,
    )

    return (
        <StyledLotteryCard>
            <Title>Participate Form</Title>
            <AddressInput
                address={account}
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
                onSelectDefault={() => setAddress(account)}
            />
            {!isAddressValid && !isAddressNull ? <Text color="failure" mb="10px">* Address Invalid. Please Provide a valid address</Text> : ""}
            {
                account ? <Flex justifyContent="space-between">
                    <Button variant="primary" mr="8px" disabled={!isAddressValid} onClick={onPresentDeGenScoreModal}>
                        DeGen Score
                    </Button>

                    <Button variant="secondary" mr="8px" disabled={!isAddressValid} onClick={onPresentParticipationModal}>
                        Participate
                    </Button>
                </Flex> :
                    <UnlockButton fullWidth />
            }
        </StyledLotteryCard >
    )

}

export default LotteryCard

