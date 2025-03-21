import style from './ProfileInfo.module.css'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {updateStatusThunk} from "../../../redux/profileReducer";

type PropsType = {
    status: string,
    updateStatusThunk: (status: string) => void,
    isOwner: boolean,
}

const ProfileStatus: React.FC<PropsType> = (props) => {

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
        props.updateStatusThunk(status)
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                    <span onDoubleClick={activateEditMode}>{props.status}</span>
                </div>
            }
        </div>
    )
}

export default ProfileStatus