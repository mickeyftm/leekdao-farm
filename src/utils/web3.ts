import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import getNodeUrl from 'utils/getRpcUrl'

const NODE_URL = getNodeUrl()

let urlProvider: any
if (NODE_URL.startsWith('https://')) {
  urlProvider = new Web3.providers.HttpProvider(NODE_URL, { timeout: 10000 } as HttpProviderOptions)
} else if (NODE_URL.startsWith('wss://')) {
  urlProvider = new Web3.providers.WebsocketProvider(NODE_URL)
}

const constUrlProvider = urlProvider

/**
 * Provides a web3 instance using our own private provider httpProver
 */
const getWeb3 = () => {
  const web3 = new Web3(urlProvider)
  return web3
}
const getContract = (abi: any, address: string, contractOptions?: ContractOptions) => {
  const web3 = getWeb3()
  return new web3.eth.Contract((abi as unknown) as AbiItem, address, contractOptions)
}

export { getWeb3, getContract, constUrlProvider }
