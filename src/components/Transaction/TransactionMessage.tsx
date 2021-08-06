import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { LinkExternal } from 'leek-uikit'
import { ArrowUpCircle } from 'react-feather'
import { getTranscationHash } from 'utils/chainExplorer'
import { AutoColumn, ColumnCenter } from './Column'

type TransactionMessageProps = {
    transactionHash?: string
}

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 40px 0;
`

const chainId = process.env.REACT_APP_CHAIN_ID

const TransactionMessage: React.FC<TransactionMessageProps> = ({ transactionHash }) => {
    const theme = useContext(ThemeContext)

    return (
        <div>
            <ConfirmedIcon>
                <ArrowUpCircle strokeWidth={0.5} size={97} color={theme.colors.primary} />
            </ConfirmedIcon>
            <AutoColumn gap="8px" justify="center">
                <LinkExternal href={getTranscationHash(chainId, transactionHash)}>View on PolygonScan</LinkExternal>
            </AutoColumn>
        </div>

    )
}

export default TransactionMessage