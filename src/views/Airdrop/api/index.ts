import { useEffect, useState } from "react"
import axios from "axios"
import { useAirdropContract } from "hooks/useContract"
import useRefresh from 'hooks/useRefresh'

const url = process.env.REACT_APP_API_URL;
const username = process.env.REACT_APP_API_USERNAME
const password = process.env.REACT_APP_API_PASSWORD

interface airdropInfo {
    startBlock?: number
    endBlock?: number
    airdropAmount?: number
    vipAirdropAmount?: number
    remainingAmount?: number
}

export const usePostParticipation = (formData) => {
    const [successData, setSuccessData] = useState(null);
    const customUrl = `${url}/airdrop`;

    useEffect(() => {
        let mounted = true
        const fetchData = async () => {
            try {
                const { data } = await axios.post(customUrl,
                    formData,
                    {
                        auth: {
                            username,
                            password
                        }
                    }
                )
                if (mounted) {
                    setSuccessData(data)
                }
            } catch (error) {
                console.error('Unable to post participation data:', error.response)
            }
        }
        fetchData()
        return () => {
            mounted = false
        }
    }, [customUrl, formData, setSuccessData])

    return successData
}


export const useGetAirdropInfo = () => {
    const [airdropInfo, setAirdropInfo] = useState<airdropInfo>({})
    const contract = useAirdropContract()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const [startBlock, endBlock, airdropAmount, vipAirdropAmount, remainingAmount] = await Promise.all([
                    contract.methods.startBlockNumber().call(),
                    contract.methods.finishBlockNumber().call(),
                    contract.methods.airdropAmount().call(),
                    contract.methods.vipAirdropAmount().call(),
                    contract.methods.remainingTokens().call(),
                ])

                if (mounted) {
                    setAirdropInfo({
                        startBlock,
                        endBlock,
                        airdropAmount,
                        vipAirdropAmount,
                        remainingAmount
                    })
                }
            } catch (err) {
                console.error("Unable to fetch airdrop info", err.response)
            }
        }
        fetchData();
        return () => {
            mounted = false
        }
    }, [contract.methods])
    return airdropInfo
}


export const useGetAirdropList = (isVip: boolean) => {
    const [airdropList, setAirdropList] = useState(null)
    const customUrl = `${url}/airdropList`;
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const { data } = await axios.get(customUrl, {
                    params: {
                        isVip
                    }
                })

                if (mounted) {
                    setAirdropList(data)
                }
            } catch (error) {
                console.error('Unable to fetch airdrop list:', error.response)
            }
        }
        fetchData()
        return () => {
            mounted = false
        }
    }, [customUrl, isVip, setAirdropList, fastRefresh])

    return airdropList
}

export const updateAirdropParticipationStatus = async (isVip) => {
    const customUrl = `${url}/airdropParticipationStatus`;
    await axios.patch(customUrl, {
        isVip
    }, {
        auth: {
            username,
            password
        }
    })
}

export const useIsVIP = (account: string | undefined) => {
    const [isVIP, setIsVIP] = useState(false)
    const contract = useAirdropContract()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                if (account) {
                    const response = await contract.methods.isVIP(account).call()

                    if (mounted) {
                        setIsVIP(response)
                    }
                }

            } catch (err) {
                console.error("Unable to identify whether is VIP", err.response)
            }
        }
        fetchData();
        return () => {
            mounted = false
        }
    }, [contract.methods, account, slowRefresh])
    return isVIP
}

export const useIsWhiteListed = (account: string | undefined) => {
    const [isWhitelisted, setIsWhitelisted] = useState(false)
    const contract = useAirdropContract()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                if (account) {
                    const response = await contract.methods.isWhitelisted(account).call()

                    if (mounted) {
                        setIsWhitelisted(response)
                    }
                }
            } catch (err) {
                console.error("Unable to identify whether is whitelisted", err.response)
            }
        }
        fetchData();
        return () => {
            mounted = false
        }
    }, [contract.methods, account, slowRefresh])
    return isWhitelisted
}






