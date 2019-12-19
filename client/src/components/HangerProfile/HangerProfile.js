import React, { Component } from "react";
import HangerService from "../../services/HangerService";
import CartService from "../../services/CartService";
import BackBtn from "../BackBtn/BackBtn";

export default class HangerProfile extends Component {
  constructor(props) {
    super(props);
    this.hangerService = new HangerService();
    this.cartService = new CartService();
    this.state = {
      hanger: []
    };
  }
  searchHanger() {
    const id = this.props.match.params.id;
    return id;
  }
  funCart() {
    this.hangerService
      .profileHanger(this.props.match.params.id)
      .then(hanger => this.cartService.pruebaCart(hanger))
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.hangerService.profileHanger(this.searchHanger()).then(hanger => {
      this.setState({
        ...this.state,
        hanger: hanger
      });
    });
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <BackBtn {...this.props} />
        <h1>HangerProfile</h1>
        <h2>{this.state.hanger.name}</h2>
        {user && (
          <button className="button is-rounded" onClick={() => this.funCart()}>
            +
          </button>
        )}
      </div>
    );
  }
}
