import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {startMessagesListeningThunk, stopMessagesListeningThunk} from '../../redux/chatReducer'
import {AppStateType} from '../../redux/store'
import {Messages} from './Messages'
import {SendMessageToChatForm} from './SendMessageToChatForm'

const Chat: React.FC = () => {
    const dispatch = useDispatch<any>()
    const status = useSelector((state: AppStateType) => state.chatPage.status)

    useEffect(() => {
        dispatch(startMessagesListeningThunk())
        return () => {
            dispatch(stopMessagesListeningThunk())
        }
    }, []);

    return (
        <div>
            {status === 'error' ? <div>Error. please refresh the page</div> :
                <>
                    <Messages/>
                    <SendMessageToChatForm/>
                </>
            }
        </div>
    )
}

export default Chat
