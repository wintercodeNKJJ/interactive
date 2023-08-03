import React, { createContext, useContext, useEffect, useState } from 'react'
import getDomments from '../data/api'

const Context = createContext()

export const MyContext = ({children}) => {
  const [commentsf, setCommentsf] = useState([])
  const [cuserf, setCuserf] = useState()
  useEffect(() => {
    getDomments().then((data)=>{
      setCommentsf(data.comments)
      setCuserf(data.currentUser)
    })
  }, [])

  const [render, setRender] = useState(0)

  const addCommentScor = (comment)=>{
    let temp_comments = commentsf
    let index = commentsf.indexOf(comment)
    temp_comments[index].score++;

    setCommentsf(temp_comments)

    setRender(render+1 % 5)
  }

  const decrisCommentScor = (comment)=>{
    let temp_comments = commentsf
    let index = commentsf.indexOf(comment)
    temp_comments[index].score--;

    setCommentsf(temp_comments)
    
    setRender(render+1 % 5)
  }

  const addReplyScor = (comment)=>{
    let temp_comments = commentsf
    let pid = commentsf.findIndex((x)=>x.replies.indexOf(comment) !== -1);
    let temp_rep_parent = commentsf[pid] 
    let rid = temp_rep_parent.replies.indexOf(comment)
    temp_comments[pid].replies[rid].score++

    setCommentsf(temp_comments)

    setRender(render+1 % 5)
  }

  const decrisReplyScor = (comment)=>{
    let temp_comments = commentsf
    let pid = commentsf.findIndex((x)=>x.replies.indexOf(comment) !== -1);
    let temp_rep_parent = commentsf[pid] 
    let rid = temp_rep_parent.replies.indexOf(comment)
    temp_comments[pid].replies[rid].score--

    setCommentsf(temp_comments)

    setRender(render+1 % 5)
  }

  const addComment = (comment)=>{
    let temp_comments = commentsf
    let id = temp_comments.length
    temp_comments.push({id:id,...comment})
    setCommentsf(temp_comments)

    setRender(render+1 %5)
  }
  const deleteComment = (comment)=>{
    let cid = commentsf.indexOf(comment)
    let temp_comments = commentsf
    temp_comments = temp_comments.splice(0,cid).concat(temp_comments.splice(cid+1,temp_comments.length))
    setCommentsf(temp_comments)

    setRender(render+1 %5)
  }
  const updateComment = (comment,newComment)=>{
    let cid = commentsf.indexOf(comment)
    let temp_comments = commentsf
    temp_comments = temp_comments.splice(0,cid).concat([newComment],temp_comments.splice(cid+1,temp_comments.length))
    console.log(comment)
    setCommentsf(temp_comments)

    setRender(render+1 %5)
  }
  
  const replyComment = (target,comment)=>{
    let temp_comments = commentsf
    let pid = temp_comments.findIndex(x=> x.id === target.id && x.user.username === target.user.username);
    temp_comments[pid].replies.push(comment)

    setCommentsf(temp_comments)

    setRender(render+1 %5)

  }
  const deleteReply = (comment)=>{
    let temp_comments = commentsf
    let pid = commentsf.findIndex((x)=>x.replies.indexOf(comment) !== -1);
    let temp_rep_parent = commentsf[pid] 
    let rid = temp_rep_parent.replies.indexOf(comment)
    
    console.log('comment',temp_rep_parent,'index',rid)

    temp_comments[pid].replies = temp_comments[pid].replies.splice(0,rid).concat(temp_rep_parent.replies.splice(rid+1,temp_rep_parent.replies.length))
    
    console.log(temp_comments[pid].replies)
    setCommentsf(temp_comments)

    setRender(render+1 %5)
  }

  const updateReply = (comment,newComment)=>{
    let temp_comments = commentsf
    let pid = commentsf.findIndex((x)=>x.replies.indexOf(comment) !== -1);
    let temp_rep_parent = commentsf[pid] 
    let rid = temp_rep_parent.replies.indexOf(comment)
    
    console.log('comment',newComment,'index',rid)

    temp_comments[pid].replies = temp_comments[pid].replies.splice(0,rid).concat([newComment],temp_rep_parent.replies.splice(rid,temp_rep_parent.replies.length))
    
    setCommentsf(temp_comments)
    console.log(commentsf[0].replies)

    setRender((render+1) %5)
  }

  const replyReply = (target,comment)=>{
    console.log(target,comment)
    let temp_comments = commentsf
    let pid = temp_comments.findIndex(x => x.replies.findIndex(y => y.id === target.id && y.user.username === target.user.username) !== -1);

    let rid = temp_comments[pid].replies.indexOf(target)

    console.log(rid)
    temp_comments[pid].replies = temp_comments[pid].replies.splice(0,rid+1).concat([comment],temp_comments[pid].replies.splice(rid,temp_comments[pid].replies.length))

    setCommentsf(temp_comments)

    setRender(render+1 %5)

  }

  return (
    <Context.Provider 
    value={{
      addCommentScor,
      decrisCommentScor,
      addComment,
      deleteComment,
      updateComment,
      replyComment,
      deleteReply,
      updateReply,
      addReplyScor,
      decrisReplyScor,
      replyReply,

      commentsf,
      cuserf,
      render
    }}>
      {children}
    </Context.Provider>
  )
}

export const useMyContext = ()=> useContext(Context)
