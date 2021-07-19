import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'LEEK-MATIC LP',
    lpAddresses: {
      80001: '0x0c532aec168ec6b00c5cdf64d074563db46aa85c',
      137: '0x422F43A620E795E139183947851Fd914a11dD023',
    },
    tokenSymbol: 'LEEK',
    tokenAddresses: {
      80001: '0xc657EFDb41eaBA15Cea84d34a2A60b18686FA929',
      137: '0x67A32987a8EAA0644702C362B53B8EeBd126C20b',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'LEEK-USDC LP',
    lpAddresses: {
      80001: '0xe8f118eb4aeb823cb292336f541ed4c75adfa71e',
      137: '0x6f447ba529007943E05fc678FB04A777816C81c0',
    },
    tokenSymbol: 'LEEK',
    tokenAddresses: {
      80001: '0xc657EFDb41eaBA15Cea84d34a2A60b18686FA929',
      137: '0x67A32987a8EAA0644702C362B53B8EeBd126C20b',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'MATIC-USDC SLP',
    lpAddresses: {
      80001: '0xa75a44a1d06c11e7cd0764fc4905a4a09982353b',
      137: '0xcd353F79d9FADe311fC3119B841e1f456b54e858',
    },
    tokenSymbol: 'MATIC',
    tokenAddresses: {
      80001: '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    risk: 3,
    lpSymbol: 'MATIC-USDT SLP',
    lpAddresses: {
      80001: '0xa75a44a1d06c11e7cd0764fc4905a4a09982353b',
      137: '0x55FF76BFFC3Cdd9D5FdbBC2ece4528ECcE45047e',
    },
    tokenSymbol: 'MATIC',
    tokenAddresses: {
      80001: '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
  },
  {
    pid: 4,
    risk: 3,
    lpSymbol: 'MATIC-WETH SLP',
    lpAddresses: {
      80001: '',
      137: '0xc4e595acDD7d12feC385E5dA5D43160e8A0bAC0E',
    },
    tokenSymbol: 'MATIC',
    tokenAddresses: {
      80001: '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
  },
  {
    pid: 5,
    risk: 3,
    lpSymbol: 'USDC-WETH SLP',
    lpAddresses: {
      80001: '',
      137: '0x34965ba0ac2451A34a0471F04CCa3F990b8dea27',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      80001: '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
      137: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
  },

]

export default farms
