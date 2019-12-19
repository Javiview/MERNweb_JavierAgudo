import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class BackBtn extends Component {
  previousPage = () => {
    return <Link to={this.props.history.goBack()}></Link>;
  };
  render() {
    return (
      <div>
        <button className="button is-warning" onClick={this.previousPage}>
          voler atras
        </button>
      </div>
    );
  }
}
