import React, { useState } from 'react'
import { useMyContext } from '../../context/context'

const Reply = ({curentuser,target,mode}) => {
  
  const {addComment,replyComment,replyReply} = useMyContext()

  let date = new Date()
  const [newComment, setNewComment] = useState({
    content:'',
    createdAt: date,
    score: 0,
    user: {},
    replies:[]
  })

  const [newReply, setNewReply] = useState({
    content:'',
    createdAt: date,
    score: 0,
    user: {}
  })


  const reply_Send = (e)=>{
    e.preventDefault()
    let x = newComment
    x.user = curentuser
    setNewComment(x)

    let y = newReply
    y.user = curentuser
    setNewComment(y)
    
    if(target.length !== undefined){
      addComment(newComment)
    }else{
      if(target.replies !== undefined){
          replyComment(target,newReply)
        }else{
          replyReply(target,newReply)
        }
    }
  }

  return (
    <>
    {curentuser && 
      <>
        {mode === 1?
      <div className='comment-reply'>
      <div className='image'><img src={`${process.env.PUBLIC_URL}/${curentuser.image.png}`} alt="u" className='image-img'/></div>
      <form className='form' onSubmit={(e)=>reply_Send(e)}>
        <textarea name="reply" id="reply" className='textarea cusrsor' onChange={(e)=>setNewReply({...newReply,content:e.target.value})}></textarea>
        <button type="submit" className=' button-r cusrsor'>REPLY</button>
      </form>
    </div>
    :
    <div className='comment-reply'>
      <div className='image'><img src={`${process.env.PUBLIC_URL}/${curentuser.image.png}`} alt="u" className='image-img'/></div>
      <form className='form' onSubmit={(e)=>reply_Send(e)}>
        <textarea name="reply" id="reply" placeholder='Add a comment...' className='textarea cusrsor' onChange={(e)=>setNewComment({...newComment,content:e.target.value})}></textarea>
        <button type="submit" className=' button-r cusrsor'>SEND</button>
      </form>
    </div>
    }
      </>
    }
    </>
  )
}

export default Reply