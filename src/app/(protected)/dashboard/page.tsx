import { redirect } from 'next/navigation'
import { onBoardUser } from '@/actions/user'

const Page = async () => {
  const result = await onBoardUser()

  if (result?.status === 200 || result?.status === 201) {
    // use clerkId or db user id — NOT name
    redirect(`/dashboard/${result.data?.firstname}`)
  }

  redirect('/sign-in')
}

export default Page
