import React, { Component } from "react";
import HangerService from "../../services/HangerService";
import HangerCard from "../HangerCard/HangerCard";
import './_Catalogue.scss'

export default class Catalogue extends Component {
  constructor() {
    super();
    this.hangerService = new HangerService();
    
    this.state = {
      hangers: [],
      hangerToCart:""
    };
    this.hangerCop = [this.state.hangers]
  }
  searchHanger(e){
    e.preventDefault();
    let hangers = [...this.hangerCop];
    let hangersFound;
   
    hangersFound = hangers.filter((hanger) => hanger.name.toLowerCase().includes(e.target.value.toLowerCase())|| hanger.times.toLowerCase().includes(e.target.value.toLowerCase() ))
   
    this.setState({
      ...this.state,
      hangers: hangersFound
    });
  }
  
  componentDidMount() {
    this.hangerService.readHangers().then(hangers => {
      this.hangerCop = hangers
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
        <h2 className="title is-1 has-text-centered">💶Catálogo💷</h2>
        <div className="container search-bar-container">
        <input
          type="text"
          className="input is-warning search-bar"
          name="search-bar"
          placeholder="🔎 Busqueda . . .  "
          onChange={(e) => this.searchHanger(e)}
        />
        </div>
        <div className="wrap">
          {hangers.map((hanger, idx) => {
            if (idx < 4) return <HangerCard key={idx} {...hanger} ></HangerCard>;
          })}
        </div>
      </React.Fragment>
    );
  }
}
