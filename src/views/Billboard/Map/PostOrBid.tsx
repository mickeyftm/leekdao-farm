import React from "react"
import { bidStore } from "../store/store"
import BillboardForm, { FormProps } from "./BillboardForm"
import BillboardDetails from "./BillboardDetails"

const PostOrBid: React.FC<FormProps> = ({ info, setPopupInfo, baseInfo, tokenBalance, allowance }) => {
    const { show } = bidStore.getState()

    let comp = <BillboardForm info={info} setPopupInfo={setPopupInfo} baseInfo={baseInfo} tokenBalance={tokenBalance} allowance={allowance} />;

    if (info && info.ipfsHash) {
        if (show) {
            comp = <BillboardForm info={info} setPopupInfo={setPopupInfo} baseInfo={baseInfo} tokenBalance={tokenBalance} allowance={allowance} />
        } else {
            comp = <BillboardDetails info={info} baseInfo={baseInfo} />
        }
    }

    return (
        <div>
            {comp}
        </div>
    )
}

export default React.memo(PostOrBid)