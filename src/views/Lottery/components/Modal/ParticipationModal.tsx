import React from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from '../General/Column'
import { usePostParticipation } from "../../api"
import LoadingContent from "../General/LoadingContent"
import ErrorMessage from "../General/ErrorMessage"
import SuccessMessage from "../General/SuccessMessage"

type ParticipationProps = {
    address: string
    onDismiss: () => void
}

const ParticipationModal = ({ onDismiss, address }: ParticipationProps) => {
    const data = usePostParticipation(address);

    let comp;
    if (data) {
        if (data.error) {
            comp = <ErrorMessage errorMessage={data.error} />
        } else {
            comp = <SuccessMessage />
        }
    } else {
        comp = <LoadingContent />
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