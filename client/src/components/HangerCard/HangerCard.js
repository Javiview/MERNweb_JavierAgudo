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
            <div className="container box card-one-container">
                
                <Link to={url}>
                    <div className="card-one-container">
                <img className="img-catlg" width="100px" src={images[0]} alt={name}/>
                <h2>{name}</h2>
                </div>
                </Link>
                
            </div>
            </React.Fragment>}
            {state != true && 
             <React.Fragment>
            
            <div className="container box card-one-container">
            <div className="rent"></div>
                <Link to={url} className="card-position">
                <div className="card-one-container">
                <img className="img-catlg" width="100px" src={images[0]} alt={name}/>
                <h2>{name}</h2>
                </div>
                </Link>  
            </div>
            </React.Fragment>}
           </React.Fragment>
            
        )
    }
}
