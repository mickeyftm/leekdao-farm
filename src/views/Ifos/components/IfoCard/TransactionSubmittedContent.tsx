import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, LinkExternal, Modal } from 'leek-uikit'
import { ArrowUpCircle } from 'react-feather'
import { AutoColumn } from './Column'
import { ConfirmedIcon } from './helpers'
import store from "../../store/store"

type TransactionSubmittedContentProps = {
    onDismiss: () => void
}

const TransactionSubmittedContent = ({ onDismiss }: TransactionSubmittedContentProps) => {
    const theme = useContext(ThemeContext)
    const transaction = store.getState();

    return (
        <Modal title="Transaction submitted" onDismiss={onDismiss}>
            <ConfirmedIcon>
                <ArrowUpCircle strokeWidth={0.5} size={97} color={theme.colors.primary} />
            </ConfirmedIcon>
            <AutoColumn gap="8px" justify="center">
                {transaction.hash && (
                    <LinkExternal href={`https://polygonscan.com/tx/${transaction.hash}`}>View on Matic Explorer</LinkExternal>
                )}
                <Button onClick={onDismiss} mt="20px">
                    Close
                </Button>
            </AutoColumn>
        </Modal >
    )
}

export default TransactionSubmittedContent
