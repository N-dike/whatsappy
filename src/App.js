import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login'

import { BrowserRouter, Routes, Route, } from "react-router-dom"
import { useStateValue } from './StateProvider'


function App() {
  const [{user, page}, dispatch] = useStateValue()


  return ( 
    <div className="app">
      {!user ? (<Login />):(
    <div className="app-body">
    {page.width <=760 ?
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Sidebar />}/>
      <Route path="/rooms/:roomId" element={<Chat />} />
    </Routes>
    </BrowserRouter>
    :
    <BrowserRouter>
    <Sidebar />
        <Routes>
           <Route path="/rooms/:roomId" element={<Chat /> }/>
        </Routes>
        </BrowserRouter>}
    </div>
    )}
    </div>
  );
}

export default App;
