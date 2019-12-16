import React, { Component } from "react";

export function HangerInCart(props) {
  const { name, images, price, _id, deleteHangerInCart} = props;
  console.log(props)
  return (
    <React.Fragment>
      <div className="container box is-rounder">
        <img src={images[0]} alt={name} />
        <h1>{name}</h1>
        <h2>Precio por dia: {price} €</h2>
        <button onClick={()=>deleteHangerInCart(_id)}>Delete</button>
      </div>
    </React.Fragment>
  );
}
