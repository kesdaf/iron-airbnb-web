import React, { useState, useEffect } from 'react';
import { WithAuthConsumer } from '../../contexts/AuthContext'
import Service from '../../service/Iron.Airbnb.service';
import { Link } from 'react-router-dom';


function Reserves(props) {
    const [Reserve, setReserve] = useState([])
 
    const owner = props.currentUser.type !== 'user'?true:false;
    const refresh =() =>{Service.getReserves()
        .then(res=> setReserve(res))
        .catch()}
        
    useEffect(() => {
        refresh()
    }, []);
    
    return(
        <div className="Reserves">
            {Reserve.map((r,i) => (

                <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">${r.local.title}</h5>
                            <p>Init Date : {r.init_date}</p>
                            <p>Finish Date : {r.finish_date}</p>
                           
                            {!r.accepted && owner&& <button type="delete" className="btn btn-success" onClick={()=>{
                                debugger
                                Service.acceptReserve(r._id);
                                refresh()
                            }
                            }>Accept</button>
                            }
                           {owner && <Link to={`/MyLocals/${r._id}`} className="btn btn-primary">Edit local info</Link>}
                            
                            {!r.accepted &&owner&&<button type="delete" className="btn btn-danger" onClick={() =>{
                                Service.deleteReserve(r._id);
                                refresh();
                            }                               
                            }>Delete</button>
                        }
                        </div>
                </div>
            ))}
        </div>
    )
}
export default WithAuthConsumer(Reserves)