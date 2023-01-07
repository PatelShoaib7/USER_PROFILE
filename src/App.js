
import './App.css';
import {useEffect, useState} from 'react'
import { Home } from './Pages/Home';
import {Routes , Route} from 'react-router-dom'
import { UserDetails } from './Pages/UserDetails';
function App() {
 
  return (
    
    <div >
         <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/:id" element={<UserDetails />} />
         </Routes>
    </div>
  );
}

export default App;
