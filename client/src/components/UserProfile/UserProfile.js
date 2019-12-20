import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  handleUpload = e => {
    console.log(e.target.files[0]);
    const uploadData = new FormData();
    console.log(uploadData);
    uploadData.append("picture", e.target.files[0]);
    console.log(uploadData.getAll("picture"));
    this.authService
      .upload(uploadData)

      .then(
        data => {
          console.log(data);
          this.setState({ ...this.state, picture: data.secure_url });
        },
        error => {
          console.error(error);
        }
      );
  };

  render() {
    const { name, picture } = this.props.loggedInUser;
    return (
      <div className="container box">
        <img src={picture} alt={name} />
        <h1 className="is-size-2 has-text-centered"> {name} </h1>
        <form onSubmit={this.handleSignUp}>
          <input type="file" name="picture" onChange={this.handleUpload} />
          <input type="submit" value="Cambiar la foto de perfil" />
        </form>
      </div>
    );
  }
}
