import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import { Redirect, Route } from 'react-router-dom'

const IsUserRoute = (props) => {
  if (!props.currentUser ||props.currentUser.type !== 'user') {
    return <Redirect to="/"/>
  } else {
    return <Route {...props} />
  }
}

export default WithAuthConsumer(IsUserRoute)