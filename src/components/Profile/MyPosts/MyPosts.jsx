import React from 'react'
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import NewPost from "./NewPost/NewPost";

const MyPosts = () => {
    return (
            <div className={style.postsContainer}>
                <NewPost />
                <div className={style.posts}>
                    <Post message='I`m going to visit my gruncle Stan again this summer OMG soooo excited!! Looking forward to meet him again!!!!!' likes='1488'/>
                    <Post message='My brother Dipper is sooooo annoying' likes='2'/>
                    {/*<Post message='Oh, girl you got me ackin` so cray cray{\n}*/}
                    {/*      CRAY CRAY{\n}*/}
                    {/*      You tell me that you won`t be my ba-bay{\n}*/}
                    {/*We`re non threatening, girl{\n}*/}
                    {/*Yeah!' likes='9'/>*/}
                    <Post message='la la la la la la la la la la la la la la la la
                        la la la la la la la la la la la la la la la la
                        la la la la la la la la la la la la la la la la
                        la la la la la la la la la la la la la la la la
                        la la la la la la la la la la la la la la la la
                        la la la la la la la la la la la la la la la la
                        la la la la la la la la la la la la la la la la
                        la la la la la la la la la la la la la la la la ' likes='0'/>
                    <Post message='Hello everyone it`s my first post here haha' likes='7'/>
                </div>
            </div>)
}

export default MyPosts