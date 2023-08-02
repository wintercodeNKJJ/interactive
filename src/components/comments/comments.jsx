import React, { useEffect, useState } from 'react'
import ComntBody from './comntBody'
import Reply from './reply'
import getDomments from '../../data/api'

const Comments = () => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    getDomments().then((data)=>{
      console.log(data.comments)
      setComments(data.comments)
    })
  }, [])
  
  return (
    <div className='comment-layout'>
     <ComntBody/>
     <Reply/>
      <div className='comment-reply-list'>
        {comments.map((item,i)=>(
          <ComntBody comment={item} key={i}/>
        ))}
      </div>
     <Reply/>
    </div>
  )
}

export default Comments
