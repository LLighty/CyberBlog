import React, { Component } from "react";

const articles = [
  {
    title: "test", 
    slug: "test", 
    author: "Lighty", 
    updated_on: "10/10/10", 
    content: "Testing Blog Articles", 
    created_on: "10/10/10", 
    status: "Published"
  }
]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: articles,
    };
  }

  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}

export default Home;
