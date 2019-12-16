import React, { Component } from "react";

export default class BannerMainPage extends Component {
  render() {
    const bannerUrl ="https://res.cloudinary.com/dexfqvxax/image/upload/v1576487734/ResourcesIMPERIO/Banner_animated_Imperio_v2_iqzr5z.gif"
    return (
      <div className="banner-container">
        <img src={bannerUrl} alt="Banner-Imperio" />
      </div>
    );
  }
}
