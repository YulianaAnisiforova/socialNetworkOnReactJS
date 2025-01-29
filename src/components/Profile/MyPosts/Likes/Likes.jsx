import React from 'react'
import style from './Likes.module.css'

const Likes = (props) => {
    return (
        <span> {props.likes} likes</span>
    )
}

export default Likes