import React from "react"
import { Heading, Flex, Text } from "leek-uikit"
import styled from "styled-components"
import { ColumnCenter } from "./Column"
import { ApiStatResponse } from "../api"

const SubTitle = styled(Heading).attrs({ as: 'h4', size: 'md' })`
  color: ${({ theme }) => theme.colors.primary};
  marign: 20px;
`

const LevelIcon = styled(ColumnCenter)`
  padding: 20px 0;
`

const LevelIconDetails = styled.img <{ width: string, height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

const ScoreDetails: React.FC<ApiStatResponse> = ({ level, score }) => {
  return (
    <div>
      <SubTitle>Your Score Level is:</SubTitle>
      <LevelIcon>
        <LevelIconDetails src={`./images/lottery/${level.toLowerCase()}.png`} alt="level" width="100px" height="70px" />
        <Text color="secondary" bold fontSize="20px" mt="5px"> {level.toUpperCase()}</Text>
      </LevelIcon>
      <Flex alignItems="center">
        <SubTitle mr="20px">Your Score is:</SubTitle>
        <Text color="secondary" bold fontSize="30px"> {score}</Text>
      </Flex>
      <Flex alignItems="center">
        <SubTitle mr="20px">Results:</SubTitle>
        <Text color={level.toLowerCase() === "bronze" ? "failure" : "success"} bold fontSize="30px">{level.toLowerCase() === "bronze" ? "Unqualified" : "Qualified"}</Text>
      </Flex>
    </div>
  )
}

export default ScoreDetails