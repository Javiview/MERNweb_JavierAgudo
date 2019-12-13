import React, { Component } from 'react'
import { Link } from "react-router-dom";


export default class HangerCard extends Component {
    render() {
        console.log(this.props)
        const { name, colors, images, type, _id } = this.props
        const url = `/catalogue/${_id}`
        return (
            
            <div className="container box">
                <Link to={url}>
                <img width="100px" src={images[0]} alt={name}/>
                <h2>{name}</h2>
                <h3>{type}</h3>
                </Link>
            </div>
            
        )
    }
}
