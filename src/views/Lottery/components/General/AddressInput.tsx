import React from 'react'
import styled from 'styled-components'
import { Button } from 'leek-uikit'
import Input, { InputProps } from 'components/Input'

interface Props extends InputProps {
    address?: string
    onSelectDefault?: () => void
}

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const AddressInput: React.FC<Props> = ({ onSelectDefault, onChange, value, address }) => {
    const isAddressNull = address === null

    return (
        <div style={{ marginBottom: "10px" }}>
            <Input
                endAdornment={
                    <StyledTokenAdornmentWrapper>
                        <StyledSpacer />
                        <div>
                            <Button size="sm" onClick={onSelectDefault} disabled={isAddressNull}>
                                Default
                            </Button>
                        </div>
                    </StyledTokenAdornmentWrapper>
                }
                placeholder="Enter your address here..."
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default AddressInput
