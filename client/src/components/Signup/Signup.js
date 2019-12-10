import React, { Component } from 'react'
import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../../services/AuthService'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.authService = new AuthService();
  }

  state = {
    username: '',
    name:'',
    surname:'',
    password: '',
    //picture: '',
    email:''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleSignUp = (e) => {
    e.preventDefault()
    const { history, setUser } = this.props;
    this.authService.signup(this.state)
    .then(
      (user) => {
        setUser(user);
        history.push("/")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  handleUpload = (e) => {
    console.log(e.target.files[0])
    const uploadData = new FormData();
    console.log(uploadData)
    uploadData.append('picture', e.target.files[0])
    console.log(uploadData.getAll("picture"))
    this.authService.upload(uploadData)

    .then(
      (data) => {
        console.log(data)
        this.setState({...this.state, picture: data.secure_url})
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const {username, name, surname, password, picture, email } = this.state;
    return (
      <div>
        <PageTitle>SignUp</PageTitle>
        <form onSubmit={this.handleSignUp}>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={username} onChange={this.handleChange}/>
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
        </form>
      </div>
    )
  }
}