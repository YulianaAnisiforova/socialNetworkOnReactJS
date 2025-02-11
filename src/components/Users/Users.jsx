import React from "react";
import style from './Users.module.css'
import axios from "axios";
import anonymousAvatar from './../../img/cipher.WEBP'

class Users extends React.Component {

    constructor(props) {
        super(props);

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render = () => {
        return (
            <div>
                {
                    this.props.users.map((user) => <div key={user.id} className={style.item}>
                            <div className={style.avatarFollow}>
                                <div>
                                    <img className={style.userAvatar} src={user.photos.small != null
                                        ? user.photos.small : anonymousAvatar} alt="avatar"/>
                                </div>
                                <div>
                                    {user.followed ?
                                        <button className={style.followBtn} onClick={() => {
                                            this.props.unfollowUser(user.id)
                                        }}>unfollow</button>
                                        : <button className={style.followBtn} onClick={() => {
                                            this.props.followUser(user.id)
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
}

export default Users
