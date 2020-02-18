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
        setUser: updateUser,
        logout: logout
      }
      return(
        <AuthContext.Provider value={value}>
        {props.children}
      </AuthContext.Provider>
      )
}
// export class AuthContextProvider extends Component{
//     state = {
//         user: JSON.parse(localStorage.getItem('user'))
//       }
    
//       setUser = (user) => {
//         localStorage.setItem('user', user ? JSON.stringify(user) : null)
//         this.setState({ user })
//       }
    
//       logout = () => {
//         ironAirbnbService.logout()
//           .then(() => {
//             this.setUser()
//           })
//       }
      
    
//       render() {
//         const value = {
//           currentUser: this.state.user,
//           setUser: this.setUser,
//           logout: this.logout
//         }
    
//         return (
//           <AuthContext.Provider value={value}>
//             {this.props.children}
//           </AuthContext.Provider>
//         )
//       }
// }

export const WithAuthConsumer = (WrappedComponent) => (props) => (
    <AuthContext.Consumer>
      {(authProps) => (<WrappedComponent {...props} {...authProps} />)}
    </AuthContext.Consumer>
  )
  
  export default AuthContext;