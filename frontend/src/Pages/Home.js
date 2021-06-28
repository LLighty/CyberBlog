import React, { Component } from "react";

import axios from "axios";

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
      articleList: [[]],
    };
    this.loadArticles = this.loadArticles.bind(this);
  }

  async componentDidMount() {
    this.loadArticles();
  }

  async loadArticles()
  {
    try{
      const response = await axios.get("http://localhost:8000/api/articles/");
      const status = response.status;
      if(status===200)
      {
        const articleList = response.data;
        this.setState({
          articleList
        });
        //console.log(`Articles: ${JSON.stringify(articleList)}`);
      }
    } catch(e) {
      console.log(`Error: ${e}`);
    }
  }

  renderArticles = () => {
    const newArticles = this.state.articleList;
    console.log("test");
    console.log(JSON.stringify(newArticles));
    return newArticles.map(item => (
      <li 
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        {item.title}
      </li>
    ));
  };

  render() {
    return (
      <div>
        Home
        {this.renderArticles}
      </div>
    );
  }
}

export default Home;
