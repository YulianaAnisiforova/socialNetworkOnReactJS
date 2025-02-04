import React from 'react'
import style from './NewPost.module.css'
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/state";

const NewPost = (props) => {
    let newPostElement = React.createRef()

    let addPostBtn = () => {
        props.dispatch(addPostActionCreator())
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.dispatch(updateNewPostTextActionCreator(text))
    }

    return (
        <div className={style.newPost}>
            <textarea className={style.newPostArea}  ref={newPostElement} cols="50" rows="1" placeholder="How are you?"
                      onChange={ onPostChange } value={props.newPostText} />
            <button onClick={ addPostBtn } className={style.newPostBtn}>Add post</button>
        </div>)
}

export default NewPost