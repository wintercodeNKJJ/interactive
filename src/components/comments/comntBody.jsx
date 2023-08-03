import React, { useEffect, useState } from 'react'
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
import {FaTrash, FaReply} from 'react-icons/fa'
import {MdEdit} from 'react-icons/md'
import Reply from './reply'
import { useMyContext } from '../../context/context'

const ComntBody = ({comment,curentuser}) => {
  const [target, setTarget] = useState(comment)
  
  const {addReplyScor,decrisReplyScor,addCommentScor,decrisCommentScor,deleteComment,updateComment,deleteReply,updateReply,render} = useMyContext()

  let show = curentuser.username === target.user.username;
  useEffect(() => {
    setTarget(comment);
    console.log(render)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render])

  const [edit, setEdit] = useState(false)
  const [reply, setReply] = useState(false)
  

  const addScore = ()=> {
    if (comment.replies !== undefined) {
      addCommentScor(comment)
    }else{
      addReplyScor(comment)
    }
  }

  const decrisScore = ()=> {
    console.log(comment.replies !== undefined)
    if (comment.replies !== undefined) {
      decrisCommentScor(comment)
    }else{
      decrisReplyScor(comment)
    }
  }
  
  const delete_Comment = ()=>{
    console.log('hello',comment.replies)

    if (comment.replies !== undefined) {
      deleteComment(comment)
    }else{
      console.log('hello delete reply')
      deleteReply(comment)
    }
  }

  const [newComment, setNewComment] = useState(comment)
  
  const update_Comment = ()=>{
    if (comment.replies !== undefined) {
      updateComment(comment,newComment)
    }else{
      console.log("changing")
      updateReply(comment,newComment)
    }
  }
  
  return (
    <>
    <div className='comment'>
      <div className='comment-score'>
        <i className='cusrsor' onClick={()=>addScore()}><AiOutlinePlus size={15}/></i>
        <p>{target.score}</p>
        <i className='cusrsor' onClick={()=>decrisScore()}><AiOutlineMinus size={15}/></i>
      </div>
      <div className='comments-main-section'>
        <div className='comment-headline'>
          <img src={`${process.env.PUBLIC_URL}/${target.user.image.png}`} alt="u" className='comment-img'/>
          <p className=' font-[600]'>{target.user.username}</p>
          <p className='time'>1 month ago</p>
          <div className='comment-opt'>
            {show && 
              <>
                <p className='flex items-center gap-1 text-red-400 cusrsor' onClick={()=>delete_Comment()}><i><FaTrash size={15}/></i>Delete</p>
                <p className='flex items-center gap-1 text-[#5358B6] cusrsor' onClick={()=>setEdit(!edit)}><i><MdEdit size={15}/></i>Edit</p>
              </>
            }
            {!show &&
             <p className='flex items-center gap-1 text-[#5358B6] cusrsor' onClick={()=>setReply(!reply)}><i><FaReply size={15}/></i>Reply</p>}
          </div>
        </div>
        <div className='comments-body'>
          {!edit && <p>{target.content}</p>}
          {edit && <textarea className='comment-p cusrsor' name="" id="" defaultValue={target.content} onChange={(e)=>setNewComment({...newComment,content:e.target.value})}></textarea>}
        </div>
        {edit && <div className='comment-bottom'>
          <button className='comment-update' onClick={()=>update_Comment()}>Update</button>
        </div>}
      </div>
    </div>
    {reply && <Reply target={target} curentuser={curentuser} mode={1}/>}
    </>
  )
}

export default ComntBody