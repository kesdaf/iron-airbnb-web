import React, { useState, useEffect } from 'react'
import Service from '../../service/Iron.Airbnb.service';

export default function LocationReserve(props) {
    const LocId = props.match.params.id;
    const [Reserve, setReserve] = useState({
        location: {
            title: '',
            price: 0,
            images: [],
            description: '',
            long: null,
            lat: null,
            options: []
        },
        reserves:[],
        data: {
            init_date: '',
            finish_date: ''
        },
        message:false
    })
    useEffect(() => {
        Service.getLocalDetail(LocId)
            .then(local => {
                Service.getLocalReserves(LocId)
                    .then(res => {
                        console.log(res)
                        setReserve({
                            ...Reserve,
                            reserves:[res],
                            location: local
                        })
                    })
                    .catch()
        })
            .catch()

    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target
        setReserve({
            ...Reserve,
            data: {
                ...Reserve.data,
                [name]: value
            }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        Service.createReserve({ local: LocId, ...Reserve.data })
            .then(res => {
                setReserve({
                    ...Reserve,
                    message: "Reserve requested for the owner we will give you more info soon"
                })
            })
            .catch()
    }
    return (
        <div className="LocationReserve">
            {Reserve.location.title} / {Reserve.location.price}
            <p>{Reserve.location.description}</p>
            {JSON.stringify(Reserve.reserves)}
    {Reserve.message && <p>{Reserve.message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="init_date">Init Date</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        value={Reserve.data.init_date}
                        className="form-control"
                        name="init_date"
                        placeholder="Add your init date" />
                </div>
                <div className="form-group">
                    <label htmlFor="finish_date">Finish Date</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        value={Reserve.data.finish_date}
                        className="form-control"
                        name="finish_date"
                        placeholder="Add your finish date" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}