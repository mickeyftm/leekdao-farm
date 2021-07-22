import { ETHERSCAN_PREFIXES } from 'config'

export const getChainExplorerUrl = (chainId: string, address: string) => {
    return `${ETHERSCAN_PREFIXES[chainId]}/address/${address}`
}

export const getTranscationHash = (chainId: string, hash: string) => {
    return `${ETHERSCAN_PREFIXES[chainId]}/tx/${hash}`
}

export const getBlockInfo = (chainId: string, block: number) => {
    return `${ETHERSCAN_PREFIXES[chainId]}/block/${block}`
}