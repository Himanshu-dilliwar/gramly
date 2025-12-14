import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import React from 'react'

type Props = {}

export const Notification = (props: Props) => {
  return (
    <Button>
        <Bell color='#3352CC' fill='#3352CC'></Bell>
    </Button>
  )
}