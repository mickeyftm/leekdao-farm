import { useEffect, useState, useRef } from 'react'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { provider as ProviderType } from 'web3-core'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import getNodeUrl from 'utils/getRpcUrl'

const NODE_URL = getNodeUrl()

let urlProvider: any
if (NODE_URL.startsWith('https://')) {
  urlProvider = new Web3.providers.HttpProvider(NODE_URL, { timeout: 10000 } as HttpProviderOptions)
} else if (NODE_URL.startsWith('wss://')) {
  urlProvider = new Web3.providers.WebsocketProvider(NODE_URL)
}

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the ethereum provider change
 */
const useWeb3 = () => {
  const { ethereum }: { ethereum: ProviderType } = useWallet()
  const refEth = useRef(ethereum)
  const [web3, setweb3] = useState(new Web3(ethereum || urlProvider))

  useEffect(() => {
    if (ethereum !== refEth.current) {
      setweb3(new Web3(ethereum || urlProvider))
      refEth.current = ethereum
    }
  }, [ethereum])

  return web3
}

export default useWeb3
