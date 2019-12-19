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
import JustRent from "./components/JustRent/JustRent";
import CartService from "./services/CartService";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.cartService = new CartService
  }

  state = {
    user: null,
    hangersToCart: [],
    num: 0
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

  updateNumCart = () => {
    this.cartService
    .userCart()
    .then(cart => {
      this.setState({
        ...this.state,
        num: cart.shopItems.length});
    })
    .catch((err)=>console.log(err))
  }

  cartRented=()=>{
    this.setState({...this.state,num:0})
  }
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
    this.updateNumCart()

  }
  componentDidUpdate(){
    console.log(this.state.hangersToCart)
  }

  render() {
    this.fetchUser();
    const { user, hangersToCart } = this.state;
    console.log(hangersToCart);
    console.log(this.state.num)

    return (
      <div className="App">
        <StickyContainer>
          <header className="App-header">
            <BannerMainPage />
            <NavBar {...user} numCart={this.state.num}logout={this.logout}></NavBar>
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
                  cartRented={()=>this.cartRented()}
                  updateNumCart={()=>this.updateNumCart()}
                  deleteHangerInCart={(id) => this.deleteHangerInCart(id)}

                />
                <Route
                  exact
                  path="/justrent"
                  render={match => <JustRent {...match} />}
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
                      updateNumCart={this.updateNumCart}
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
