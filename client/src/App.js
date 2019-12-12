import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import AuthService from './services/AuthService';
import PrivateRoute from './guards/PrivateRoute';
import NavBar from './components/NavBar/NavBar';
import Catalogue from './components/Catalogue/Catalogue';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    user: null
  }

  setUser = (user) => {
    this.setState({ ...this.state, user })
  }

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService.loggedInUser()
        .then(
          (user) => {
            this.setUser(user)
          },
          (error) => {
            this.setUser(false)
          }
        )
        .catch(() => {
          this.setUser(false)
        })
    }
  }
  logout = () => {
    this.authService
      .logout()
      .then(payload => {
        this.setState({...this.state, user : null})

      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    this.fetchUser()
    const { user } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        <NavBar {...user} logout={this.logout}></NavBar>
           <Switch>
             
            {/* <PrivateRoute exact path="/" user={user}/> */}
          </Switch>
        </header>
       <div>
       <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />

<Route exact path="/signup" render={(match) => <SignUp {...match} setUser={this.setUser} />} />

          <Route exact path="/catalogue" render={(match) => <Catalogue {...match}></Catalogue>} />
          </div>
      </div>
    );
  }
}

export default App;

