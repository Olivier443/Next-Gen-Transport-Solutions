// Creating the user Context
import React, { createContext, useState, useEffect } from 'react'

// create a user Context
export const UserContext = createContext(null);

// create a provider component so that all children will access the user context
export const UserProvider = ({ children }) => {

  // Time to give it a currentUser state variable
  const [currentUser, setCurrentUser] = useState(() => {

    // This unnamed function only do the INITIALISATION of state 
    // when refreshing the page or navigating using http on routes
    // It returns the loginUser object stored in browser session storage if exist
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser !== undefined) {
      return loginUser;
    }
    // If it does not exist, return null
    return null;
  })

  // Grab data from storage(can be null or actual user)
  // it is used only once (when refreshing the page or using another http route) 
  useEffect(() => {
    // Get loginUser from session storage
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser !== null && loginUser !== undefined) {
      // Set loginUser data to the provider
      setCurrentUser(loginUser);
    }
  }, []);

  // The provider needs to wrap around our application
  return (
    // Export the state so that children can access or set currenUser
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
};
