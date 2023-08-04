import React, { createContext, useContext, useEffect, useState } from 'react'
import getDomments from '../data/api'

const Context = createContext()

export const MyContext = ({children}) => {
  
  const [confDel, setConfDel] = useState(null)

  const [commentsf, setCommentsf] = useState([])
  const [cuserf, setCuserf] = useState()

  useEffect(() => {
    getDomments().then((data)=>{
      let info = localStorage.getItem('data')
      info = JSON.parse(info)
      console.log(info) 
      if(info === undefined || info === null){
        setCommentsf(data.comments)
        setCuserf(data.currentUser)
      }else{
        setCommentsf(info.comments)
        setCuserf(info.currentUser)
      }
    })
  }, [])

  const storeComment = ()=>{
    commentsf.sort(
      (a,b)=> b.score - a.score
    )
    commentsf.forEach(element => {
      if(element.replies.length > 1){
        element.replies.sort(
          (a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      }
    });
    localStorage.setItem('data',JSON.stringify({comments:commentsf,currentUser:cuserf}))
  }

  const [render, setRender] = useState(0)

  const addCommentScor = (comment)=>{
    let temp_comments = commentsf
    let index = commentsf.indexOf(comment)
    temp_comments[index].score++;

    setCommentsf(temp_comments)

    setRender(render+1 % 5)
    storeComment()
  }

  const decrisCommentScor = (comment)=>{
    let temp_comments = commentsf
    let index = commentsf.indexOf(comment)
    temp_comments[index].score--;

    setCommentsf(temp_comments)
    
    setRender(render+1 % 5)
    storeComment()
  }

  const addReplyScor = (comment)=>{
    let temp_comments = commentsf
    let pid = commentsf.findIndex((x)=>x.replies.indexOf(comment) !== -1);
    let temp_rep_parent = commentsf[pid] 
    let rid = temp_rep_parent.replies.indexOf(comment)
    temp_comments[pid].replies[rid].score++

    setCommentsf(temp_comments)

    setRender(render+1 % 5)
    storeComment()
  }

  const decrisReplyScor = (comment)=>{
    let temp_comments = commentsf
    let pid = commentsf.findIndex((x)=>x.replies.indexOf(comment) !== -1);
    let temp_rep_parent = commentsf[pid] 
    let rid = temp_rep_parent.replies.indexOf(comment)
    temp_comments[pid].replies[rid].score--

    setCommentsf(temp_comments)

    setRender(render+1 % 5)
    storeComment()
  }

  const addComment = (comment)=>{
    let temp_comments = commentsf
    let id = temp_comments.length
    temp_comments.push({id:id,...comment})
    setCommentsf(temp_comments)

    setRender(render+1 %5)
    storeComment()
  }

  const deleteComment = (comment)=>{

    // if(confDel === null){
    //   setTimeout(deleteComment(comment),100)
    //   return 0;
    // }
    // if(confDel === 1){

      console.log(confDel)

      let cid = commentsf.indexOf(comment)
      let temp_comments = commentsf
      temp_comments = temp_comments.splice(0,cid).concat(temp_comments.splice(cid+1,temp_comments.length))
      setCommentsf(temp_comments)
  
      setRender(render+1 %5)
      storeComment()
    // }
    // setConfDel(null)
  }

  const updateComment = (comment,newComment)=>{
    let cid = commentsf.indexOf(comment)
    let temp_comments = commentsf
    temp_comments = temp_comments.splice(0,cid).concat([newComment],temp_comments.splice(cid+1,temp_comments.length))
    console.log(comment)
    setCommentsf(temp_comments)

    setRender(render+1 %5)
    storeComment()
  }
  
  const replyComment = (target,comment)=>{
    let temp_comments = commentsf
    let pid = temp_comments.findIndex(x=> x.id === target.id && x.user.username === target.user.username);
    temp_comments[pid].replies.push(comment)

    setCommentsf(temp_comments)

    setRender(render+1 %5)
    storeComment()
  }

  const deleteReply = (comment)=>{

    // if(confDel === null){
    //   setTimeout(deleteReply(comment),100)
    //   return 0;
    // }
    // if(confDel === 1){

      console.log(confDel)

      let temp_comments = commentsf
      let pid = commentsf.findIndex((x)=>x.replies.indexOf(comment) !== -1);
      let temp_rep_parent = commentsf[pid] 
      let rid = temp_rep_parent.replies.indexOf(comment)
  
      temp_comments[pid].replies = temp_comments[pid].replies.splice(0,rid).concat(temp_rep_parent.replies.splice(rid+1,temp_rep_parent.replies.length))
      
      setCommentsf(temp_comments)
  
      setRender(render+1 %5)
      storeComment()
    // }
    // setConfDel(null)
  }

  const updateReply = (comment,newComment)=>{
    let temp_comments = commentsf
    let pid = commentsf.findIndex((x)=>x.replies.indexOf(comment) !== -1);
    let temp_rep_parent = commentsf[pid] 
    let rid = temp_rep_parent.replies.indexOf(comment)
    

    temp_comments[pid].replies = temp_comments[pid].replies.splice(0,rid).concat([newComment],temp_rep_parent.replies.splice(rid,temp_rep_parent.replies.length))
    
    setCommentsf(temp_comments)

    setRender((render+1) %5)
    storeComment()
  }

  const replyReply = (target,comment)=>{
    console.log(target,comment)
    let temp_comments = commentsf
    let pid = temp_comments.findIndex(x => x.replies.findIndex(y => y.id === target.id && y.user.username === target.user.username) !== -1);

    let rid = temp_comments[pid].replies.indexOf(target)

    temp_comments[pid].replies = temp_comments[pid].replies.splice(0,rid+1).concat([comment],temp_comments[pid].replies.splice(rid,temp_comments[pid].replies.length))

    setCommentsf(temp_comments)

    setRender(render+1 %5)
    storeComment()
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
      setConfDel,

      commentsf,
      cuserf,
      render,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useMyContext = ()=> useContext(Context)
