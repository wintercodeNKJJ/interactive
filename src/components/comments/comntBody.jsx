import React, { useEffect, useState } from 'react'
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
import {FaTrash, FaReply} from 'react-icons/fa'
import {MdEdit} from 'react-icons/md'

const ComntBody = ({comment}) => {
  const [target, setTarget] = useState(comment)
  console.log(target)
  useEffect(() => {
    setTarget(comment);
    console.log(target)
  }, [])
  
  
  return (
    <div className='comment'>
      <div className='comment-score'>
        <i><AiOutlinePlus size={15}/></i>
        <p>12</p>
        <i><AiOutlineMinus size={15}/></i>
      </div>
      <div>
        <div className='comment-headline flex gap-4 w-full items-center'>
          <img src="/" alt="u" className='comment-img'/>
          <p className=' font-[400]'>{target.username}</p>
          <p>1 month ago</p>
          <div className='comment-opt'>
            <p className='flex items-center gap-1 text-red-400'><i><FaTrash size={15}/></i>Delete</p>
            <p className='flex items-center gap-1 text-blue-300'><i><MdEdit size={15}/></i>Edit</p>
            <p className='flex items-center gap-1 text-blue-300'><i><FaReply size={15}/></i>Reply</p>
          </div>
        </div>
        <div className='comments-body'>
          <p>comment body Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto tenetur et commodi, quisquam dolorem dolorum minima error exercitationem non quae atque sunt sequi eius, aut optio modi rerum ex ad!</p>
          <textarea className='comment-p' name="" id="" defaultValue={"comment body Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto tenetur et commodi, quisquam dolorem dolorum minima error exercitationem non quae atque sunt sequi eius, aut optio modi rerum ex ad!"}></textarea>
        </div>
        <div className='comment-bottom'>
          <button className='comment-update'>Update</button>
        </div>
      </div>
    </div>
  )
}

export default ComntBody