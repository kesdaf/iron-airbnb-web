import React from 'react';
import { Link } from 'react-router-dom';


export default function UserMenu() {
    return (
        <div className="UserMenu">
            <ul>
                <li>
                    <Link to="/FindLocal">
                        <span className="fa fa-sign-in"></span>Find Locals
                    </Link>
                </li>
                <li>
                    <Link to="/reserves">
                        <span className="fa fa-sign-in"></span> check my current reserves
                    </Link>
                </li>
            </ul>
        </div>
    )
}
