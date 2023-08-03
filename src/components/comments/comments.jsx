import React, { useEffect, useState } from 'react'
import ComntBody from './comntBody'
import Reply from './reply'
import { useMyContext } from '../../context/context'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [cuser, setCuser] = useState()

  const {commentsf,cuserf} = useMyContext()
  useEffect(() => {
    setComments(commentsf)
    setCuser(cuserf)
    console.log("new comments",commentsf)
  }, [commentsf,cuserf])
  
  return (
    <div className='comment-layout'>
     {comments.map((ytem,i)=>(
      <>
        <ComntBody key={i} comment={ytem} curentuser={cuser}/>
          <div className='comment-reply-list'>
            {ytem.replies.map((item,i)=>(
              <ComntBody comment={item} curentuser={cuser} key={i}/>
            ))}
          </div>
      </>
     ))}
     <Reply mode={2} curentuser={cuser} target={comments}/>
    </div>
  )
}

export default Comments
