import React from 'react'
import { Tag, VerifiedIcon, CommunityIcon, BinanceIcon, VoteIcon, TimerIcon, BlockIcon } from 'leek-uikit'

const NoFeeTag = () => (
  <Tag variant="success" outline startIcon={<VerifiedIcon />}>
    No Fees
  </Tag>
)

const RiskTag = ({ risk }) => (
  <Tag variant={risk >= 3 ? 'failure' : 'success'} outline startIcon={<VerifiedIcon />}>
    Risk {risk}
  </Tag>
)

const CoreTag = (props) => (
  <Tag variant="secondary" outline startIcon={<VerifiedIcon width="18px" color="secondary" mr="4px" />}{...props}>
    Core
  </Tag>
)

const CommunityTag = (props) => (
  <Tag variant="failure" outline startIcon={<CommunityIcon width="18px" color="failure" mr="4px" />}{...props}>
    Community
  </Tag>
)

const BinanceTag = () => (
  <Tag variant="binance" outline startIcon={<BinanceIcon />}>
    Binance
  </Tag>
)

const VoteNowTag = () => {
  return (
    <Tag variant="success" startIcon={<VoteIcon />} >
      Vote Now
    </Tag>
  )
}

const SoonTag = () => {
  return (
    <Tag variant="binance" startIcon={<TimerIcon />}>
      Soon
    </Tag>
  )
}

const ClosedTag = () => {
  return (
    <Tag variant="textDisabled" startIcon={<BlockIcon />}>
      Closed
    </Tag >
  )
}

export { CoreTag, CommunityTag, BinanceTag, RiskTag, NoFeeTag, VoteNowTag, SoonTag, ClosedTag }
