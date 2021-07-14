import React, { useState } from 'react'
import { Card, Heading } from 'leek-uikit'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Container from 'components/layout/Container'
import { ProposalType, ProposalState } from 'state/types'
import styled from "styled-components"
import TabMenu from './components/TabMenu'
import Filters from './components/Filters'
import ProposalRow from './components/ProposalRow'
import Hero from './Hero'

interface State {
    proposalType: ProposalType
    filterState: ProposalState
}

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
  margin-top:20px;
`

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.warn(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.warn(`[Network error]: ${networkError}`);
});

const link = from([
    errorLink,
    new HttpLink({ uri: "https://hub.snapshot.page/graphql" }),
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

const Proposals = () => {
    const [state, setState] = useState<State>({
        proposalType: ProposalType.CORE,
        filterState: ProposalState.ACTIVE,
    })

    const handleProposalTypeChange = (newProposalType: ProposalType) => {
        setState((prevState) => ({
            ...prevState,
            proposalType: newProposalType,
        }))
    }

    const handleFilterChange = (newFilterState: ProposalState) => {
        setState((prevState) => ({
            ...prevState,
            filterState: newFilterState,
        }))
    }
    const { proposalType, filterState } = state

    return (
        <ApolloProvider client={client}>
            <Hero />
            <Container>
                <Title>Proposals</Title>
                <Card>
                    <TabMenu proposalType={proposalType} onTypeChange={handleProposalTypeChange} />
                    <Filters filterState={filterState} onFilterChange={handleFilterChange} isLoading={false} />
                    <ProposalRow state={filterState} type={proposalType} />
                </Card>
            </Container>
        </ApolloProvider>
    )
}

export default Proposals
