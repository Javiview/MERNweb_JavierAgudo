import axios from "axios";

class CartService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/cart`,
      withCredentials: true    

    });
  }
  pruebaCart = (shopItems) => {
    return this.instance
      .post("/cambiar", shopItems)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  createCart = (cart) => {
    return this.instance
      .post("/new", cart)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  readCart = () => {
    return this.instance
      .get("/")
      .then(res => {
          return Promise.resolve(res.data)})
      .catch(error => console.error(error));
  };
  profileCart = (id) => {
    return this.instance
      .get(`/${id}`)
      .then(res => {
          console.log(res.data)
          return Promise.resolve(res.data)})
      .catch(error => console.error(error));
  };
  userCart = (id) => {
    return this.instance
      .get(`/userCart/${id}`)
      .then(res => {
          return Promise.resolve(res.data)})
      .catch(error => console.error(error));
  };
  delItemFromCart = (id) => {
    return this.instance
      .put(`/${id}`)
      .then(res => {
          console.log(res.data)
          return Promise.resolve(res.data)})
      .catch(error => console.error(error));
  };
  updateCart = (state) => {
    console.log(state)
    return this.instance
      .put(`/update/${state.cartId}`,state)
      .then(res => {
          console.log(res.data)
          return Promise.resolve(res.data)})
      .catch(error => console.error(error));
  };
}
export default CartService;
