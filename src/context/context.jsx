import React, { createContext } from 'react'

const Context = createContext()

const MyContext = ({children}) => {
  return (
    <Context.Provider 
    value={{
      
    }}>
      {children}
    </Context.Provider>
  )
}

export default MyContext
