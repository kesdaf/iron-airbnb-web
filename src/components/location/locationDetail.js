import React from 'react'
import { Link } from 'react-router-dom'

export default function LocationDetails(props){
    const loc= props.loc;
    const onClick =()=>{
        props.onDelete(loc._id)
    }
    return(
        <div className="LocationDetails card">
            <img className="card-img-top" src={loc.images.lenght>0?loc.images[0]:''}/>
            <div className="card-body">
                <h5 className="card-title">${loc.title}</h5>
                <Link to={`/MyLocals/${loc._id}`} className="btn btn-primary">Edit</Link>
                <button type="delete" className="btn btn-danger" onClick={onClick}>Delete</button>
            </div>
        </div>
    )
}