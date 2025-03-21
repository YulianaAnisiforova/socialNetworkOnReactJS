import React from 'react'
import style from './Chat.module.css'
import {ArrowUpOutlined} from '@ant-design/icons'

const Chat: React.FC = () => {
    return (
        <div>
            {/*<Messages/>*/}
            {/*<SendMessageToChatForm/>*/}
        </div>
    )
}

// const Messages: React.FC = () => {
//     const messages: any = []
//     return (
//         <div>
//             {messages.map((message: any) => {
//                 return <MsgItem message={message} /> })}
//             messages component
//         </div>
//     )
// }
//
// type MsgItemPropsType = {
//     message: {
//         text: string, author: string, url: string | null
//     }
// }
// const MsgItem: React.FC<MsgItemPropsType> = (props) => {
//     return (
//         <div>
//             <img src={props.message.url} alt="avatar"/>
//             {props.message.author}
//             {props.message.text}
//         </div>
//     )
// }
//
// const SendMessageToChatForm: React.FC = () => {
//     return (
//         <div className={style.sendMessageToChat}>
//             <span>
//                 <input type='text' className={style.newMessageInput}/>
//             </span>
//             <span>
//                 <button type={'submit'} className={style.sendBtn}><ArrowUpOutlined /></button>
//             </span>
//         </div>
//     )
// }

export default Chat