import React from 'react'
import { TagProps } from 'leek-uikit'
import { CommunityTag, CoreTag, VoteNowTag, SoonTag, ClosedTag } from 'components/Tags'
import { ProposalState } from 'state/types'

interface ProposalStateTagProps extends TagProps {
    proposalState: ProposalState
}

export const ProposalStateTag: React.FC<ProposalStateTagProps> = ({ proposalState }) => {
    if (proposalState === ProposalState.ACTIVE) {
        return <VoteNowTag />
    }

    if (proposalState === ProposalState.PENDING) {
        return <SoonTag />
    }

    return <ClosedTag />
}

interface ProposalTypeTagProps extends TagProps {
    isCoreProposal: boolean
}

export const ProposalTypeTag: React.FC<ProposalTypeTagProps> = ({ isCoreProposal, ...props }) => {
    if (isCoreProposal) {
        return <CoreTag {...props} />
    }

    return <CommunityTag {...props} />
}