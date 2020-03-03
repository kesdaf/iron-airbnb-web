import React, { useState } from 'react'
import Service from '../../service/Iron.Airbnb.service';
import { WithAuthConsumer } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';

const validators = {
    password: val => val.length > 3,
    email: _ => true,
}

export function Register(props) {
    const [userForm, setUserForm] = useState({
        error: false,
        loading: true,
        data: {
            email: '',
            password: '',
            type: "user"
        }
    });
    const handleChange = (event) => {
        const { name, value,files } = event.target
        setUserForm({
            data: {
                ...userForm.data,
                [name]: files ? files[0]: value
            }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()

        setUserForm({ data: userForm.data, loading: true, error: false }); 

        const formData = Object.keys(userForm.data).reduce((data,k) => {
                data.append(k,userForm.data[k]);
                return data;
            },new FormData()) 
        Service.register(formData)
            .then(
                (user) => {
                    return <Redirect to="/"/>
                },
                () => {
                    console.log(userForm)
                    setUserForm({ data: userForm.data, error: true, loading: false })
                }
            )

    }

    return (
        <div className="Register">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        value={userForm.data.password}
                        className="form-control"
                        name="password"
                        placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="type">User Type</label>
                    <select name="type" value={userForm.data.type} onChange={handleChange} >
                        <option value="user">User</option>
                        <option value="owner">Owner</option>
                    </select>
                </div>
                <div className="form-goup">
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        onChange={handleChange}
                        name="avatar"
                        type="file"
                        className='form-control'
                        id="avatar" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}


export default WithAuthConsumer(Register)