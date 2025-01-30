import React from 'react'
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import NewPost from "./NewPost/NewPost";

const MyPosts = () => {
    let postsData = [
        {
            id: 0,
            message: 'I`m going to visit my gruncle Stan again this summer OMG soooo excited!! Looking forward to meet him again!!!!!',
            likes: '1488'
        },
        {id: 1, message: 'My brother Dipper is sooooo annoying', likes: '2'},
        {
            id: 2, message: 'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la\n' +
                'la la la la la la la la la la la la la la la la', likes: '0'
        },
        {id: 3, message: 'Hello everyone it`s my first post here haha', likes: '7'},
    ]

    let postsElements = postsData.map(
        post => <Post message={post.message} likes={post.likes}/>)

    return (
        <div className={style.postsContainer}>
            <NewPost/>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>)
}

export default MyPosts