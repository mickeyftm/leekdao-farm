import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from './Column'
import { useGetScore } from "../api"
import LoadingContent from "./LoadingContent"
import ScoreDetails from "./ScoreDetails"
import ErrorMessage from "./ErrorMessage"

type DeGenScoreProps = {
    address: string
    onDismiss: () => void
}

const DeGenScoreModal = ({ onDismiss, address }: DeGenScoreProps) => {
    const data = useGetScore(address);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (!data && mounted) {
            setLoading(true)
        } else {
            setLoading(false)
        }
        return () => { mounted = false }
    }, [data])

    let comp;
    if (loading) {
        comp = <LoadingContent />
    } else if (data) {
        if (data.error) {
            comp = <ErrorMessage errorMessage={data.error} />
        } else {
            comp = <ScoreDetails score={data.score} level={data.level} />
        }
    }

    return (
        <Modal title="DeGen Socre" onDismiss={onDismiss}>
            <div>{comp}</div>
            <AutoColumn gap="8px" justify="center">
                <Button onClick={onDismiss} mt="20px">
                    Close
                </Button>
            </AutoColumn>
        </Modal>
    )
}

export default DeGenScoreModal