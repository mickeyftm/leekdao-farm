import { Ifo } from './types'

const ifos: Ifo[] = [
  {
    id: 'leek',
    tokenAddress: {
      80001: '0xc657EFDb41eaBA15Cea84d34a2A60b18686FA929',
      137: '0x67A32987a8EAA0644702C362B53B8EeBd126C20b',
    },
    idoAddress: {
      80001: '0x8AaE8746bCFaAC6AC2927C1C9099943B4de5d7f3',
      137: '0x0E9B41A5D64de6B4BF6e086417E813Df21707748',
    },
    isActive: true,
    name: 'LEEK',
    mainToken: 'MATIC',
    subTitle: 'A community driven crypto and knowledge sharing DAO powered by $LEEK Social Token',
    startTime: 1625625327,
    endTime: 1626625327,
    salesAmount: 1000000,
    projectSiteUrl: '#',
    tokenDecimals: 18,
  },
]

export default ifos
