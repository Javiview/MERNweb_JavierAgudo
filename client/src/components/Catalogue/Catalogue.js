import React, { Component } from "react";

export default class Catalogue extends Component {
  render() {
    return <React.Fragment>
        <div>Catalogo</div>
        <input type="text" name="search-bar" placeholder="🔎 Busqueda . . .  "/>
    </React.Fragment>;
  }
}
