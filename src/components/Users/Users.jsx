import React from "react";
import styles from './Users.module.css'

const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 0,
                followed: false,
                fullName: 'Nancy Drew',
                status: 'sorry not my business',
                location: {city: 'Boston', country: 'USA'},
                imgURL: 'https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg',
            },
            {
                id: 1,
                followed: true,
                fullName: 'Sarah Parker',
                status: 'my status is deleted',
                location: {city: 'LA', country: 'USA'},
                imgURL: 'https://www.shutterstock.com/shutterstock/videos/1034880713/thumb/1.jpg?ip=x480',
            },
            {
                id: 2,
                followed: false,
                fullName: 'John Gates',
                status: 'hm',
                location: {city: 'Montreal', country: 'Canada'},
                imgURL: 'https://images.pexels.com/photos/1288182/pexels-photo-1288182.jpeg?cs=srgb&dl=pexels-juanlaurio-1288182.jpg&fm=jpg',
            },
            {
                id: 3,
                followed: true,
                fullName: 'Will wont',
                status: 'my name is a joke',
                location: {city: 'London', country: 'UK'},
                imgURL: 'https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg',
            },
        ])
    }

    return (
        <div>
            {
                props.users.map((user) => <div>
                    <span>
                        <div>
                            <img src={user.imgURL} alt="avatar"/>
                        </div>
                        <div>
                            {user.followed ? <button onClick={() => {props.unfollowUser(user.id)}}>unfollow</button>
                                : <button onClick={() => {props.followUser(user.id)}}>follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.fullName}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{user.location.country}</div>
                            <div>{user.location.city}</div>
                        </span>
                    </span>
                </div>
                )
            }
        </div>
    )
}

export default Users
