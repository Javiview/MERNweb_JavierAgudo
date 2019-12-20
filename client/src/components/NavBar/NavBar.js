import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import CartService from "../../services/CartService";
import { StickyContainer, Sticky } from "react-sticky";
import "./_NavBar.scss";
var QRCode = require("qrcode.react");

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.cartService = new CartService();
    this.state = {
      num: this.props.numCart
    };
  }

  // updateNumCart(){
  //   this.cartService
  //   .userCart()
  //   .then(cart => {
  //     this.setState({
  //       ...this.state,
  //       num: cart.shopItems.length});
  //   })
  //   .catch(err => console.log(err));
  // }

  static getDerivedStateFromProps(newProps) {
    return { num: newProps.numCart };
  }
  componentDidMount() {}
  componentDidUpdate() {
    //this.updateNumCart()
  }
  render() {
    return (
      <React.Fragment>
        {/* Other elements can be in between `StickyContainer` and `Sticky`,
        but certain styles can break the positioning logic used. */}
        <Sticky topOffset={180}>
          {({ style }) => (
            <nav
              style={style}
              className="navbar is-dark main-navbar"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                  <img
                    src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576179123/ResourcesIMPERIO/Logo_elImperio_hmij4g.png"
                    width="100"
                    height="35"
                  />
                </Link>

                <a
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>

              <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                  <Link to="/" className="navbar-item">
                    Inicio
                  </Link>

                  <Link to="/catalogue" className="navbar-item">
                    Catálogo
                  </Link>

                  {/* <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">More</a>

                  <div className="navbar-dropdown">
                    <a className="navbar-item">About</a>
                    <a className="navbar-item">Jobs</a>
                    <a className="navbar-item">Contact</a>
                    <hr className="navbar-divider" />
                    <a className="navbar-item">Report an issue</a>
                  </div>
                </div> */}
                </div>

                <div className="navbar-end">
                  {!this.props.name && (
                    <div className="navbar-item">
                      <div className="buttons">
                        <Link to="/signup" className="button is-primary">
                          <strong>Regístrate</strong>
                        </Link>
                        <Link to="/login" className="button is-light">
                          Iniciar sesión
                        </Link>
                      </div>
                    </div>
                  )}
                  {this.props.name && (
                    <div className="navbar-item">
                      <Link to="/cart" className="shop-cart-logo button-container">
                        <img
                          src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576486235/ResourcesIMPERIO/Cart_imperio_v6awzb.png"
                          alt=""
                        />
                        {this.state.num !== 0 &&
                        <div className="num-cart has-text-weight-semibold">{this.state.num}</div>}
                      </Link>

                      <div className="probando">
                        <span className="prt has-text-weight-bold is-capitalized">{this.props.name}</span>
                        <span className="has-text-weight-bold is-capitalized">{this.props.surname}</span>
                      </div>
                      <Link to="/profile">
                        <img
                          className="logo"
                          src={this.props.picture}
                          alt={this.props.name}
                        />
                      </Link>
                      <div className="buttons">
                        <Link
                          to="/logout"
                          onClick={e => this.props.logout(e)}
                          className="button is-light"
                        >
                          Cerrar Sesión
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* </div> */}
            </nav>
          )}
        </Sticky>
      </React.Fragment>
    );
  }
}
