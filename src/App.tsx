import React, { useEffect, Suspense, lazy } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from 'leek-uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
// import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Lottery = lazy(() => import('./views/Lottery'))
const Airdrop = lazy(() => import('./views/Airdrop'))
const Ifos = lazy(() => import('./views/Ifos'))
const Proposals = lazy(() => import('./views/Voting'))
const NotFound = lazy(() => import('./views/NotFound'))
const Billboard = lazy(() => import('./views/Billboard'))
// const Exchange = lazy(() => import('./views/ComingSoon'))
// const Liquidity = lazy(() => import('./views/ComingSoon'))
// const Nft = lazy(() => import('./views/Nft'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route strict path="/" exact>
              <Home />
            </Route>
            <Route strict path="/farms">
              <Farms />
            </Route>
            <Route path="/ido">
              <Ifos />
            </Route>
            <Route path="/vote">
              <Proposals />
            </Route>
            <Route path="/lottery">
              <Lottery />
            </Route>
            <Route path="/airdrop">
              <Airdrop />
            </Route>
            <Route path="/billboard">
              <Billboard />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      {/* <NftGlobalNotification /> */}
    </Router>
  )
}

export default React.memo(App)
