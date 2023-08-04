import React from 'react'
import { useMyContext } from '../context/context'

const Confirm = () => {

  const {comtoDel,setComtoDel,deleteComment,deleteReply} = useMyContext() 

  const decision = (data) =>{
    if(data === 'yes'){
      if(comtoDel.func === 1){
        console.log('yes')
        deleteComment(comtoDel.com)
      }else{
        console.log('yes')
        deleteReply(comtoDel.com)
      }
      setComtoDel({com:{},func:0})
      window.delete_confirm.close()
    }else{
      console.log('no')
      window.delete_confirm.close()
    }
  }
  return (
    <dialog id='delete_confirm' className='dialog'>
      <form>
        <h1 className='title-h1'>Delete comment</h1>
        <p className='conf-cont'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className='options-conf'>
          <button onClick={()=>decision('no')} className='no'>NO, CANCEL</button>
          <button onClick={()=>decision('yes')} className='yes'>YES, DELETE</button>
        </div>
      </form>
    </dialog>
  )
}

export default Confirm
