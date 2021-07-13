import React, { useState, useEffect } from 'react'
import { ArrowForwardIcon, Box, IconButton, Flex, Text, Heading } from 'leek-uikit'
import { useQuery } from "@apollo/client";
import LOAD_PROPOSALS from "config/graphql/query";
import styled from 'styled-components'
import { ProposalType } from 'state/types'
import { LEEKDAO_SPACE } from "config/constants/voting"
import { isCoreProposal, filterProposalsByType } from '../helper';
import { ProposalStateTag, ProposalTypeTag } from './tags'
import ProposalsLoading from './ProposalsLoading';
import TimeFrame from './TimeFrame';

interface StateProps {
    state: string,
    type: ProposalType
}

const StyledProposalRow = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  padding: 16px 24px;

  &:hover {
    background-color:#f7f7f7;
    cursor:pointer;
  }
`

const newPage = (url) => {
    const w = window.open('about:blank');
    w.location.href = url;
}


const ProposalRow: React.FC<StateProps> = ({ state, type }) => {
    const votingLink = `https://snapshot.org/#/${LEEKDAO_SPACE}/proposal/`
    const { data } = useQuery(LOAD_PROPOSALS, {
        variables: {
            state
        }
    });
    const [proposals, setProposals] = useState([]);
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        if (data) {
            setProposals(data.proposals)
            setLoading(false);
        }
    }, [data]);

    let comp;
    if (isLoading) {
        comp = <ProposalsLoading />
    } else if (filterProposalsByType(proposals, type).length > 0) {
        comp = filterProposalsByType(proposals, type).map((item) => (
            <StyledProposalRow onClick={() => newPage(votingLink + item.id)} key={item.id}>
                <Box as="span" style={{ flex: 1 }}>
                    <Text bold mb="8px">{item.title}</Text>
                    <Flex alignItems="center" mb="8px">
                        <TimeFrame startDate={item.start} endDate={item.end} proposalState={item.state} />
                    </Flex>
                    <Flex alignItems="center">
                        <ProposalStateTag proposalState={item.state} />
                        <span style={{ marginLeft: "8px" }}>
                            <ProposalTypeTag isCoreProposal={isCoreProposal(item.author)} />
                        </span>
                    </Flex>
                </Box>
                <IconButton variant="text">
                    <ArrowForwardIcon width="24px" />
                </IconButton>
            </StyledProposalRow>
        ))
    } else {
        comp = <Flex alignItems="center" justifyContent="center" p="32px">
            <Heading as="h5">No proposals found</Heading>
        </Flex>
    }

    return (
        <div>{comp}</div>
    )
}

export default ProposalRow