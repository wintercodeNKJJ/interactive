import React from 'react'
import Comments from './comments/comments'
import Confirm from './confirm'
import { useMyContext } from '../context/context'

const Layout = () => {

  const {setConfDel} = useMyContext()

  return (
    <div className='layout'>
      <Comments/>
      <Confirm conf={setConfDel}/>
    </div>
  )
}

export default Layout
