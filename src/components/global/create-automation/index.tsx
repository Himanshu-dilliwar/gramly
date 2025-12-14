import { Button } from '@/components/ui/button'

import React from 'react'
import Loader from '../loder'
import { Activity } from 'lucide-react'

type Props = {}

const CreateAutomation = (props: Props) => {

    //WIP:create a new automation on databse using mutate
  return <Button className="lg:px-10 py-6 bg-gradient-to-br from-[#3352CC] to-[#1C2D70] hover:opacity-80  text-white font-medium rounded-full">
    <Loader state={false}>
        <Activity/>
    <p className='lg:inline hidden'>Create an Automation</p>
    </Loader>
    </Button>
  
}

export default CreateAutomation