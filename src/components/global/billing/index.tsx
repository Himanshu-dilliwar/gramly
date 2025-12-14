import React from 'react'
import PaymentCard from './payment-card'

type Props = {}

const Billing = (props: Props) => {
  return (
    <PaymentCard label="FREE" current="FREE" />
  )
}

export default Billing