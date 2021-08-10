import React, { useState } from "react"
import { Popup } from "react-map-gl"
import BillboardForm, { FormProps } from "./BillboardForm"
import BillboardDetails from "./BillboardDetails"

const PostOrBid: React.FC<FormProps> = ({ info, setPopupInfo, baseInfo, tokenBalance, allowance }) => {
    const [showForm, setShowForm] = useState(false)

    let comp = <BillboardForm info={info} setPopupInfo={setPopupInfo} baseInfo={baseInfo} tokenBalance={tokenBalance} allowance={allowance} setShowForm={setShowForm} />;

    if (info && info.ipfsHash) {
        if (showForm) {
            comp = <BillboardForm info={info} setPopupInfo={setPopupInfo} baseInfo={baseInfo} tokenBalance={tokenBalance} allowance={allowance} setShowForm={setShowForm} />
        } else {
            comp = <BillboardDetails info={info} baseInfo={baseInfo} setShowForm={setShowForm} />
        }
    }

    return (
        <div>
            {
                info && (<Popup
                    tipSize={10}
                    anchor="bottom"
                    longitude={info.longitude}
                    latitude={info.latitude}
                    closeOnClick={false}
                    onClose={() => {
                        setPopupInfo(null)
                        setShowForm(false)
                    }
                    }
                >
                    {comp}
                </Popup>
                )
            }
        </div>

    )
}

export default React.memo(PostOrBid)