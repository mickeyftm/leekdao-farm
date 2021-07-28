import React from "react"
import styled from "styled-components"
import BigNumber from "bignumber.js"
import { getBalanceNumber } from 'utils/formatBalance'
import { Card, CardHeader, Heading, Flex, Button, useModal, Text, LinkExternal, Box } from 'leek-uikit'
import { getChainExplorerUrl } from "utils/chainExplorer"
import UnlockButton from "components/UnlockButton"
import { useAirdropContract } from "hooks/useContract"
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { airdropConfig } from "config/constants"
import registerToken from "utils/wallet"
import AirdropInfoHeader from "../General/AirdropInfoHeader"
import AirdropInfoDetails from "../General/AirdropInfoDetails"
import AirdropProgress from "../General/AirdropProgress"
import ConfirmationPendingContent from "../Modal/ConfirmationPendingModal"
import AirdropApproveTransactionModal from "../Modal/AirdropApproveTransactionModal"
import ApproveErrorMessageModal from "../Modal/ApproveErrorMessageModal"
import VipApproveErrorMessageModal from "../Modal/VipApproveErrorMessageModal"
import VipAirdropApproveTransactionModal from "../Modal/VipAirdropApproveTransactionModal"
import ClaimAirdropTransactionModal from "../Modal/ClaimAirdropTransactionModal"
import { airdropApproveStore, vipAirdropApproveStore, claimAirdropStore } from "../store/store"
import { APPROVE_AIRDROP, APPROVE_VIP_AIRDROP, CLAIM_AIRDROP, UPDATE_ERROR_MESSAGE, RESET_TO_DEFAULT_STATE } from "../store/reducer"
import { useGetAirdropInfo, useGetAirdropList, updateAirdropParticipationStatus, useIsVIP, useIsWhiteListed } from "../api"

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
const CONTRACT_OWNER = process.env.REACT_APP_LOTTERY_OWNER

const InfoLayout = styled.div`
    padding:30px;

    @media (max-width: 768px) {
        padding:20px
    }
`

const StyledInfoCard = styled(Card) <{ isOwner: boolean }>`
  background-repeat: no-repeat;
  background-size: contain;
  max-height: ${({ isOwner }) => isOwner ? '580px' : '510px'}}
  width: 100%;
`

const InfoCard = () => {
    const { id, name, description, tokenAddress, tokenDecimals, projectSiteUrl, totalAmount, isActive } = airdropConfig
    const { account } = useWallet()
    const address = tokenAddress[CHAIN_ID]
    const isOwner = CONTRACT_OWNER === account
    const { startBlock, endBlock, airdropAmount, vipAirdropAmount, remainingAmount } = useGetAirdropInfo()
    const airdropNumber = getBalanceNumber(new BigNumber(airdropAmount))
    const airdropVipNumber = getBalanceNumber(new BigNumber(vipAirdropAmount))
    const remainingTokens = getBalanceNumber(new BigNumber(remainingAmount))
    const progress = isActive ? (totalAmount - remainingTokens) / totalAmount * 100 : 0
    const airdropList = useGetAirdropList(false)
    const vipAirdropList = useGetAirdropList(true)
    const contract = useAirdropContract()
    const isVIP = useIsVIP(account);
    const isWhitelisted = useIsWhiteListed(account)

    const [onPresentConfirmationModal] = useModal(<ConfirmationPendingContent onDismiss={() => { return null }} />)
    const [onPresentAirdropApproveModal] = useModal(<AirdropApproveTransactionModal onDismiss={() => { return null }} />)
    const [onPresentAirdropApproveErrorModal] = useModal(<ApproveErrorMessageModal onDismiss={() => { return null }} />)
    const [onPresentVipAirdropApproveModal] = useModal(<VipAirdropApproveTransactionModal onDismiss={() => { return null }} />)
    const [onPresentVipAirdropApproveErrorModal] = useModal(<VipApproveErrorMessageModal onDismiss={() => { return null }} />)
    const [onPresentClaimAirdropModal] = useModal(<ClaimAirdropTransactionModal onDismiss={() => { return null }} />)

    const approveAirdropList = async () => {
        onPresentConfirmationModal();
        airdropApproveStore.dispatch({ type: RESET_TO_DEFAULT_STATE })
        if (airdropList.error) {
            const action = {
                type: UPDATE_ERROR_MESSAGE,
                airdropApproveError: airdropList.error
            }
            airdropApproveStore.dispatch(action)
            onPresentAirdropApproveErrorModal()
        } else {
            const result = await contract.methods.whitelist(airdropList).send({ from: account })
            const action = {
                type: APPROVE_AIRDROP,
                airdropApproveTxHash: result.transactionHash
            }
            airdropApproveStore.dispatch(action)
            onPresentAirdropApproveModal()
            await updateAirdropParticipationStatus(false)
        }
    }

    const vipApproveAirdropList = async () => {
        onPresentConfirmationModal();
        vipAirdropApproveStore.dispatch({ type: RESET_TO_DEFAULT_STATE })
        if (vipAirdropList.error) {
            const action = {
                type: UPDATE_ERROR_MESSAGE,
                vipAirdropApproveError: vipAirdropList.error
            }
            vipAirdropApproveStore.dispatch(action)
            onPresentVipAirdropApproveErrorModal()
        } else {
            const result = await contract.methods.whitelistVIP(vipAirdropList).send({ from: account })
            const action = {
                type: APPROVE_VIP_AIRDROP,
                vipAirdropApproveTxHash: result.transactionHash
            }
            vipAirdropApproveStore.dispatch(action)
            onPresentVipAirdropApproveModal()
            await updateAirdropParticipationStatus(true)
        }
    }

    const claimAirdrop = async () => {
        onPresentConfirmationModal();
        claimAirdropStore.dispatch({ type: RESET_TO_DEFAULT_STATE })
        if (isWhitelisted || isVIP) {
            const result = await contract.methods.getAirdrop().send({ from: account })
            const action = {
                type: CLAIM_AIRDROP,
                claimAirdropTxHash: result.transactionHash
            }
            claimAirdropStore.dispatch(action)
            onPresentClaimAirdropModal()
        }
    }

    return (
        <StyledInfoCard isOwner={isOwner}>
            <CardHeader>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading>AirDrop Info</Heading>
                </Flex>
            </CardHeader>

            <InfoLayout>
                <AirdropInfoHeader airdropId={id} name={name} description={description} />
                <AirdropProgress progress={progress} />
                <AirdropInfoDetails startBlock={startBlock} endBlock={endBlock} airdropAmount={airdropNumber} vipAirdropAmount={airdropVipNumber} totalAmount={totalAmount} remainingTokens={remainingTokens} tokenName={name.toUpperCase()} />

                <hr />
                <Flex alignItems="center" justifyContent="space-between">
                    <div>
                        <LinkExternal mb="5px" style={{ cursor: "pointer" }} href={getChainExplorerUrl(CHAIN_ID, address)}>View Token Contract</LinkExternal>
                        <LinkExternal mb="5px" style={{ cursor: "pointer" }} href={projectSiteUrl}>View Project Site</LinkExternal>
                        {account && (
                            <Flex justifyContent="flex-start" alignItems="center" mb="10px" style={{ cursor: "pointer" }}>
                                <Box
                                    onClick={() => registerToken(address, name, tokenDecimals)}
                                >
                                    <Text color="primary" bold fontSize="16px" mr="5px">
                                        Add to Metamask
                                    </Text>
                                </Box>
                                <img src="./images/metamask.svg" alt="metamask" width="20px" />
                            </Flex>
                        )}
                    </div>

                    <div>
                        {
                            account ? <Button disabled={!isVIP && !isWhitelisted} onClick={claimAirdrop} fullWidth>Claim</Button> : <UnlockButton />
                        }
                        {
                            account && !isVIP && !isWhitelisted && <Text color="failure">* Please fill in the form first</Text>
                        }
                    </div>

                </Flex>

                {
                    isOwner ?
                        <div>
                            <Flex alignItems="center" justifyContent="space-between">
                                <Button onClick={approveAirdropList}>Approve</Button>
                                <Button onClick={vipApproveAirdropList}>Approve VIP</Button>
                            </Flex>
                        </div> : ""
                }


            </InfoLayout>
        </StyledInfoCard>
    )

}

export default InfoCard