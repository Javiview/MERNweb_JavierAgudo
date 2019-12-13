import React, { Component } from 'react'
import AuthService from '../../services/AuthService';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    email:'',
    password: '',
    
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleLogin = (e) => {
    const { setUser, history } = this.props;
    e.preventDefault()
    this.authService.login(this.state)
    .then(
      (user) => {
        setUser(user)
        history.push("/")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { password, email } = this.state;
    return (
      <div className="container box signup-container">
        <h2 className="title is-1">Login</h2>
        <div>
          <form onSubmit={this.handleLogin}>
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
                <button className="button is-link">Entrar</button>
              </div>
              <div className="control">
                <Link to="/" className="button is-link is-light">Cancelar</Link>
              </div>
            </div>
          </form>
        </div>
        </div>
    )
  }
}
