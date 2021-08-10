import React, { useState, useCallback } from 'react';
import ipfsClient from 'ipfs-http-client'
import styled from 'styled-components';
import { City } from "config/constants/types"
import useTheme from 'hooks/useTheme'
import { getBalanceNumber } from "utils/formatBalance"
import { Text, Button, Input, Heading, Flex, useModal } from "leek-uikit"
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton';
import { useBillboardApprove } from 'hooks/useApprove';
import { getCakeAddress, getBillboardAddress } from 'utils/addressHelpers';
import { useERC20, useBillboardContract } from 'hooks/useContract';
import BigNumber from 'bignumber.js';
import validator from "validator"
import ConfirmationPendingContent from '../Modal/ConfirmationPendeingContent';
import BillboardBidModal from '../Modal/BillboardBidModal';
import { GET_BID_BILLBOARD_HASH, HIDE_FORM } from '../store/reducer';
import { store, bidStore } from "../store/store"
import { BillboardBaseInfo } from "../api"

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

interface Info extends City {
    desc?: string
    isBid?: boolean,
    owner?: string,
    ipfsHash?: string,
    bidLevel?: number

}

export interface FormProps {
    info: Info
    setPopupInfo: (params) => void
    baseInfo: BillboardBaseInfo
    tokenBalance: BigNumber
    allowance: BigNumber
}

const FormLayout = styled.div`
    padding:30px;

    @media (max-width: 768px) {
        padding:20px
    }
`

const Textarea = styled.textarea<{ backgroundColor: string, textColor: string }>`
    background-color:${({ backgroundColor }) => backgroundColor};
    border: 0;
    border-radius: 16px;
    box-shadow: inset 0px 2px 2px -1px rgb(74 74 104 / 10%);
    color: ${({ textColor }) => textColor};
    display: block;
    font-size: 16px;
    height: 100px;
    outline: 0;
    width: 100%;
    padding:15px;
`

const BillboardForm: React.FC<FormProps> = ({ info, setPopupInfo, baseInfo, tokenBalance, allowance }) => {
    const { id, city, isBid, bidLevel } = info;
    const { isDark } = useTheme()
    const { account } = useWallet()
    const [description, setDescription] = useState("")
    const [twitter, setTwitter] = useState("")
    const [buffer, setBuffer] = useState(null);
    const [file, setFile] = useState(null);
    const [validImage, setValidImage] = useState(true)
    const [validDescription, setValidDescription] = useState(true)
    const [validTwitter, setValidTwitter] = useState(true);
    const [approval, setApproval] = useState(true)
    const tokenAddress = getCakeAddress()
    const minimumTokenAmount = baseInfo && baseInfo.minimumTokenAmount
    const basePrice = baseInfo && baseInfo.basePrice
    const formatedBasePrice = getBalanceNumber(new BigNumber(basePrice));
    const bidTokenAmount = formatedBasePrice * bidLevel
    const tokenContract = useERC20(tokenAddress);
    const billboardContract = useBillboardContract()
    const billboardAddress = getBillboardAddress()
    const formatedMinimumTokenAmount = getBalanceNumber(new BigNumber(minimumTokenAmount))
    const { onApprove } = useBillboardApprove(tokenContract, billboardAddress)
    const needsApproval = allowance.toNumber() <= 0
    const formatedTokenBalance = getBalanceNumber(tokenBalance)
    const isQualified = isBid || formatedTokenBalance >= formatedMinimumTokenAmount
    const isTokenEnough = !isBid || formatedTokenBalance >= bidTokenAmount
    const [onPresentConfirmationModal] = useModal(<ConfirmationPendingContent title="Waiting for Confirmation" onDismiss={() => { return null }} />)
    const [onPresentImageUploadingModal] = useModal(<ConfirmationPendingContent title="Uploading to IPFS" onDismiss={() => { return null }} />)
    const [onPresentBillboardBidModal] = useModal(<BillboardBidModal onDismiss={() => { return null }} />)

    const handleApprove = useCallback(async () => {
        try {
            setApproval(true)
            const txHash = await onApprove()
            if (!txHash) {
                setApproval(false)
            }
        } catch (e) {
            console.error(e)
        }
    }, [onApprove, setApproval])

    const validateAllFields = (field: string, fieldValue: string) => {
        if (field === 'description') {
            setDescription(fieldValue)
            if (validator.isLength(fieldValue, { min: 1, max: 50 })) {
                setValidDescription(true)
            } else {
                setValidDescription(false)
            }
        }

        if (field === 'twitter') {
            setTwitter(fieldValue)
            if (validator.isLength(fieldValue, { min: 1, max: 50 })) {
                setValidTwitter(true)
            } else {
                setValidTwitter(false)
            }
        }

        if (field === 'image') {
            const maxAllowedSize = 5 * 1024 * 1024;
            if (Number(fieldValue) > maxAllowedSize) {
                setValidImage(false)
            } else {
                setValidImage(true)
            }
        }
    }

    const handleIsValid = (e, field: string) => {
        validateAllFields(field, e);
    }

    const captureFile = (event) => {
        event.preventDefault()
        const image = event.target.files[0]
        if (image) {
            handleIsValid(image.size, 'image')
        }
        const urlReader = new window.FileReader()
        const bufferReader = new window.FileReader()
        urlReader.readAsDataURL(image)
        bufferReader.readAsArrayBuffer(image)

        urlReader.onload = (arg) => {
            setFile(arg.target.result)
        }

        bufferReader.onloadend = () => {
            const arrayBuffer = new Uint8Array(bufferReader.result as ArrayBuffer)
            setBuffer(Buffer.from(arrayBuffer));
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        onPresentImageUploadingModal()
        const response = await ipfs.add(buffer);
        if (response) {
            const { hash } = response[0];
            onPresentConfirmationModal();
            const result = await billboardContract.methods.bid(id, city, hash, description, twitter).send({ from: account })
            if (result) {
                const action = {
                    type: GET_BID_BILLBOARD_HASH,
                    bidHash: result.transactionHash,
                }
                store.dispatch(action)
                onPresentBillboardBidModal()
            }
            setPopupInfo(null);
            bidStore.dispatch({ type: HIDE_FORM })

        }
    }

    return (
        <FormLayout>
            <Heading color="secondary" size="lg">Bill Board Bid Form</Heading>
            <Text>City: {info.city}</Text>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <Text mb="5px">Twitter Username: (without @)</Text>
                    <Input
                        placeholder="Twitter Username..."
                        name="twitter"
                        value={twitter}
                        onChange={(e) => handleIsValid(e.currentTarget.value, "twitter")}
                        onBlur={() => setValidTwitter(true)}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <Text mb="5px">* Descriptions:</Text>
                    <Textarea
                        placeholder="Descriptions..."
                        name="description"
                        value={description}
                        onChange={(e) => handleIsValid(e.currentTarget.value, "description")}
                        required
                        backgroundColor={!isDark ? "#eeeaf4" : "#483f5a"}
                        textColor={!isDark ? "#452A7A" : "#EAE2FC"}
                    />
                </div>

                <div>
                    <Text mb="5px">* Upload Images:</Text>
                    <Input
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={captureFile}
                        required
                        style={{ padding: "8px" }}
                    />

                    {file && <img src={file} alt="board" width="200px" style={{ marginTop: "10px" }} />}<br />
                </div>

                {account && !isQualified && <Text color="failure" mb="10px">Sorry! First Time Creation Required: {formatedMinimumTokenAmount} LEEK</Text>}

                {account && !isTokenEnough && <Text color="failure" mb="10px">Sorry! Minimum LEEK Required: {bidTokenAmount} LEEK</Text>}

                {account && !validDescription && <Text color="failure" mb="10px">Sorry! Text Size is 1 - 50</Text>}

                {account && !validImage && <Text color="failure" mb="10px">Sorry! Maximum Image Size is: 5MB</Text>}

                {account && !validTwitter && <Text color="failure" mb="10px">Sorry! Please enter a valid twitter name</Text>}

                {account ? <Flex alignItems="center" justifyContent="space-between">
                    <Button onClick={handleApprove} disabled={!isQualified || !needsApproval || !approval || !validImage || !validDescription || !isTokenEnough}>Approve</Button>
                    <Button type="submit" disabled={!isQualified || needsApproval || !validImage || !validDescription || !isTokenEnough}>Submit</Button>
                </Flex> : <UnlockButton />}


            </form>
        </FormLayout>

    )
}

export default React.memo(BillboardForm);