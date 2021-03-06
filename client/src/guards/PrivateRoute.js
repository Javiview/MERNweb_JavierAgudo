import React from 'react'
import { Route, Redirect } from 'react-router-dom'
export default function PrivateRoute({component: Component, hangers, deleteHangerInCart, user, redirectPath,cartRented,updateNumCart, ...rest}) {
  return (
   <Route {...rest} render={(props) => {
    {if(user) {
      return <Component loggedInUser={user} {...props} hangers={hangers} deleteHangerInCart={deleteHangerInCart} cartRented={cartRented} updateNumCart={updateNumCart}/>
     } else {
       return <Redirect to={{pathname: redirectPath}}/>
     }
    }
   }} />
  )
}