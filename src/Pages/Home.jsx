import React, { useContext, useState } from 'react'
import { Body_Table } from '../Components/Body_Table';
import { Carosel } from '../Components/Carosel';
import { Navbar } from '../Components/Navbar';

export const Home = () => {
   
  return (
    <div> 
                <Navbar />
                <Carosel />
               <Body_Table />

    </div>
  )
}
