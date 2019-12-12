import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
var QRCode = require("qrcode.react");

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  render() {
    console.log(this.props);

    return (
      <React.Fragment>
        <header>
          <nav
            className="navbar is-dark"
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
                  Home
                </Link>

                <Link to="/catalogue" className="navbar-item">
                  Catálogo
                </Link>

                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">More</a>

                  <div className="navbar-dropdown">
                    <a className="navbar-item">About</a>
                    <a className="navbar-item">Jobs</a>
                    <a className="navbar-item">Contact</a>
                    <hr className="navbar-divider" />
                    <a className="navbar-item">Report an issue</a>
                  </div>
                </div>
              </div>

              <div className="navbar-end">
                
                  {!this.props.name && (
                     <div className="navbar-item">
                    <div className="buttons">
                      <Link to="/signup" className="button is-primary">
                        <strong>Sign up</strong>
                      </Link>
                      <Link to="/login" className="button is-light">
                        Login
                      </Link>
                    </div>
                  </div>
                  )}
                  {this.props.name && (
                     <div className="navbar-item">
                    <div className="probando">
                    <span className="prt">{this.props.name}</span>
                    <span>{this.props.surname}</span>
                  </div>
                  <img
                  className="logo"
                    src={this.props.picture}
                    alt={this.props.name}

                  />
                    <div className="buttons">
                      <Link
                        to="/logout"
                        onClick={e => this.props.logout(e)}
                        className="button is-light"
                      >
                        Logout
                      </Link>
                    </div>
                    </div>
                  )}
                </div>
              </div>
            {/* </div> */}
          </nav>
          {/* <nav>
            {!user && (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
            {user && (
              <div>
              <Link to="/catalogue">Catalogue</Link>
              <Link to="/" onClick={e => this.props.logout(e)}>
                Logout
              </Link>
              </div>
            )}
            <QRCode value="https://github.com/Javiview" />
          </nav> */}
        </header>
      </React.Fragment>
    );
  }
}
