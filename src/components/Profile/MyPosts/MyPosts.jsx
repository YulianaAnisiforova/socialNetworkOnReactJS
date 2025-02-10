import React from 'react'
import style from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postsElements = props.posts.map(
        post => <Post key={post.id} message={post.message} likes={post.likes}/>)

    let newPostElement = React.createRef()

    let addPostBtn = () => {
        props.addPost()
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }

    return (
        <div className={style.postsWrapper}>

            <div className={style.newPost}>
            <textarea className={style.newPostArea}  ref={newPostElement} cols="50" rows="1" placeholder="How are you?"
                      onChange={ onPostChange } value={props.newPostText} />
                <button onClick={ addPostBtn } className={style.newPostBtn}>Add post</button>
            </div>

            <div className={style.posts}>
                {postsElements}
            </div>

        </div>
    )
}

export default MyPosts