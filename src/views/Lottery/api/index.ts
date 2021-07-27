import { useEffect, useState } from "react"
import axios from "axios"
import useRefresh from 'hooks/useRefresh'
import { useLottery } from 'hooks/useContract'
import { loadingStore } from '../store/store'
import { SET_LOADING_STATE_FALSE, SET_LOADING_STATE_TRUE } from '../store/reducer'

const url = process.env.REACT_APP_API_URL;
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
        let mounted = true;
        const fetchData = async () => {
            try {
                const { data } = await axios.get(customUrl, {
                    params: {
                        address
                    }
                })

                if (mounted) {
                    setDeGenScore(data)
                }
            } catch (error) {
                console.error('Unable to fetch DeGen Score data:', error.response)
            }
        }
        fetchData()
        return () => {
            mounted = false
        }
    }, [customUrl, address, setDeGenScore])

    return deGenScore
}

export const usePostParticipation = (address) => {
    const [successData, setSuccessData] = useState(null);
    const customUrl = `${url}/luckyDraw`;

    useEffect(() => {
        let mounted = true;
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

                if (mounted) {
                    setSuccessData(data)
                }
            } catch (error) {
                console.error('Unable to fetch participation data:', error.response)
            }
        }
        fetchData()
        return () => {
            mounted = false
        }
    }, [customUrl, address, setSuccessData])

    return successData
}

export const useGetParticipationList = () => {
    const [participationList, setParticipationList] = useState([])
    const customUrl = `${url}/participationList`;
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const { data } = await axios.get(customUrl)
                if (mounted) {
                    setParticipationList(data)
                }

            } catch (error) {
                console.error('Unable to fetch participation list data:', error.response)
            }

        }
        fetchData()
        return () => {
            mounted = false
        }
    }, [customUrl, setParticipationList, fastRefresh])
    return participationList
}

export const useGetNotParticipatedList = () => {
    const [participationList, setParticipationList] = useState(null)
    const customUrl = `${url}/notParticipatedList`;
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const { data } = await axios.get(customUrl)

                if (mounted) {
                    setParticipationList(data)
                }
            } catch (error) {
                console.error('Unable to fetch not particpated persons list:', error.response)
            }
        }
        fetchData()
        return () => {
            mounted = false
        }
    }, [customUrl, fastRefresh, setParticipationList])

    return participationList
}

export const updateParticipationStatus = async () => {
    const customUrl = `${url}/participationStatus`;
    await axios.patch(customUrl, {}, {
        auth: {
            username,
            password
        }
    })
}

export const useGetWinners = () => {
    const contract = useLottery();
    const [winners, setWinners] = useState([]);
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const currentRound = await contract.methods.currentRound().call()
                const roundWinners = await contract.methods.getWinners(currentRound - 1).call()

                if (mounted) {
                    setWinners(roundWinners)
                }

            } catch (error) {
                console.error('Unable to fetch winners:', error.response)
            }
        }
        fetchData()
        return () => {
            mounted = false
        }
    }, [contract.methods, fastRefresh])
    return winners
}


export const useGetCurrentRound = () => {
    const contract = useLottery();
    const [round, setRound] = useState(1);
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const currentRound = await contract.methods.currentRound().call()

                if (mounted) {
                    setRound(currentRound);
                }

            } catch (error) {
                console.error('Unable to fetch current round:', error.response)
            }

        }
        fetchData()
        return () => {
            mounted = false
        }
    }, [contract.methods, fastRefresh])
    return round
}

export const useFetchWinnersAndRound = (round) => {
    const contract = useLottery();
    const [winnersList, setWinnersList] = useState([]);

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                loadingStore.dispatch({ type: SET_LOADING_STATE_TRUE })
                const winners = []
                const promises = [];

                if (round === 1) {
                    if (mounted) {
                        setWinnersList(winners)
                    }
                } else {
                    for (let i = 2; i <= round; i++) {
                        promises.push(contract.methods.getWinners(i - 1).call())
                    }
                    const winnersArray = await Promise.all(promises)
                    winnersArray.forEach((itemArray, index) => {
                        itemArray.forEach(item => {
                            winners.push({
                                "address": item,
                                "round": index + 1
                            })
                        })
                    })

                    if (mounted) {
                        setWinnersList(winners)
                    }
                    loadingStore.dispatch({ type: SET_LOADING_STATE_FALSE })
                }
            } catch (error) {
                console.error('Unable to fetch history winners:', error.response)
            }
        }
        fetchData()
        return () => {
            mounted = false
        }
    }, [contract.methods, round])
    return winnersList
}
