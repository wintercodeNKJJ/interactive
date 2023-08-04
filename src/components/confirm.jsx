import React from 'react'

const Confirm = ({conf}) => {
  const decision = (data) =>{
    if(data === 'yes'){
      conf(1)
      console.log('yes')
      window.delete_confirm.close()
    }else{
      conf(0)
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
