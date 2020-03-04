import React, { useState,createContext } from 'react';
import ironAirbnbService from '../service/Iron.Airbnb.service';

const AuthContext = createContext();

export function AuthContextProvider(props){
    const [user,setUser]= useState(JSON.parse(localStorage.getItem('user')));

    const updateUser =(newUser) => {
        localStorage.setItem('user', newUser ? JSON.stringify(newUser) : null)
        setUser({ newUser })
      }
      const logout = () => {
        ironAirbnbService.logout()
          .then(() => {
            setUser()
          })
      }
      const value = {
        currentUser: user,
        updateUser: updateUser,
        logout: logout
      }
      return(
        <AuthContext.Provider value={value}>
        {props.children}
      </AuthContext.Provider>
      )
}


export const WithAuthConsumer = (WrappedComponent) => (props) => (
    <AuthContext.Consumer>
      {(authProps) => (<WrappedComponent {...props} {...authProps} />)}
    </AuthContext.Consumer>
  )
  
  export default AuthContext;