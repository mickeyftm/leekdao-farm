import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import BigNumber from 'bignumber.js'
import { Menu as UikitMenu } from 'leek-uikit'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset, error } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  console.log("cakePriceUsd >>>>> ", cakePriceUsd)
  let leekPrice

  if (cakePriceUsd.toNumber() === 0) {
    leekPrice = new BigNumber(0)
  } else {
    leekPrice = cakePriceUsd.toNumber()
  }

  return (
    <div>
      <UikitMenu
        account={account}
        login={connect}
        logout={reset}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={selectedLanguage && selectedLanguage.code}
        langs={allLanguages}
        setLang={setSelectedLanguage}
        cakePriceUsd={leekPrice}
        links={config}
        priceLink="#"
        error={error}
        {...props}
      />

    </div>

  )
}

export default Menu
