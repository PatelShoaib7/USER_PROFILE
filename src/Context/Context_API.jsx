import React, { Children, useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

  export const App_Context = createContext()
export const AppContext_Provider = ({children}) => {
  const [slectVal ,setSeletVal]=useState(100);
  const [order , setOrder]=useState('')
  const[page , setPage]=useState(1);
  useEffect(()=>{

  },[slectVal])
  return <App_Context.Provider value={{slectVal, page , setPage ,setSeletVal , order , setOrder }}>
        {children}
      </App_Context.Provider>
  
}
