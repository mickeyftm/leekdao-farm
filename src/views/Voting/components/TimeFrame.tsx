import React from 'react'
import { Text } from 'leek-uikit'
import moment from 'moment'
import { ProposalState } from 'state/types'

interface TimeFrameProps {
    startDate: number
    endDate: number
    proposalState: ProposalState
}

const TimeFrame: React.FC<TimeFrameProps> = ({ startDate, endDate, proposalState }) => {
    const textProps = {
        fontSize: '16px',
        color: 'textSubtle',
        ml: '8px',
    }

    if (proposalState === ProposalState.CLOSED) {
        return <Text {...textProps}>Ended
            <span> {moment.utc(Number(endDate) * 1000).format('MMMM Do YYYY, HH:mm')} UTC</span>
        </Text >
    }

    if (proposalState === ProposalState.PENDING) {
        return <Text {...textProps}>Starts
            <span> {moment.utc(Number(startDate) * 1000).format('MMMM Do YYYY, HH:mm')} UTC</span>
        </Text >
    }

    return <Text {...textProps}>Ends
        <span> {moment.utc(Number(endDate) * 1000).format('MMMM Do YYYY, HH:mm')} UTC</span>
    </Text >
}

export default TimeFrame