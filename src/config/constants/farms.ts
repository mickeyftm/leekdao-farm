import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'LEEK-USDT LP',
    lpAddresses: {
      97: '',
      137: '0xaaAdb74F10BADe6f54fABd181efe13DB6c6d1A22',
    },
    tokenSymbol: 'LEEK',
    tokenAddresses: {
      97: '',
      137: '0xB82f7f11188ACbc90D6ABd621CD2C338c3C75eA2',
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
      137: '0x113AcAd027141bB6252Bb2Baeb66C8DFbA16E8Af',
    },
    tokenSymbol: 'LEEK',
    tokenAddresses: {
      97: '',
      137: '0xB82f7f11188ACbc90D6ABd621CD2C338c3C75eA2',
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
      137: '0x085Fe343aaF4B049B54dc68AB47c2121c70763E9',
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