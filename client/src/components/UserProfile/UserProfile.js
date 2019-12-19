import React, { Component } from "react";

export default class UserProfile extends Component {
  render() {
    console.log(this.props.loggedInUser);
    const { name } = this.props.loggedInUser;
    return (
      <div className="container box">
        <h1 className="is-size-2"> {name} </h1>
      </div>
    );
  }
}
