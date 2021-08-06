import { useEffect, useState } from "react"
import { useBillboardContract } from "hooks/useContract"
import { billboardStore } from '../store/store';

interface billboardBaseInfo {
    basePrice: number
    minimumTokenAmount: number
}

export const useGetBaseInfo = () => {
    const [baseInfo, setBaseInfo] = useState<billboardBaseInfo>()
    const contract = useBillboardContract()

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
        return () => {
            mounted = false
        }
    }, [contract.methods])
    return baseInfo
}

export const useGetBillboardDetails = () => {
    const [billboardDetails, setBillboardDetails] = useState(null)
    const contract = useBillboardContract()
    const cities = billboardStore.getState()

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const billboards = await contract.methods.getAllBillBoards().call();
                let billboardsDetails = [];

                if (billboards.length === 0) {
                    billboardsDetails = cities
                } else {
                    cities.forEach((city) => {
                        billboards.forEach((billboard) => {
                            if (billboard.id === city.id.toString()) {
                                billboardsDetails.push({
                                    ...city,
                                    desc: billboard.desc,
                                    isBid: billboard.init,
                                    owner: billboard.owner,
                                    ipfsHash: billboard.ipfsHash,
                                    bidLevel: billboard.bidLevel
                                })
                            }
                        });
                    })
                }

                if (mounted) {
                    setBillboardDetails(billboardsDetails)
                }

            } catch (err) {
                console.error("Unable to fetch billboard details", err.response)
            }
        }
        fetchData();
        return () => {
            mounted = false
        }
    }, [contract.methods, billboardDetails, cities])
    return billboardDetails
}