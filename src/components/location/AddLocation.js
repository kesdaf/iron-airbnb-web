import React, { useState } from 'react'
import MapContainer from '../misc/MapContainer'
import Service from '../../service/Iron.Airbnb.service';
import { Redirect } from 'react-router-dom';

function AddLocation(props){
    const [localForm, setLocalForm] = useState({
        error: false,
        loading: true,
        data: {
         //   _id:props? props.id? id:null:null,
            title: '',
            price: 0,
            images: [],
            description:'',
            long:null,
            lat:null,
            options:[],
        }
    })
    const handleChange = (event) => {
        const { name, value,files } = event.target
        let newValue;
        if(files){
            let arrayFiles=[]
            for (let i = 0, numFiles = files.length; i < numFiles; i++) {
                arrayFiles.push(files[i]);
            }
            newValue = arrayFiles
        }else{
            newValue = value
        }

        setLocalForm({
            data: {
                ...localForm.data,
                [name]: newValue
            }
        })
    }   
    const handleClickMap = (latLng)=>{
        setLocalForm({
            data: {
                ...localForm.data,
                long:latLng.lng(),
                lat:latLng.lat()
                }
            })
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        const formData = Object.keys(localForm.data).reduce((data,k) => {
            data.append(k,localForm.data[k]);
            return data;
        },new FormData()) 

        Service.createLocal(formData)
            .then(
                (local) => {
                    return <Redirect to="/"/>
                },
                () => {
                    console.log(localForm)
                    setLocalForm({ data: localForm.data, error: true, loading: false })
                }
            )
    }
    return(
        <div className="AddLocation">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        value={localForm.data.title}
                        className="form-control"
                        name="title"
                        placeholder="Add a title for your Local" />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        onChange={handleChange}
                        type="number"
                        value={localForm.data.price}
                        className="form-control"
                        name="price"
                        placeholder="Add a the price for night" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        value={localForm.data.description}
                        className="form-control"
                        name="description"
                        placeholder="Add a description for your local" />
                </div>
                
                <div className="form-goup">
                    <label htmlFor="images">Images</label>
                    <input
                        onChange={handleChange}
                        name="images"
                        type="file"
                        className='form-control'
                        id="images" 
                        multiple/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <MapContainer onClick={handleClickMap}/>
            </form>
        </div>
    )
}
export default AddLocation;