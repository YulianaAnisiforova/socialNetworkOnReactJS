import React from 'react'
import style from './Users.module.css'
import anonymousAvatar from './../../img/cipher.WEBP'

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
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
                                        props.unfollow(user.id)
                                    }}>unfollow</button>
                                    : <button className={style.followBtn} onClick={() => {
                                        props.follow(user.id)
                                    }}>follow</button>}
                            </div>
                        </div>
                        <div className={style.userInfo}>
                            <div>{user.name}</div>
                            <div className={style.status}>{user.status}</div>
                            {/*<div>{user.location.country}, {user.location.city}</div>*/}
                        </div>

                    </div>
                )
            }
            <div className={style.pagesBtnArea}>
                {pages.map((page) => {
                    return <button onClick={(event) => props.onPageChanged(page)}
                                   className={props.currentPage === page ?
                                       style.selectedPage : style.pagesBtn}>{page}</button>
                })}
            </div>
        </div>
    )
}

export default Users
