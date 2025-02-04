import React from 'react'
import style from './NewPost.module.css'

const NewPost = (props) => {
    let newPostElement = React.createRef()

    let addPostBtn = () => {
        props.addPost()
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }

    return (
        <div className={style.newPost}>
            <textarea className={style.newPostArea}  ref={newPostElement} cols="50" rows="1" placeholder="How are you?"
                      onChange={onPostChange} contenteditable="true" value={props.newPostText} />
            <button onClick={addPostBtn} className={style.newPostBtn}>Add post</button>
        </div>)
}

export default NewPost