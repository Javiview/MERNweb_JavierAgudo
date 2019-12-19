import axios from "axios";

class HangerService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/hangers`,
      withCredentials: true    

    });
  }
  createHanger = () => {
    return this.instance
      .post("/new")
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  readHangers = () => {
    return this.instance
      .get("/")
      .then(res => {
          return Promise.resolve(res.data)})
      .catch(error => console.error(error));
  };
  profileHanger = (id) => {
    return this.instance
      .get(`/${id}`)
      .then(res => {
          
          return Promise.resolve(res.data)})
      .catch(error => console.error(error));
  };
}
export default HangerService;
