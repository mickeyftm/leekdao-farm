import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'LEEK-USDT LP',
    lpAddresses: {
      80001: '0xe8f118eb4aeb823cb292336f541ed4c75adfa71e',
      137: '0xaaAdb74F10BADe6f54fABd181efe13DB6c6d1A22',
    },
    tokenSymbol: 'LEEK',
    tokenAddresses: {
      80001: '0xc657EFDb41eaBA15Cea84d34a2A60b18686FA929',
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
      80001: '0x0c532aec168ec6b00c5cdf64d074563db46aa85c',
      137: '0x113AcAd027141bB6252Bb2Baeb66C8DFbA16E8Af',
    },
    tokenSymbol: 'LEEK',
    tokenAddresses: {
      80001: '0xc657EFDb41eaBA15Cea84d34a2A60b18686FA929',
      137: '0xB82f7f11188ACbc90D6ABd621CD2C338c3C75eA2',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'MATIC-USDT LP',
    lpAddresses: {
      80001: '0xa75a44a1d06c11e7cd0764fc4905a4a09982353b',
      137: '0x085Fe343aaF4B049B54dc68AB47c2121c70763E9',
    },
    tokenSymbol: 'MATIC',
    tokenAddresses: {
      80001: '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
