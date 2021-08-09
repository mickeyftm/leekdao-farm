import React, { useState, useCallback } from 'react';
import ipfsClient from 'ipfs-http-client'
import styled from 'styled-components';
import { City } from "config/constants/types"
import { getBalanceNumber } from "utils/formatBalance"
import { Text, Button, Input, Heading, Flex, useModal } from "leek-uikit"
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton';
import { useBillboardApprove } from 'hooks/useApprove';
import { getCakeAddress, getBillboardAddress } from 'utils/addressHelpers';
import { useERC20, useBillboardContract } from 'hooks/useContract';
import { useBillboardAllowance } from 'hooks/useAllowance';
import useTokenBalance from 'hooks/useTokenBalance';
import BigNumber from 'bignumber.js';
import validator from "validator"
import ConfirmationPendingContent from '../Modal/ConfirmationPendeingContent';
import BillboardBidModal from '../Modal/BillboardBidModal';
import { GET_BID_BILLBOARD_HASH, HIDE_FORM } from '../store/reducer';
import { store, bidStore } from "../store/store"
import { useGetBaseInfo } from '../api';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

interface Info extends City {
    desc?: string
    isBid?: boolean,
    owner?: string,
    ipfsHash?: string,
    bidLevel?: number

}

interface formPorps {
    info: Info
    setPopupInfo: (params) => void
}

const FormLayout = styled.div`
    padding:30px;

    @media (max-width: 768px) {
        padding:20px
    }
`

const Textarea = styled.textarea`
    background-color: #eeeaf4;
    border: 0;
    border-radius: 16px;
    box-shadow: inset 0px 2px 2px -1px rgb(74 74 104 / 10%);
    color: #452A7A;
    display: block;
    font-size: 16px;
    height: 100px;
    outline: 0;
    width: 100%;
    padding:15px;
`

const BillboardForm: React.FC<formPorps> = ({ info, setPopupInfo }) => {
    const { id, city, isBid, bidLevel } = info;
    const { account } = useWallet()
    const [description, setDescription] = useState("")
    const [buffer, setBuffer] = useState(null);
    const [file, setFile] = useState(null);
    const [validImage, setValidImage] = useState(true)
    const [validDescription, setValidDescription] = useState(true)
    const [approval, setApproval] = useState(true)
    const tokenAddress = getCakeAddress()
    const baseInfo = useGetBaseInfo()
    const minimumTokenAmount = baseInfo && baseInfo.minimumTokenAmount
    const basePrice = baseInfo && baseInfo.basePrice
    const formatedBasePrice = getBalanceNumber(new BigNumber(basePrice));
    const bidTokenAmount = formatedBasePrice * bidLevel
    const formatedMinimumTokenAmount = getBalanceNumber(new BigNumber(minimumTokenAmount))
    const tokenContract = useERC20(tokenAddress);
    const billboardContract = useBillboardContract()
    const billboardAddress = getBillboardAddress()
    const { onApprove } = useBillboardApprove(tokenContract, billboardAddress)
    const allowance = new BigNumber(useBillboardAllowance(tokenContract, billboardAddress) || 0)
    const needsApproval = allowance.toNumber() <= 0
    const tokenBalance = useTokenBalance(tokenAddress)
    const formatedTokenBalance = getBalanceNumber(tokenBalance)
    const isQualified = isBid || formatedTokenBalance >= formatedMinimumTokenAmount
    const isTokenEnough = formatedTokenBalance >= bidTokenAmount

    const [onPresentConfirmationModal] = useModal(<ConfirmationPendingContent onDismiss={() => { return null }} />)
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
        handleIsValid(image.size, 'image')
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
        const response = await ipfs.add(buffer);
        const { hash } = response[0];
        onPresentConfirmationModal();
        const result = await billboardContract.methods.bid(id, city, hash, description).send({ from: account })
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

    return (
        <FormLayout>
            <Heading color="secondary" size="lg">Bill Board Bid Form</Heading>
            <Text>City: {info.city}</Text>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <Text mb="5px">* Descriptions:</Text>
                    <Textarea
                        placeholder="Descriptions..."
                        name="description"
                        value={description}
                        onChange={(e) => handleIsValid(e.currentTarget.value, "description")}
                        required
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

                {account ? <Flex alignItems="center" justifyContent="space-between">
                    <Button onClick={handleApprove} disabled={!isQualified || !needsApproval || !approval || !validImage || !validDescription || !isTokenEnough}>Approve</Button>
                    <Button type="submit" disabled={!isQualified || needsApproval || !validImage || !validDescription || !isTokenEnough}>Submit</Button>
                </Flex> : <UnlockButton />}


            </form>
        </FormLayout>

    )
}

export default React.memo(BillboardForm);