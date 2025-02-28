import style from './ProfileInfo.module.css'
import React, {useState} from 'react'

const ProfileStatusHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (event) => {
        setStatus(event.currentTarget.value)
    }

    // componentDidUpdate = (prevProps, prevState) => {
    //     if (prevProps.status !== this.props.status) {
    //         this.setState({
    //             status: this.props.status
    //         })
    //     }
    // }


    return (
        <div>
            {!editMode &&
            <div>
                <span className={style.status} onDoubleClick={activateEditMode}>{props.status}</span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true} onChange={onStatusChange} onBlur={deactivateEditMode}
                        value={status} className={style.infoInput}/>
            </div>
            }
        </div>
    )
}

export default ProfileStatusHooks