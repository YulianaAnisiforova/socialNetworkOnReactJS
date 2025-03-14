import React from 'react'
import {
    sendMessage,
} from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'
import {AppStateType} from '../../redux/store'
import {DialogType, MessageType, UserType} from '../../types/types'

type MapStateToPropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    newMsg: string,
}
type MapDispatchToPropsType = {
    sendMessage: (newMsg: string) => void,
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMsg: state.dialogsPage.newMsg,
    }
}

export default compose(
    connect(mapStateToProps, {sendMessage}),
    WithAuthRedirect
)(Dialogs)
