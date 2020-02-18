import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import IronAirBnbService from '../../service/Iron.Airbnb.service';
import {WithAuthConsumer} from '../../contexts/AuthContext';;

export class Login extends Component {
  state = {
    data: { email: '', password: '' },
    error: false,
    loading: true
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({ loading: true, error: false }, () => {
        IronAirBnbService.login({ ...this.state.data })
        .then(
          (user) => {
            this.props.setUser(user)
          },
          () => {
            this.setState({ error: true, loading: false })
          }
        )
    })
  }
  render() {
    const errorClassName = this.state.error ? 'is-invalid' : ''

    if (this.props.currentUser) {
      return <Redirect to="/"/>
    }
    return (
      <div className="Login">
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
            onChange={this.handleChange}
            type="email" 
            className="form-control" 
            name="email" 
            value={this.state.data.email}
            placeholder="Enter email"/>
          </div>
          <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
               onChange={this.handleChange}
               type="password" 
               value={this.state.data.password}
               className="form-control" 
               name="password" 
               placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <div >
              <Link to="/register">
               Or create new User   
              </Link>
              
          </div>
      </div>
      )
    }     
}

export default WithAuthConsumer(Login)