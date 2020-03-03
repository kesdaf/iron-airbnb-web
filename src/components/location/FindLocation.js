import React, { useState } from 'react';
import MapContainer from '../misc/MapContainer'
import IronAirBnbService from '../../service/Iron.Airbnb.service';
import { Redirect } from 'react-router-dom';

export default function FindLocation() {
    const [filterForm, setFilterForm] = useState({
        error: false,
        loading: true,
        data: {
            latitude: 40.3924352374654,
            longitude: -3.6984705979760135,
            distance: 1000,
            price_min: 0,
            price_max: Infinity,
        },
        results: [],
    })
    const handleChange = (event) => {
        const { name, value } = event.target

        setFilterForm({
            ...filterForm,
            data: {
                ...filterForm.data,
                [name]: value
            }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        IronAirBnbService.findLocal({ ...filterForm.data })
            .then(
                (locals) => {
                    setFilterForm({
                        ...filterForm,
                        results: locals
                    })
                }
            )
            .catch(
                () => {
                    setFilterForm({ ...filterForm, error: true, loading: false })
                }
            )
    }
    const handleClickMap = (latLng) => {
        setFilterForm({
            ...filterForm,
            data: {
                ...filterForm.data,
                longitude: latLng.lng(),
                latitude: latLng.lat()
            }

        })
    }
    const resultClicked = (id) =>{
        console.info('ID => ', id)
        // return (<Redirect to={`/locals/${id}`}/>)
    }
    return (
        <div className="FindLocation">
            {JSON.stringify(filterForm.data)}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="distance">Distance</label>
                    <input
                        onChange={handleChange}
                        type="number"
                        value={filterForm.data.distance}
                        className="form-control"
                        name="distance"
                        placeholder="Max distance radious" />
                </div>
                <div className="form-group">
                    <label htmlFor="price_min">Price min</label>
                    <input
                        onChange={handleChange}
                        type="number"
                        value={filterForm.data.price_min}
                        className="form-control"
                        name="price_min"
                        placeholder="Price range start" />
                </div>
                <div className="form-group">
                    <label htmlFor="price_max">Price max</label>
                    <input
                        onChange={handleChange}
                        type="number"
                        value={filterForm.data.price_max}
                        className="form-control"
                        name="price_max"
                        placeholder="Price range end" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <MapContainer
                onClick={handleClickMap}
                latitude={filterForm.data.latitude}
                longitude={filterForm.data.longitude}
                results={filterForm.results}
                resultClicked={resultClicked}
            />

        </div>

    )
}