import React from "react";
import style from './Users.module.css'
import axios from "axios";
import anonymousAvatar from './../../img/cipher.WEBP'

const Users = (props) => {
    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })
        }
    }

    return (
        <div>
            <button onClick={getUsers}>get users</button>
            {
                props.users.map((user) => <div key={user.id} className={style.item}>
                        <div className={style.avatarFollow}>
                            <div>
                                <img className={style.userAvatar} src={user.photos.small != null
                                    ? user.photos.small : anonymousAvatar} alt="avatar"/>
                            </div>
                            <div>
                                {user.followed ?
                                    <button className={style.followBtn} onClick={() => {
                                        props.unfollowUser(user.id)
                                    }}>unfollow</button>
                                    : <button className={style.followBtn} onClick={() => {
                                        props.followUser(user.id)
                                    }}>follow</button>}
                            </div>
                        </div>
                        <div className={style.userInfo}>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                            <div>{'user.location.country'}, {'user.location.city'}</div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default Users
