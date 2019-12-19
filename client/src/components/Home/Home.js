import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
 
export default class Home extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576584535/ResourcesIMPERIO/rod_ves_2_yhajgu.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576584534/ResourcesIMPERIO/rod_ves_1_ocvu8o.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576584766/ResourcesIMPERIO/rod_ves_3_n0z7yb.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
};
 

 