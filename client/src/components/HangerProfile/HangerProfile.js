import React, { Component } from "react";
import HangerService from "../../services/HangerService";

export default class HangerProfile extends Component {
  constructor(props) {
    super(props);
    this.hangerService = new HangerService();
    this.state = {
      
      hanger: []
    };
  }
  searchHanger() {
    const id = this.props.match.params.id;
    return id;
  }
  componentDidMount() {
    this.hangerService.profileHanger(this.searchHanger())
    .then(hanger => {
        this.setState({
          ...this.state,
          hanger: hanger
        });
      });
  }

  render() {
   const { user } = this.props
    return (
      <div>
        <h1>HangerProfile</h1>
        <h2>{this.state.hanger.name}</h2>
        {user &&
        <button className="button is-rounded" onClick={()=>this.props.goToCart(this.state.hanger)}>+</button>
        }
      </div>
    );
  }
}
