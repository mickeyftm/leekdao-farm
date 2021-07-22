import { useEffect, useState } from "react"
import axios from "axios"
import useRefresh from 'hooks/useRefresh'
import { useLottery } from 'hooks/useContract'
import store from '../store/store'
import { GET_ADDRESS_TRANSACTION_HASH, RESET_TO_DEFAULT_STATE } from '../store/reducer'

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


export const useSetParticipantsToContract = async () => {
    const customUrl = `${url}/setAddress`;
    const { slowRefresh } = useRefresh()
    useEffect(() => {
        const fetchData = async () => {
            try {
                store.dispatch({ type: RESET_TO_DEFAULT_STATE })
                const { data } = await axios.post(customUrl, {},
                    {
                        auth: {
                            username,
                            password
                        }
                    }
                )
                const action = {
                    type: GET_ADDRESS_TRANSACTION_HASH,
                    addressTx: data.transactionHash,
                    error: data.error,
                }
                store.dispatch(action)

            } catch (error) {
                console.error('Unable to fetch data:', error.response)
            }
        }
        fetchData()
    }, [customUrl, slowRefresh])
}

export const useGetWinners = () => {
    const contract = useLottery();
    const [winners, setWinners] = useState([]);
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentRound = await contract.methods.currentRound().call()
                const roundWinners = await contract.methods.getWinners(currentRound - 1).call()

                setWinners(roundWinners)
            } catch (error) {
                console.error('Unable to fetch data:', error.response)
            }
        }
        fetchData()
    }, [contract.methods, fastRefresh])
    return winners
}


export const useGetCurrentRound = () => {
    const contract = useLottery();
    const [round, setRound] = useState(1);
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

export const useFetchWinnersAndRound = (round) => {
    const contract = useLottery();
    const [winnersList, setWinnersList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const winners = [];
                for (let i = round; i > 0; i--) {
                    contract.methods.getWinners(i - 1).call().then((data) => {
                        data.forEach(item => {
                            winners.push({
                                "address": item,
                                "round": i - 1
                            })
                        })
                    })
                }

                setWinnersList(winners)

            } catch (error) {
                console.error('Unable to fetch winners data:', error.response)
            }
        }
        fetchData()
    }, [contract.methods, round])
    return winnersList
}
