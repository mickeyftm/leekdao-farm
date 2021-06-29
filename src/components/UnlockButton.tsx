import React from 'react'
import { Button, useWalletModal } from 'leek-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset, error } = useWallet()
  const { onPresentConnectModal, onPresentWrongNetworkModal } = useWalletModal(connect, reset, error)
  let comp
  if (error) {
    comp = (
      <Button onClick={onPresentWrongNetworkModal} {...props} variant="danger" title="Currently only ">
        Wrong Network
      </Button>
    )
  } else {
    comp = (
      <Button onClick={onPresentConnectModal} {...props}>
        {TranslateString(292, 'Unlock Wallet')}
      </Button>
    )
  }

  return <div>{comp}</div>
}

export default UnlockButton
