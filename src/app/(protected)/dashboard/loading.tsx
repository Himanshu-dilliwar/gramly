import Loder from '@/components/global/loder'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='h-screen flex justify-center items-center'>
        <Loder state>...Loading</Loder>
    </div>
  )
}

export default Loading