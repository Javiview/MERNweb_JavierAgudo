import React, { Component } from "react";
import HangerService from "../../services/HangerService";
import CartService from "../../services/CartService";
import BackBtn from "../BackBtn/BackBtn";
import "./_HangerProfile.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class HangerProfile extends Component {
  constructor(props) {
    super(props);
    this.hangerService = new HangerService();
    this.cartService = new CartService();
    this.state = {
      hanger: "",
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
      console.log(hanger);
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
        {this.state.hanger.images != undefined && (
          <div className="back-profile">
            <BackBtn {...this.props} />
            <div className="container box profile-hanger-container">
              <Carousel>
                {images.map(img => (
                  <img src={img} alt={name} />
                ))}
              </Carousel>
              <div className="box profile-hanger-container">
                <h2 className="is-size-3 has-text-centered has-text-weight-bold">
                  {name}
                </h2>
                <h3>{type}</h3>
                {subType.map(subtype => (
                  <h3>{subtype}</h3>
                ))}
                <div className="color-container">
                  {colors.map(color => {
                    return (
                      <h4 className="color-item is-capitalized">{color}</h4>
                    );
                  })}
                </div>

                <h5 className="is-size-3 has-text-centered has-text-weight-bold price-item">{price}<span className="is-size-5"> €/día</span></h5>
                {condition && (
                  <button
                    className="button is-warning is-rounded"
                    onClick={() => this.funCart()}
                  >
                    Añadir al Carrito
                  </button>
                )}

                {this.state.rented ? (
                  <p className="notification is-success is-size-5 has-text-centered">
                    ¡Añadido al Carrito!
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
