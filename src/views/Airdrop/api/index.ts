import { useEffect, useState } from "react"
import axios from "axios"

const url = process.env.REACT_APP_API_URL;
const username = process.env.REACT_APP_API_USERNAME
const password = process.env.REACT_APP_API_PASSWORD

const usePostParticipation = (formData) => {
    const [successData, setSuccessData] = useState(null);
    const customUrl = `${url}/airdrop`;

    useEffect(() => {
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

                setSuccessData(data)
            } catch (error) {
                console.error('Unable to post participation data:', error.response)
            }
        }
        fetchData()
    }, [customUrl, formData, setSuccessData])

    return successData
}

export default usePostParticipation

