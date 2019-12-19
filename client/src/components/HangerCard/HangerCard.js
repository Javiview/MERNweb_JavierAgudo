import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "./_HangerCard.scss"


export default class HangerCard extends Component {
    render() {
        const { name, colors, images, type, _id, state } = this.props
        const url = `/catalogue/${_id}`
        return (
            <React.Fragment>
            {state == true && 
            <React.Fragment>
            <div className="container box">
                
                <Link to={url}>
                <img width="100px" src={images[0]} alt={name}/>
                <h2>{name}</h2>
                <h3>{type}</h3>
                </Link>
                
            </div>
            </React.Fragment>}
            {state != true && 
             <React.Fragment>
            
            <div className="container box">
            <div className="rent"></div>
                <Link to={url} className="card-position">
                <img width="100px" src={images[0]} alt={name}/>
                <h2>{name}</h2>
                <h3>{type}</h3>
                </Link>
                
                
            </div>
            </React.Fragment>}
           </React.Fragment>
            
        )
    }
}
