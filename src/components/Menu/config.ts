import { MenuEntry } from 'leek-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.leekdao.xyz/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.leekdao.xyz/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'IDO',
    icon: 'IfoIcon',
    href: '/ido',
  },
  {
    label: 'Vote',
    icon: 'GroupsIcon',
    href: '/vote',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/cryptoleek-team',
      },
      {
        label: 'Docs',
        href: 'https://docs.leekdao.xyz/',
      },
      {
        label: 'CryptoLeek Website',
        href: 'https://www.bitcoinleek.com/',
      },
      {
        label: 'LeekDAO Website',
        href: 'https://app.leekdao.xyz/',
      },
    ],
  },
  // {
  //   label: 'Partnerships/IFO',
  //   icon: 'GooseIcon',
  //   href: 'https://docs.google.com/forms/d/e/1FAIpQLSe7ycrw8Dq4C5Vjc9WNlRtTxEhFDB1Ny6jlAByZ2Y6qBo7SKg/viewform?usp=sf_link',
  // },
  // {
  //   label: 'Audit by Hacken',
  //   icon: 'AuditIcon',
  //   href: 'https://www.goosedefi.com/files/hackenAudit.pdf',
  // },
  // {
  //   label: 'Audit by CertiK',
  //   icon: 'AuditIcon',
  //   href: 'https://certik.org/projects/goose-finance',
  // },
]

export default config
