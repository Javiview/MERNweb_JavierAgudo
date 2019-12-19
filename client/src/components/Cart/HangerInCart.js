import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

export default class HangerInCart extends Component {
  delete() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='notification is-warning box'>
            <h1 className="is-size-6">¿Estás seguro?</h1>
            <p className="text-noti is-size-4">¿Deaseas eliminarlo de tu carrito?</p>
            <div className="btn-container-cart">
            <button className="button is-dark" onClick={onClose}>No</button>
            <button className="button is-light btn-yes"
              onClick={() => {
                this.props.deleteHangerInCart(this.props._id)
                onClose()
              }}
            >
              Si, Borralo!
            </button>
            </div>
            
          </div>
        );
      }
    });
    // confirmAlert({
    //   title: "¿Estas seguro?",
    //   message: "¿Deseas eliminarlo de tu carrito?",
    //   buttons: [
    //     {
    //       label: "Si",
    //       onClick: () => this.props.deleteHangerInCart(this.props._id)
    //     },
    //     {
    //       label: "No"
    //     }
    //   ]
    // });
  }
  render() {
    const { name, images, price,} = this.props;
    console.log(this.props)
    return (
      <React.Fragment>
        <div className="container box cart-card-container">
          
          <img src={images[0]} className="image-cart" width="60px" alt={name} />
          <h1 className="subtitle has-text-centered">{name}</h1>
          <h2 className="">{price} €/día</h2>

          <button
            className ="delete is-large"
            onClick={() => {
              this.delete();
            }}
          >
            Delete
          </button>
        </div>
      </React.Fragment>
    );
  }
}
