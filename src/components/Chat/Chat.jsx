import Avatar  from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import {ArrowBackIos, Mic, MoreVertOutlined, InsertEmoticon, SearchOutlined, Send, AttachFile } from '@mui/icons-material';
import React, {useEffect, useState} from 'react'
import { addDoc, collection, doc, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import {Link, useParams } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import './Chat.css'

const Chat = () => {
    const [input, setInput] = useState("")
    const [seed, setSeed] = useState("")
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue()

    useEffect(() => {
        if (roomId) {
           const roomRef = doc(db, "rooms", roomId)
           onSnapshot(roomRef, (snapshot) => {
               setRoomName(snapshot.data().name)}
           )
           const messageRef = collection(roomRef, "messages")
           onSnapshot(messageRef, orderBy("timestamp","asc"), (snapshot) =>(
               setMessages(snapshot.docs.map(doc =>
               doc.data()
               ))
           ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        console.log("You typed >>>", input);

        addDoc(collection(db, "rooms", roomId, "messages"), {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp(),
        })

        setInput("")
    }

    return (
        <div className= "chat">
            <div className="chat-header">
            <div className="chat-send">
                <Link to="/"><ArrowBackIos /></Link> </div>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
                />
            <div className="chat-headerInfo">
                <h3>{roomName}</h3>
                <p>Last seen{" "}
                {new Date(
                    messages[messages.length - 1]?.timestamp?.toDate())
                    .toUTCString()}</p>
            </div>
            <div className="chat-headerRight">
                <IconButton>
            <SearchOutlined />
            </IconButton>
            <IconButton>
                <AttachFile />
            </IconButton>
            <IconButton>
                <MoreVertOutlined />
            </IconButton>
            </div>
            </div>
            <div className="chat-body">
                {messages.map((message) => (
                     <p className={`chat-message ${message.name === user.displayName
                    && "chat-reciever"}`}>
                <span className="chat-name">{message.name}</span>
                    {message.message}
                    <span className="chat-timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
                ))}
               
            </div>
            
        

        <div className="chat-footer">
            <InsertEmoticon/>
            <form>
                <input placeholder="Type a message" type="text"
                value={input} onChange={e =>setInput(e.target.value)} />
                <button onClick={sendMessage}
                type="submit"> </button>
            </form>
            <Mic />
            <div className="chat-send">
            <IconButton>
                <Send onClick={sendMessage}/>
            </IconButton>
            </div>
        </div>
</div>
    )
}

export default Chat
