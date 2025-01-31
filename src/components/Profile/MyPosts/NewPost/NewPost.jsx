import React from 'react'
import style from './NewPost.module.css'

const NewPost = () => {
    let newPostElement = React.createRef()

    let addPostBtn = () => {
        let text = newPostElement.current.value
        alert(text)
    }

    return (
        <div className={style.newPost}>
            <textarea className={style.newPostArea}  ref={newPostElement} cols="50" rows="1" placeholder="How are you?"
                      contenteditable="true"></textarea>
            <button onClick={addPostBtn} className={style.newPostBtn}>Add post</button>
        </div>)
}

export default NewPost