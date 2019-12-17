import React, { Component } from "react";
import CartService from "../../services/CartService";
import HangerService from "../../services/HangerService";
import HangerInCart from "./HangerInCart";
import "./_Cart.scss";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.cartService = new CartService();
    this.hangerService = new HangerService();

    this.state = {
      shopItems: this.props.hangers,
      dateStart: 2019-10-12,
      dateFinish: 2019-10-20,
      days: 0,
      totalPrice: 0,
      open: true
    };
  }
  deleteHangerInCart(id) {
    this.props.deleteHangerInCart(id);
  }
  sumTotalPrice(){
    let counter = 0
    this.props.hangers.forEach(hanger => {
      counter += hanger.price
    });
    return counter
  }
  sumDays(){
    let dy =  this.state.dateStart - this.state.dateFinish
    return dy
  }
  render() {
    const { hangers } = this.props;
    const { totalPrice, days } = this.state
    return (
      <React.Fragment>
        {hangers.length === 0 && (
          <div className="container box">
            <img
              src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576596014/ResourcesIMPERIO/empty-cart-IMP_af6ktk.png"
              alt="Empty-Cart"
            />
          </div>
        )}
        {hangers.length > 0 && (
          <div className="container box">
            {hangers.map((hanger, idx) => {
              return (
                <HangerInCart
                  key={idx}
                  {...hanger}
                  deleteHangerInCart={id => this.deleteHangerInCart(id)}
                  printHangersInCart={() => this.printHangersInCart()}
                ></HangerInCart>
              );
            })}
            <label htmlFor="fecha-inicio">Desde:</label>
            <input type="date"/>
            <label htmlFor="fecha-final">Hasta:</label>
            <input type="date"/>
            <h1>Total/día: {this.sumTotalPrice()}</h1>
            <h2>Días: {this.sumDays()}</h2>
          </div>
        )}
      </React.Fragment>
    );
  }
}
