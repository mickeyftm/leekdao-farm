import React from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from '../General/Column'
import { usePostParticipation, useIsVIPFromDb } from "../api"
import LoadingContent from "../General/LoadingContent"
import ErrorMessage from "../General/ErrorMessage"
import SuccessMessage from "../General/SuccessMessage"
import WarningMessage from '../General/WarningMessage'
import { store } from "../store/store"

type ParticipationProps = {
    onDismiss: () => void
}

const ParticipationModal = ({ onDismiss }: ParticipationProps) => {
    const { formData } = store.getState()
    const data = usePostParticipation(formData);

    let comp;
    if (data) {
        if (data.error) {
            comp = <ErrorMessage errorMessage={data.error} />
        } else if (data.warning) {
            comp = <WarningMessage waringMessage={data.warning} />
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