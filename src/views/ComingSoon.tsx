import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from 'leek-uikit'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'

const StyledComingSoon = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const CommingSoon = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledComingSoon>
        <LogoIcon width="64px" mb="8px" />
        <div style={{ marginBottom: '20px' }}>
          <Heading size="xxl">Coming Soon 😊</Heading>
        </div>

        <Button as="a" href="/" size="sm">
          {TranslateString(999, 'Back Home')}
        </Button>
      </StyledComingSoon>
    </Page>
  )
}

export default CommingSoon
