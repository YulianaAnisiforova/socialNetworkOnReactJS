import React from "react";
import style from './Users.module.css'
import axios from "axios";
import anonymousAvatar from './../../img/cipher.WEBP'

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render = () => {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

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
                                {/*<div>{user.location.country}, {user.location.city}</div>*/}
                            </div>

                        </div>
                    )
                }
                <div className={style.pagesBtnArea}>
                    {pages.map((page) => {
                        return <button onClick={(event) => this.onPageChanged(page)}
                                       className={this.props.currentPage === page ?
                                           style.selectedPage : style.pagesBtn}>{page}</button>
                    })}
                </div>
            </div>
        )
    }
}

export default Users
