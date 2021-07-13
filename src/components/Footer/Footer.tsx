import React from 'react'
import { Text } from 'leek-uikit'

const Footer: React.FC = () => {
    const chainId = process.env.REACT_APP_CHAIN_ID

    return (
        <div>
            {
                chainId === "80001" ? <Text color="failure" fontSize="25px">* Matic Testnet</Text> : ""
            }
        </div>
    )
}

export default Footer