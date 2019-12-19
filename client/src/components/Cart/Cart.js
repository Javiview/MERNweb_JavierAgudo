import React, { Component } from "react";
import CartService from "../../services/CartService";
import HangerService from "../../services/HangerService";
import HangerInCart from "./HangerInCart";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import "./_Cart.scss";
import BackBtn from "../BackBtn/BackBtn";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.cartService = new CartService();
    this.hangerService = new HangerService();

    this.initState = {
      shopItems: [],
      dateStart: null,
      dateFinish: null,
      days: 0,
      totalPrice: 0,
      open: false
    };
    this.state = {
      hangers: [],
      cartId: "",

      shopItems: this.props.hangers,
      dateStart: null,
      dateFinish: null,
      days: 0,
      totalPrice: 0,
      open: false
    };
  }
  searchCart() {
    this.cartService
      .userCart()
      .then(cart => {
        console.log(cart);
        if (cart.shopItems != null) {
          let hangers = cart.shopItems;
          let cartId = cart._id;
          this.setState({
            ...this.state,
            hangers: hangers,
            cartId: cartId
          });
        }
      })
      .catch(err => console.log(err));
  }
  deleteHangerInCart(id) {
    this.cartService.delItemFromCart(id)
    .then(cart => {
      this.props.updateNumCart()
      let hangers = cart.shopItems;
      this.setState({
        ...this.state,
        hangers: hangers
      });
    });
  }
  sumTotalPrice() {
    let counter = 0;
    this.state.hangers.forEach(hanger => {
      counter += hanger.price;
    });
    counter = counter * this.sumDays();
    return (this.state.totalPrice = counter);
  }
  setDateStart(e) {
    this.setState({ ...this.state, dateStart: e.target.value });
  }
  setDateFinish(e) {
    this.setState({ ...this.state, dateFinish: e.target.value });
  }
  setTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return (today = yyyy + "-" + mm + "-" + dd);
  }
  sumDays() {
    if (this.state.dateStart && this.state.dateFinish === null) {
      return 0;
    } else {
      let fecha1 = new Date(this.state.dateStart);
      let fecha2 = new Date(this.state.dateFinish);
      let resta = fecha2.getTime() - fecha1.getTime();
      let result = Math.round(resta / (1000 * 60 * 60 * 24));
      return (this.state.days = result);
    }
  }
  save(e) {
    e.preventDefault();
    confirmAlert({
      title: "¿Estas seguro?",
      message: "¿Deseas alquilar todos los articulos de tu carrito?",
      buttons: [
        {
          label: "Si",
          onClick: () => this.saveCart()
        },
        {
          label: "No"
        }
      ]
    });
  }
  saveCart() {
    this.cartService.updateCart(this.state)
    .then(() => {
      this.hangerService.updateHanger(this.state.hangers);
    })
    .then(()=>{
      this.state = this.initState;
      this.props.cartRented()
      this.props.history.push("/justrent");
    })
   
  }
  componentDidMount() {
    this.sumTotalPrice();
    this.searchCart();
    this.setTodayDate();
  }
  componentDidUpdate() {
    this.sumTotalPrice();
    this.sumDays();
  }
  render() {
    const { hangers } = this.state;
    return (
      <React.Fragment>
        {hangers.length === 0 && (
          <div className="container box">
            <BackBtn {...this.props} />
            <img
              src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576596014/ResourcesIMPERIO/empty-cart-IMP_af6ktk.png"
              alt="Empty-Cart"
            />
          </div>
        )}
        {hangers.length > 0 && (
          <div className="container box">
            <BackBtn {...this.props} />
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
            <form className="box has-background-grey-dark">
              <h3 className="has-text-centered has-text-white	">Alquilar:</h3>
              <div className="cart-form">
                <label htmlFor="fecha-inicio has-text-white">Desde:</label>
                <input
                  type="date"
                  className="input is-small is-rounded"
                  min={this.setTodayDate()}
                  onChange={e => this.setDateStart(e)}
                />
                <label htmlFor="fecha-final has-text-white">Hasta:</label>
                <input
                  type="date"
                  className="input is-small is-rounded"
                  min={this.setTodayDate()}
                  onChange={e => this.setDateFinish(e)}
                />
              </div>
              <div className="cart-form">
                <h4>Total: {this.sumTotalPrice()}</h4>
                <h4>Días: {this.sumDays()}</h4>
              </div>
              <div className="cart-form-btn">
                <button
                  type="button"
                  className="button is-warning"
                  onClick={e => {
                    this.save(e);
                  }}
                >
                  Alquilar
                </button>
              </div>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}
