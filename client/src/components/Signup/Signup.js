import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    name: "",
    surname: "",
    password: "",
    email: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  handleSignUp = e => {
    e.preventDefault();
    const { history, setUser } = this.props;
    this.authService.signup(this.state).then(
      user => {
        setUser(user);
        history.push("/");
      },
      error => {
        console.error(error);
      }
    );
  };

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
    const { name, surname, password, email } = this.state;
    return (
      <div className="container box signup-container">
        <h2 className="title is-1">Signup</h2>
        <div>
          <form onSubmit={this.handleSignUp}>
            <div className="field">
              <label className="label">Nombre</label>
              <input
                className="input"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                placeholder="Tu Nombre"
              />
            </div>

            <div className="field">
              <label className="label">Apellido</label>
              <input
                className="input"
                type="text"
                name="surname"
                value={surname}
                onChange={this.handleChange}
                placeholder="Tu Apellido"
              />
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Tu Email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope">✉️</i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              {/* <p class="help is-danger">This email is invalid</p> */}
            </div>
            <div className="field">
              <label className="label">Contraseña</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  value={password}
                  name="password"
                  required
                  onChange={this.handleChange}
                  placeholder="********"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope">🔒</i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              {/* <p class="help is-danger">This email is invalid</p> */}
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Crear cuenta</button>
              </div>
              <div className="control">
              <Link to="/" className="button is-link is-light">Cancelar</Link>
              </div>
            </div>
          </form>
        </div>

        {/* <form onSubmit={this.handleSignUp}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" value={name} onChange={this.handleChange}/>
          <label htmlFor="surname">Surname: </label>
          <input type="text" name="surname" value={surname} onChange={this.handleChange}/>
          <label htmlFor="email">E-mail: </label>
          <input type="text" name="email" value={email} onChange={this.handleChange}/>
          <label htmlFor="password">Password: </label>
          <input type="password" value={password} name="password" required onChange={this.handleChange}/>
          <input type="file" name="picture" onChange={this.handleUpload}/>
          <input type="submit" value="Create account"/>
        </form>*/}
      </div>
    );
  }
}
