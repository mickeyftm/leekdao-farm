import { useEffect, useState } from "react"
import { useBillboardContract } from "hooks/useContract"
import useRefresh from 'hooks/useRefresh'
import { billboardStore } from '../store/store';
import { GET_BILLBOARD_DETAILS } from "../store/reducer";

export const useGetBasePrice = () => {
    const [basePrice, setBasePrice] = useState(0)
    const contract = useBillboardContract()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const response = await contract.methods.basePrice().call()

                if (mounted) {
                    setBasePrice(response)
                }
            } catch (err) {
                console.error("Unable to fetch base price", err.response)
            }
        }
        fetchData();
        return () => {
            mounted = false
        }
    }, [contract.methods, slowRefresh])
    return basePrice
}

export const useGetBillboardDetails = () => {
    const [billboardDetails, setBillboardDetails] = useState(null)
    const contract = useBillboardContract()
    const { slowRefresh } = useRefresh()
    const cities = billboardStore.getState()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const promises = [];
                const customArray = [];
                cities.forEach((city) => {
                    promises.push(contract.methods.billBoards(city.id).call())
                })
                const billboards = await Promise.all(promises)

                cities.forEach((city, index) => {
                    customArray.push({
                        ...city,
                        desc: billboards[index].desc,
                        isBid: billboards[index].init,
                        owner: billboards[index].owner,
                        ipfsHash: billboards[index].ipfsHash,
                        bidLevel: billboards[index].bidLevel
                    })
                })

                if (mounted) {
                    setBillboardDetails(customArray)
                }

            } catch (err) {
                console.error("Unable to fetch billboard details", err.response)
            }
        }
        fetchData();
        return () => {
            mounted = false
        }
    }, [contract.methods, billboardDetails, cities, slowRefresh])
    return billboardDetails
}