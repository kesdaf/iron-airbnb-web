import React from 'react'
import {Link} from 'react-router-dom'
import {WithAuthConsumer} from '../../contexts/AuthContext'

function NavBar(props){
    let navRight;
    if (props.currentUser) {
        navRight =
            <ul className="nav navbar-nav navbar-right">
                <li>
                    {props.currentUser.email}
                    </li>
                <li>
                <Link to="#" onClick={props.logout}>
                    <span className="fa fa-sign-out"></span> Sign out
                    </Link>
                </li>
            </ul>
    }else{
        navRight =
            <ul className="nav navbar-nav navbar-right">
                <li>
                   <Link to="/login">
                       <span className="fa fa-user-o"></span> Log In
                    </Link>
                </li>
                <li>
                   <Link to="/register">
                       <span className="fa fa-sign-in"></span> Register
                    </Link>
                </li>
            </ul>
          
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Iron AirBnb</Link>
            {navRight}
        </nav>


    )
}

export default  WithAuthConsumer(NavBar);
