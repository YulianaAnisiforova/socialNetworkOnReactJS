import style from './ProfileInfo.module.css'
import React, {useEffect, useState} from 'react'

const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

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

    return (
        <div>
            {props.isOwner
                ? <div>
                    {!editMode &&
                        <div>
                            <span className={style.infoItem}
                                  onDoubleClick={activateEditMode}>{props.status}</span>
                        </div>
                    }
                    {editMode &&
                        <div>
                            <input autoFocus={true} onChange={onStatusChange} onBlur={deactivateEditMode}
                                   value={status} className={style.infoInput}/>
                        </div>
                    }
                </div>

                : <div>
                    <span className={style.status} onDoubleClick={activateEditMode}>{props.status}</span>
                </div>
            }
        </div>
    )
}

export default ProfileStatus