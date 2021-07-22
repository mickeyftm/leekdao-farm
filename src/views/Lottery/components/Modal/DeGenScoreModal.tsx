import React from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from '../General/Column'
import { useGetScore } from "../../api"
import LoadingContent from "../General/LoadingContent"
import ScoreDetails from "../General/ScoreDetails"
import ErrorMessage from "../General/ErrorMessage"

type DeGenScoreProps = {
    address: string
    onDismiss: () => void
}

const DeGenScoreModal = ({ onDismiss, address }: DeGenScoreProps) => {
    const data = useGetScore(address);
    let comp;
    if (data) {
        if (data.error) {
            comp = <ErrorMessage errorMessage={data.error} />
        } else {
            comp = <ScoreDetails score={data.score} level={data.level} />
        }
    } else {
        comp = <LoadingContent />
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