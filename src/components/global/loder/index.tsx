import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    state: boolean
    className?: string
    color?: string
    children?: React.ReactNode
}

const Loader = ({className,color,state,children}: Props) => {
  return state ? (
    <div className={cn(className)}><Spinner color={color}/></div>
  ):(
    children
  )
}
export default Loader