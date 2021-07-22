import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

const getUrl = (tokenAddresses, liquidityUrlPathParts) => {
  const isLeekToken = addresses.cake[chainId] === tokenAddresses[process.env.REACT_APP_CHAIN_ID]
  const wmatic = addresses.wbnb[chainId]

  let token1 = liquidityUrlPathParts.split("/")[0]
  let token2 = liquidityUrlPathParts.split("/")[1]

  if (token1 === wmatic) {
    token1 = "ETH";
  } else if (token2 === wmatic) {
    token2 = "ETH";
  }

  if (chainId === "80001") {
    return `https://cryptoleek-team.github.io/leekdaoswap-mumbai-testnet/#/add/${token1}/${token2}`
  }

  return isLeekToken ? `https://exchange.leekdao.xyz/#/add/${token1}/${token2}` : `https://app.sushi.com/add/${token1}/${token2}`
}

export default getUrl