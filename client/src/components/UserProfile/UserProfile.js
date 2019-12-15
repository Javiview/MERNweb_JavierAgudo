import React, { Component } from 'react'

export default class UserProfile extends Component {
    render() {
        console.log(this.props.loggedInUser)
        const {name} = this.props.loggedInUser
        return (
            <div>
                <h1>HI: {name} </h1> 
            </div>
        )
    }
}
