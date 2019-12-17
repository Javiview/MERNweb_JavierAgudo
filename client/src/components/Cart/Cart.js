import React, { Component } from "react";
import CartService from "../../services/CartService";
import HangerService from "../../services/HangerService";
import { HangerInCart } from "./HangerInCart";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.cartService = new CartService();
    this.hangerService = new HangerService();

    this.state = {
      shopItems: [],
      dateStart: null,
      dateFinish: null,
      days: 0,
      totalPrice: 0,
      open: true
    };
  }
  deleteHangerInCart(id) {
      let shopItemsCopy = [...this.state.shopItems]
      let resultShopItems = shopItemsCopy.filter((hanger) => !hanger._id.includes(id))
      this.setState({
          ...this.state,
          shopItems: resultShopItems
      })
  }
  componentDidMount() {
    let arr = [];
    this.props.hangers.forEach(hanger => {
      arr.push(hanger);
    });
    this.setState({
        ...this.state,
        shopItems: arr
    })
    
  }
  componentDidUpdate(){
    console.log(this.state.shopItems)

  }

  render() {
    const { shopItems } = this.state;
    return (
        
      <div>
          {shopItems.length === 0 &&
        <h1>VACIO</h1>}
        
        {shopItems.map((hanger, idx) => {
          return (
            <div key={idx}>
              <HangerInCart
                {...hanger}
                deleteHangerInCart={(id) => this.deleteHangerInCart(id)}
              ></HangerInCart>
            </div>
          );
        })}
      </div>
    );
  }
}
