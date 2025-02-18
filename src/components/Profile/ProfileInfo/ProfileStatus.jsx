import Preloader from "../../Common/Preloader/Preloader";
import style from "./ProfileInfo.module.css";
import anonim from "../../../img/anonim.png";
import React from "react";

class ProfileStatus extends React.Component {
    // if (!props.profile) {
    //     return <Preloader/>
    // }

    render() {
        return (
            <div>

                <div>
                    <span>{this.props.status}</span>
                </div>

                <div>
                    <input value={this.props.status}/>
                </div>
            </div>
        )
    }
}

export default ProfileStatus