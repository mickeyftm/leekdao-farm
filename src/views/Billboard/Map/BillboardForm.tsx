import React, { useState, useCallback } from 'react';
import ipfsClient from 'ipfs-http-client'
import styled from 'styled-components';
import { Text, Button, Input, Heading, Flex, useModal } from "leek-uikit"
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton';
import { useBillboardApprove } from 'hooks/useApprove';
import { getCakeAddress, getBillboardAddress } from 'utils/addressHelpers';
import { useERC20, useBillboardContract } from 'hooks/useContract';
import { useBillboardAllowance } from 'hooks/useAllowance';
import BigNumber from 'bignumber.js';
import ConfirmationPendingContent from '../Modal/ConfirmationPendeingContent';
import BillboardBidModal from '../Modal/BillboardBidModal';
import { GET_BID_BILLBOARD_HASH } from '../store/reducer';
import { store } from "../store/store"


const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

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

const BillboardForm = (props) => {
    const { info } = props;
    const { id, city } = info;
    const [description, setDescription] = useState("")
    const [buffer, setBuffer] = useState(null);
    const [file, setFile] = useState(null);
    const { account } = useWallet()
    const [approval, setApproval] = useState(false)
    const tokenAddress = getCakeAddress()
    const tokenContract = useERC20(tokenAddress);
    const billboardContract = useBillboardContract()
    const billboardAddress = getBillboardAddress()
    const { onApprove } = useBillboardApprove(tokenContract, billboardAddress)
    const allowance = new BigNumber(useBillboardAllowance(tokenContract, billboardAddress) || 0)
    const needsApproval = allowance.toNumber() <= 0
    const [onPresentConfirmationModal] = useModal(<ConfirmationPendingContent onDismiss={() => { return null }} />)
    const [onPresentBillboardBidModal] = useModal(<BillboardBidModal onDismiss={() => { return null }} />)


    const handleApprove = useCallback(async () => {
        try {
            setApproval(true)
            const txHash = await onApprove()
            // user rejected tx or didn't go thru
            if (!txHash) {
                setApproval(false)
            }
        } catch (e) {
            console.error(e)
        }
    }, [onApprove, setApproval])

    const captureFile = (event) => {
        event.preventDefault()
        const image = event.target.files[0]
        const urlReader = new window.FileReader()
        const bufferReader = new window.FileReader()
        urlReader.readAsDataURL(image)
        bufferReader.readAsArrayBuffer(image)

        urlReader.onload = (arg) => {
            setFile(arg.target.result)
        }

        bufferReader.onloadend = () => {
            const arrayBuffer = new Uint8Array(bufferReader.result as ArrayBuffer)
            const enc = new TextDecoder("utf-8");
            setBuffer(Buffer.from(enc.decode(arrayBuffer)))
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const response = await ipfs.add(buffer);
        console.log(">>>>>>>>>>>>>>>>", response);
        // const { hash } = response[0];
        // onPresentConfirmationModal();
        // const result = await billboardContract.methods.bid(id, city, hash, description).send({ from: account })
        // if (result) {
        //     const action = {
        //         type: GET_BID_BILLBOARD_HASH,
        //         hash: result.transactionHash,
        //     }
        //     store.dispatch(action)
        //     onPresentBillboardBidModal()
        // }
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
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <Text mb="5px">* Upload Images:</Text>
                    <Input
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={captureFile}
                        required
                        style={{ padding: "8px" }}
                    />

                    {file && <img src={file} alt="board" width="200px" />}<br />
                </div>

                {account ? <Flex alignItems="center" justifyContent="space-between">
                    <Button onClick={handleApprove} disabled={!needsApproval && !approval}>Approve</Button>
                    <Button type="submit" >Submit</Button>
                </Flex> : <UnlockButton />}
            </form>
        </FormLayout>

    )
}

export default React.memo(BillboardForm);