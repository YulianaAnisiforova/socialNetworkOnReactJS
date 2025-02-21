import style from './ProfileInfo.module.css'
import React from 'react'

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (event) => {
        this.setState({
            status: event.currentTarget.value
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <div>
                        <input autoFocus={true}
                               onChange={this.onStatusChange} onBlur={this.deactivateEditMode}
                               value={this.state.status} className={style.infoInput}/>
                    </div>
                    : <div>
                        <span onDoubleClick={this.activateEditMode}>Status: {this.props.status}</span>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus