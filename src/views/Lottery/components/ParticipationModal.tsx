import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from './Column'
import { usePostParticipation } from "../api"
import LoadingContent from "./LoadingContent"
import ErrorMessage from "./ErrorMessage"
import SuccessMessage from "./SuccessMessage"

type ParticipationProps = {
    address: string
    onDismiss: () => void
}

const ParticipationModal = ({ onDismiss, address }: ParticipationProps) => {
    const data = usePostParticipation(address);
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
            comp = <SuccessMessage />
        }
    }

    return (
        <Modal title="Participation Submission" onDismiss={onDismiss}>
            <div>{comp}</div>
            <AutoColumn gap="8px" justify="center">
                <Button onClick={onDismiss} mt="20px">
                    Close
                </Button>
            </AutoColumn>
        </Modal>
    )
}

export default ParticipationModal