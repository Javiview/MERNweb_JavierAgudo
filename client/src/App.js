import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import { StickyContainer, Sticky } from "react-sticky";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import AuthService from "./services/AuthService";
import PrivateRoute from "./guards/PrivateRoute";
import NavBar from "./components/NavBar/NavBar";
import Catalogue from "./components/Catalogue/Catalogue";
import HangerProfile from "./components/HangerProfile/HangerProfile";
import UserProfile from "./components/UserProfile/UserProfile";
import Footer from "./components/Footer/Footer";
import BannerMainPage from "./components/BannerMainPage/BannerMainPage";
import Cart from "./components/Cart/Cart";
import Home from "./components/Home/Home";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    user: null,
    hangersToCart: []
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

  goToCart = item => {
    const items = [...this.state.hangersToCart];
    items.push(item);

    this.setState({
      ...this.state,
      hangersToCart: items
    });
  };
  deleteHangerInCart(id) {
    let hangerToCartCopy = [...this.state.hangersToCart]
    let resultHangerToCart = hangerToCartCopy.filter((hanger) => !hanger._id.includes(id))
    
    this.setState({
        ...this.state,
        hangersToCart: resultHangerToCart
    })

}

  componentDidMount() {
    this.fetchUser();
  }
  componentDidUpdate(){
    console.log(this.state.hangersToCart)
  }

  render() {
    this.fetchUser();
    const { user, hangersToCart } = this.state;
    console.log(hangersToCart);

    return (
      <div className="App">
        <StickyContainer>
          <header className="App-header">
            <BannerMainPage />
            <NavBar {...user} logout={this.logout}></NavBar>
          </header>
          <div>
            {!user && (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={match => <Home {...match}/>}
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
            {user && (
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile"
                  user={user}
                  component={UserProfile}
                />
                <PrivateRoute
                  exact
                  path="/cart"
                  user={user}
                  component={Cart}
                  hangers={hangersToCart}
                  deleteHangerInCart={(id) => this.deleteHangerInCart(id)}
                />
                <Route
                  exact
                  path="/"
                  render={match => <Home {...match}/>}
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
                  render={match => (
                    <HangerProfile
                      {...match}
                      user={user}
                      goToCart={this.goToCart}
                    ></HangerProfile>
                  )}
                />
              </Switch>
            )}
          </div>
        </StickyContainer>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
