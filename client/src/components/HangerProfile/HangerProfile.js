import React, { Component } from "react";
import HangerService from "../../services/HangerService";
import CartService from "../../services/CartService";
import BackBtn from "../BackBtn/BackBtn";
import "./_HangerProfile.scss";

export default class HangerProfile extends Component {
  constructor(props) {
    super(props);
    this.hangerService = new HangerService();
    this.cartService = new CartService();
    this.state = {
      hanger: [],
      rented: false
    };
  }
  searchHanger() {
    const id = this.props.match.params.id;
    return id;
  }
  funCart() {
    this.hangerService
      .profileHanger(this.props.match.params.id)
      .then(hanger =>
        this.cartService
          .pruebaCart(hanger)
          .then(data => {
            this.props.updateNumCart();
            this.setState({ ...this.state, rented: true });
          })
          .catch(err => console.log(err))
      )
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.hangerService.profileHanger(this.searchHanger()).then(hanger => {
      let hangerr = JSON.parse(JSON.stringify(hanger));
      console.log(hangerr);
      this.setState({
        ...this.state,
        hanger: hangerr
      });
    });
  }

  render() {
    const { user } = this.props;
    const { images, name, type, subType, colors, price } = this.state.hanger;
    const condition = user && !this.state.rented;
    return (
      <React.Fragment>
        <BackBtn {...this.props} />
        <div className="container box profile-hanger-container">
          <img src={images} alt={name} />
          <h2 className="is-size-4 has-text-centered">{name}</h2>
          <h3>
            {type} - {subType}
          </h3>
          <h4>{colors}</h4>
          <h5>{price} €/día</h5>
          {condition && (
            <button
              className="button is-warning is-rounded"
              onClick={() => this.funCart()}
            >
              Añadir al Carrito
            </button>
          )}

          {this.state.rented ? <p className="notification is-success is-size-5 has-text-centered">!Añadido al Carrito!</p> : null}
        </div>
      </React.Fragment>
    );
  }
}
