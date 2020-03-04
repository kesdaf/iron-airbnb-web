import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import { Redirect, Route } from 'react-router-dom'

const IsOwnerRoute = (props) => {
  if (!props.currentUser || props.currentUser.type !== 'owner') {
    return <Redirect to="/"/>
  } else {
    return <Route {...props} />
  }
}

export default WithAuthConsumer(IsOwnerRoute)