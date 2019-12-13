import React, { Component } from "react";
import HangerService from "../../services/HangerService";
import HangerCard from "../HangerCard/HangerCard";

export default class Catalogue extends Component {
  constructor() {
    super();
    this.hangerService = new HangerService();
    this.state = {
      hangers: []
    };
  }
  componentDidMount() {
    this.hangerService.readHangers().then(hangers => {
      this.setState({
        ...this.state,
        hangers: hangers
      });
    });
  }
  render() {
    const { hangers } = this.state;

    return (
      <React.Fragment>
        <h2>Catalogo</h2>
        <input
          type="text"
          name="search-bar"
          placeholder="🔎 Busqueda . . .  "
        />
        <div className="wrap">
          {hangers.map((hanger, idx) => {
            if (idx < 4) return <HangerCard key={idx} {...hanger}></HangerCard>;
          })}
        </div>
      </React.Fragment>
    );
  }
}
