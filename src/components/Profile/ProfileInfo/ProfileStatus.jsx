import Preloader from "../../Common/Preloader/Preloader";
import style from "./ProfileInfo.module.css";
import anonim from "../../../img/anonim.png";
import React from "react";

class ProfileStatus extends React.Component {
    // if (!this.props.status) {
    //     return <Preloader/>
    // }

    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}/>
                    </div>
                    : <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>Status: {this.props.status}</span>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus