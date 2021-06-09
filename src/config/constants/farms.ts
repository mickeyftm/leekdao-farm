import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'LEEK-USDT LP',
    lpAddresses: {
      97: '',
      137: '0x2fd5e4BF1f6F55DEb738b054141ccAD744328B17',
    },
    tokenSymbol: 'LEEK',
    tokenAddresses: {
      97: '',
      137: '0xE745F190A0085c4dDbF41A193BCfB3Dadf1401A1',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'LEEK-MATIC LP',
    lpAddresses: {
      97: '',
      137: '0xAd9bc703cbfe6DEa90Cf6db51267361BaE3F856C',
    },
    tokenSymbol: 'LEEK',
    tokenAddresses: {
      97: '',
      137: '0xE745F190A0085c4dDbF41A193BCfB3Dadf1401A1',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'WMATIC-USDT LP',
    lpAddresses: {
      97: '',
      137: '0x55FF76BFFC3Cdd9D5FdbBC2ece4528ECcE45047e',
    },
    tokenSymbol: 'WMATIC',
    tokenAddresses: {
      97: '',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms