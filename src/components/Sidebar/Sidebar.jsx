import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import SidebarChat from './SidebarChat/SidebarChat'
import './Sidebar.css'
import { IconButton } from '@mui/material';
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig"
import { Link } from "react-router-dom"
import { Add, Chat, DonutLargeOutlined, MoreVertOutlined, SearchOutlined } from '@mui/icons-material';
import { useStateValue } from '../../StateProvider'

function Sidebar() {
const [{user, page}, dispatch] = useStateValue()
   const [rooms, setRooms] = useState([])

   useEffect(() => {
       const userRef  = collection(db, 'rooms')
       onSnapshot(userRef, (snapshot) =>{
           setRooms(snapshot.docs.map(doc =>
            ({id: doc.id,
            data: doc.data(),
        })))
       })
       
    }, []);

 
    const createChat =  () => {
        const roomName = prompt("Please enter name for chat room")

        if (roomName) {
            //TODO: 
            addDoc(collection(db, 'rooms'), {
                name: roomName,
            })
        }
     }
    
    return (
    
        <div className="sidebar" style = {{
            maxHeight: page.width <=760 ? page.height : "auto"
        }}>
            <div className="sidebar-header">
                <Link to="/">
                <div className="sidebar-headerLeft">
                <Avatar src={user?.photoURL}/>
                 <h4> {user?.displayName} </h4>
                </div>
                </Link>
                <div className="sidebar-headerRight">
                    <IconButton>
                    <DonutLargeOutlined />
                    </IconButton>
                    <IconButton>
                    <Chat />
                    </IconButton>
                    <IconButton>
                    <MoreVertOutlined />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar-search">
                <form className="sidebar-searchContainer">
                <SearchOutlined />
                <input placeholder="Search or start new chat"
                type="text" />
                </form>
            </div>
              
              <div className="sidebar-chats">
                 <div className="sidebar-chatContainer"> 
                 {rooms.map(room =>(
                     <SidebarChat key={room.id} id={room.id}
                     name={room.data.name}/>
                 ))}
                 </div>
                <div onClick = {createChat} className= "sidebar-chatAddroom">
                <IconButton >
                    <Add />
                </IconButton>
                </div>
                </div>
        </div>
    )
}

export default Sidebar
