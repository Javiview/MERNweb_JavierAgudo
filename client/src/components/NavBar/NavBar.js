import React, { Component } from "react";
import { Link } from 'react-router-dom';
var QRCode = require('qrcode.react');

export default class NavBar extends Component {
  render() {
    return <React.Fragment>
        <header>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <QRCode value="https://github.com/Javiview"/>
            </nav>
        </header>
    </React.Fragment>;
  }
}
