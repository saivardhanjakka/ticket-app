import React from 'react'
import Link from 'next/link'
import ToggleMode from './ToggleMode'
import MainNavLinks from './MainNavLinks'
import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'

const Main = async() => {
  const session =await getServerSession(options)
  console.log(session)
  return (
    <div className='flex justify-between'>
      <MainNavLinks/>
    
<div className='flex items-center gap-2'>
{session ? (
  <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
):(
  <Link href="/api/auth/signin">Login</Link>
)}
<ToggleMode/>


<ToggleMode/>

</div>
 
 </div>

  )
}

export default Main