import React, {useEffect, useState} from 'react'
import Avatar from '@mui/material/Avatar';
import { db } from "../../../firebaseConfig";
import { addDoc, collection, onSnapshot, orderBy } from 'firebase/firestore'
import { Link } from "react-router-dom"
import './SidebarChat.css'

 function SidebarChat({ id, name }) {
     const [seed, setSeed] = useState("")
     const [messages, setMessages] = useState([])


  useEffect(() => {
      if (id) {
      try{
          const messageRef = collection(db, "rooms", id, "messages")
          onSnapshot(messageRef, orderBy("timestamp", "desc"), 
          (snapshot) => (
            setMessages(snapshot.docs.map(doc =>
                doc.data()
                ))
          ))
            }catch(e){
                console.log(setMessages(), "error is ...", e);
            }
      }
      
  }, [id]) 


  useEffect(() =>{
         setSeed(Math.floor(Math.random() * 5000))
        
     }, [])

   
    return (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            />
            <div className="sidebarChat-info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p> 
            </div>
        </div>
        </Link>
    ) 
    
}


export default SidebarChat