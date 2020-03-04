import React from 'react';
import {Link} from 'react-router-dom';


function  OwnerMenu(){
    return(
        <div className="OwnerMenu">
            <ul>
                <li>
                    <Link to="/MyLocals">
                        <span className="fa fa-sign-in"></span> Edit My locals information
                    </Link>
                </li>
                <li>
                    <Link to="/reserves">
                        <span className="fa fa-sign-in"></span> Check Reserves
                    </Link>
                </li>
                <li>
                    <Link to="/AddLocal">
                        <span className="fa fa-sign-in"></span> Add new local
                    </Link>
                </li>                                
            </ul>
        </div>
    )
}


export default OwnerMenu