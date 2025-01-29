import React from 'react'
import style from './NewPost.module.css'

const NewPost = () => {
    return (
          <div className={style.newPost}>
              <textarea className={style.newPostArea} cols="50" rows="1" placeholder="How are you?"  contenteditable="true"></textarea>
              <button className={style.newPostBtn}>Add post</button>
          </div>)
}

export default NewPost