import React, { Component } from "react";
import "./_Footer.scss"

export default class Footer extends Component {
  render() {
    return <React.Fragment>
        <footer className="has-background-dark footer-container">
            <div className="has-text-warning is-size-4 has-text-centered">MERN web creada por <span className="is-size-3">Javier Agudo</span></div>
            <div>
              <a href="https://www.linkedin.com/in/javier-agudo/" target="_blank"> <img className="img-foot-1" src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576842673/ResourcesIMPERIO/Lkndin_icon_ywsf5r.png" alt="Linkdin"/></a>
              <a href="https://github.com/Javiview" target="_blank"><img className="img-foot-2" src="https://res.cloudinary.com/dexfqvxax/image/upload/v1576842676/ResourcesIMPERIO/github_icon_d0s5iu.png" alt="GitHub"/></a>
            </div>
        </footer>
    </React.Fragment>;
  }
}
