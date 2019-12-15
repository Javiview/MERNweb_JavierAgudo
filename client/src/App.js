import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import AuthService from "./services/AuthService";
import PrivateRoute from "./guards/PrivateRoute";
import NavBar from "./components/NavBar/NavBar";
import Catalogue from "./components/Catalogue/Catalogue";
import HangerProfile from "./components/HangerProfile/HangerProfile";
import UserProfile from "./components/UserProfile/UserProfile";
import Footer from "./components/Footer/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    user: null
  };

  setUser = user => {
    this.setState({ ...this.state, user });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService
        .loggedInUser()
        .then(
          user => {
            this.setUser(user);
          },
          error => {
            this.setUser(false);
          }
        )
        .catch(() => {
          this.setUser(false);
        });
    }
  };
  logout = () => {
    this.authService
      .logout()
      .then(payload => {
        this.setState({ ...this.state, user: null });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    this.fetchUser();
    const { user } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <NavBar {...user} logout={this.logout}></NavBar>
        </header>
        <div>
          {!user && (
            <Switch>
              <Route
                exact
                path="/login"
                render={match => <Login {...match} setUser={this.setUser} />}
              />

              <Route
                exact
                path="/signup"
                render={match => <SignUp {...match} setUser={this.setUser} />}
              />

              <Route
                exact
                path="/catalogue"
                render={match => <Catalogue {...match}></Catalogue>}
              />
              <Route
                exact
                path="/catalogue/:id"
                render={match => <HangerProfile {...match}></HangerProfile>}
              />
            </Switch>
          )}
          {user && (
            <Switch>
              <PrivateRoute
                exact
                path="/profile"
                user={user}
                component={UserProfile}
              />
              <Route
                exact
                path="/login"
                render={match => <Login {...match} setUser={this.setUser} />}
              />

              <Route
                exact
                path="/signup"
                render={match => <SignUp {...match} setUser={this.setUser} />}
              />

              <Route
                exact
                path="/catalogue"
                render={match => <Catalogue {...match}></Catalogue>}
              />
              <Route
                exact
                path="/catalogue/:id"
                render={match => <HangerProfile {...match}></HangerProfile>}
              />
            </Switch>
          )}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
