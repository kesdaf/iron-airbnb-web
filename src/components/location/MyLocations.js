import React, { useState, useEffect } from 'react'
import Service from '../../service/Iron.Airbnb.service';
import LocationDetails from './locationDetail';

function  MyLocations(){
    const [locationList, setLocationList] = useState([]);

    useEffect(() =>{
        Service.getLocals()
        .then( locals =>setLocationList(locals))
        .catch()

    },[]);
    const onDelete = (locId) =>{
        Service.deleteLocal(locId)
        .then(local =>{
            const newLocals = locationList.reduce((acc,currentLocal)=>{
                if(currentLocal._id !== local._id){
                    acc.push(currentLocal);
                }
                return acc;
            },[]);
            setLocationList(newLocals)
        })
        .catch(e=>console.log(e))
   
    }
    return(
        <div className="MyLocations">
            {locationList.map((loc,i)=> <LocationDetails loc={loc} key={i} onDelete={onDelete}/>)}
        </div>
    )
}


export default MyLocations