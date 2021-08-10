import { useEffect, useState } from "react"
import { useBillboardContract } from "hooks/useContract"
import useRefresh from "hooks/useRefresh"
import { billboardStore } from '../store/store';
import { GET_BILLBOARD_DETAILS } from '../store/reducer'

export interface BillboardBaseInfo {
    basePrice: number
    minimumTokenAmount: number
}

export const useGetBaseInfo = () => {
    const [baseInfo, setBaseInfo] = useState<BillboardBaseInfo>()
    const contract = useBillboardContract()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const [basePrice, minimumTokenAmount] = await Promise.all([
                    contract.methods.basePrice().call(),
                    contract.methods.minimumTokenAmountToCreate().call(),
                ])

                if (mounted) {
                    setBaseInfo({
                        basePrice,
                        minimumTokenAmount
                    })
                }
            } catch (err) {
                console.error("Unable to fetch base price", err.response)
            }
        }
        fetchData();
        return () => { mounted = false }
    }, [slowRefresh])// eslint-disable-line react-hooks/exhaustive-deps
    return baseInfo
}

export const useGetBillboardDetails = () => {
    const contract = useBillboardContract()
    const { cities } = billboardStore.getState()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const billboards = await contract.methods.getAllBillBoards().call();
                const newBillboards = {}

                billboards.forEach(billboard => {
                    const { id, desc, owner, ipfsHash, bidLevel, twitter } = billboard;
                    const isBid = billboard.init;

                    newBillboards[id] = {
                        id,
                        desc,
                        twitter,
                        isBid,
                        owner,
                        ipfsHash,
                        bidLevel
                    }
                })

                const billboardsDetails = []

                cities.forEach(city => {
                    const { id } = city
                    const billboardData = newBillboards[id];

                    if (billboardData) {
                        billboardsDetails.push({
                            ...city,
                            ...billboardData
                        })
                    } else {
                        billboardsDetails.push(city)
                    }
                })

                if (mounted) {
                    const action = {
                        type: GET_BILLBOARD_DETAILS,
                        cities: billboardsDetails
                    }

                    billboardStore.dispatch(action)
                }

            } catch (err) {
                console.error("Unable to fetch billboard details", err.response)
            }
        }
        fetchData();
        return () => {
            mounted = false
        }
    }, [slowRefresh])// eslint-disable-line react-hooks/exhaustive-deps
}