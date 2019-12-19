import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./_BackBtn.scss"

export default class BackBtn extends Component {
  previousPage = () => {
    return this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <button className="button is-warning btn-back" onClick={this.previousPage}>
          Volver atrás
        </button>
      </div>
    );
  }
}
