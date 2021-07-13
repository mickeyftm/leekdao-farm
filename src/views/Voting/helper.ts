import { ADMIN_ADDRESS } from 'config/constants/voting'
import { Proposal, ProposalType } from 'state/types'

export const isCoreProposal = (author: string) => {
    return ADMIN_ADDRESS.findIndex(item => item === author) > -1
}

export const filterProposalsByType = (proposals: Proposal[], proposalType: ProposalType) => {
    switch (proposalType) {
        case ProposalType.COMMUNITY:
            return proposals.filter((proposal) => !isCoreProposal(proposal.author))
        case ProposalType.CORE:
            return proposals.filter((proposal) => isCoreProposal(proposal.author))
        case ProposalType.ALL:
        default:
            return proposals
    }
}
