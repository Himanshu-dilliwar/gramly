import React from 'react'
import PopOver from '../../popover'
import BlueAddIcon from "@/icons/BlueAddIcon.svg"

type Props = {
    children: React.ReactNode
    label:string
}

const TriggerButton = ({children, label}: Props) => {
  return (
    <PopOver className='w-[400px]' trigger={<button
          type="button"
          className="w-[400px] border-2 border-dashed border-[#3352cc]
                     hover:opacity-80 transition duration-100
                     rounded-xl flex gap-x-2 justify-center items-center p-5
                     cursor-pointer"
        >
          <BlueAddIcon />
          <span className="text-[#768BDD] font-bold">
            {label}
          </span>
        </button>}>
        {children}
    </PopOver>
  )
}

export default TriggerButton