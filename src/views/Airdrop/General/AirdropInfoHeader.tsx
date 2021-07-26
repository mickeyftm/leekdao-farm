import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex } from 'leek-uikit'

interface AirdropInfoHeaderProps {
  airdropId: string
  name: string
  description: string
}

const StyledAirdropInfoHeader = styled(Flex)`
  & > div {
    flex: 1;
  }
`

const Name = styled(Heading).attrs({ as: 'h3', size: 'lg' })`
  margin-bottom: 4px;
  text-align: left;
  margin-left: 20px;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: left;
  margin-left: 20px;
`


const AirdropInfoHeader: React.FC<AirdropInfoHeaderProps> = ({ airdropId, name, description }) => {
  return (
    <StyledAirdropInfoHeader mb="24px" alignItems="center">
      <img src={`./images/airdrop/token/${airdropId}.png`} alt={airdropId} width="50px" height="50px" />
      <div>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </div>
    </StyledAirdropInfoHeader>
  )
}

export default AirdropInfoHeader
