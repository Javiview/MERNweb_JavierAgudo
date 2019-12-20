import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./_Home.scss"
 
export default class Home extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576584535/ResourcesIMPERIO/rod_ves_2_yhajgu.jpg" />
                    <p className="legend">Ejemplo de Producción_1"Titulo Pelicula" _Fecha_</p>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576584534/ResourcesIMPERIO/rod_ves_1_ocvu8o.jpg" />
                    <p className="legend">Ejemplo de Producción_2"Titulo Pelicula" _Fecha_</p>
                </div>
                <div>
                    <img className="img-carou" src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576835702/ResourcesIMPERIO/ves_Img_k6yvmy.jpg" />
                    <p className="legend">Ejemplo de Producción_3"Titulo Pelicula" _Fecha_</p>
                </div>
            </Carousel>
        );
    }
};
 

 