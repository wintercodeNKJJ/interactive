import React from 'react'

const Reply = () => {
  return (
    <div className='comment-reply'>
        <div className='image'><img src="/" alt="u" className='image-img'/></div>
        <form action="/" className='form'>
          <textarea name="reply" id="reply" className='textarea'></textarea>
          <button type="submit" className=' button-r'>REPLY</button>
        </form>
      </div>
  )
}

export default Reply