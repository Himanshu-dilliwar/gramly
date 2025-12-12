import React from 'react'

type Props = {
    children: React.ReactNode
    params: {slug:string}
}

const Layout = ({children,params}: Props) => {
  return (
    <div>Layout</div>
  )
}

export default Layout