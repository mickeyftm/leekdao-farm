import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import useRefresh from 'hooks/useRefresh'
import { useLottery } from 'hooks/useContract'

const url = "http://127.0.0.1:5000";
const username = process.env.REACT_APP_API_USERNAME
const password = process.env.REACT_APP_API_PASSWORD

export interface ApiStatResponse {
    score?: string
    level?: string
    error?: string
}

export const useGetScore = (address) => {
    const [deGenScore, setDeGenScore] = useState<ApiStatResponse | null>(null)
    const customUrl = `${url}/luckyDraw`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(customUrl, {
                    params: {
                        address
                    }
                })

                setDeGenScore(data)
            } catch (error) {
                console.error('Unable to fetch data:', error.response)
            }
        }
        fetchData()
    }, [customUrl, address, setDeGenScore])

    return deGenScore
}

export const usePostParticipation = (address) => {
    const [successData, setSuccessData] = useState(null);
    const customUrl = `${url}/luckyDraw`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.post(customUrl, {
                    address,
                },
                    {
                        auth: {
                            username,
                            password
                        }
                    }
                )

                setSuccessData(data)
            } catch (error) {
                console.error('Unable to fetch data:', error.response)
            }
        }
        fetchData()
    }, [customUrl, address, setSuccessData])

    return successData
}

export const useGetParticipationList = () => {
    const [participationList, setParticipationList] = useState([])
    const customUrl = `${url}/participationList`;
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(customUrl)
                setParticipationList(data)
            } catch (error) {
                console.error('Unable to fetch data:', error.response)
            }
        }
        fetchData()
    }, [customUrl, setParticipationList, fastRefresh])
    return participationList
}


const setParticipationToContract = async () => {
    const customUrl = `${url}/setAddress`;
    let response;
    try {
        const { data } = await axios.post(customUrl, {},
            {
                auth: {
                    username,
                    password
                }
            }
        )
        response = data;
    } catch (error) {
        console.error('Unable to fetch data:', error.response)
    }
    return response;
}

export const useGetTransactionHash = (account: string, number: number) => {
    const [resposne, setResponse] = useState(null);
    const contract = useLottery();

    useEffect(() => {
        const sendTransactionHash = async () => {
            try {
                const isParticipateIntoContract = await setParticipationToContract();
                if (!isParticipateIntoContract.error) {
                    const result = await contract.methods.luckyDraw(number).send({ from: account })
                    setResponse(result)
                } else {
                    setResponse(isParticipateIntoContract)
                }
            } catch (error) {
                console.error('Unable to fetch data:', error.response)
            }
        }
        sendTransactionHash()
    }, [account, number, contract.methods])
    return resposne
}

export const useGetWinners = (position: number) => {
    const contract = useLottery();
    const [winner, setWinner] = useState("");
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentRound = await contract.methods.currentRound().call()
                const roundWinner = await contract.methods.roundWinners(currentRound - 1, position).call()

                setWinner(roundWinner)
            } catch (error) {
                console.error('Unable to fetch data:', error.response)
            }
        }
        fetchData()
    }, [position, contract.methods, fastRefresh])
    return winner
}


export const useGetCurrentRound = () => {
    const contract = useLottery();
    const [round, setRound] = useState(0);
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentRound = await contract.methods.currentRound().call()

                setRound(currentRound);
            } catch (error) {
                console.error('Unable to fetch data:', error.response)
            }
        }
        fetchData()
    }, [contract.methods, fastRefresh])
    return round
}

