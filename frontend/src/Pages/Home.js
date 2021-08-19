import React, { Component } from "react";

import axios from "axios";

import {
  Link,
} from "react-router-dom";
import { Button } from "bootstrap";

/*
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
] */

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

  async loadArticles() {
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
    //console.log(JSON.stringify(newArticles));
    return newArticles.map(item => (
      <li 
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <Link
          key={item.id}
          to={{
            pathname: `/articles/${item.slug}`,
            articleID: `${item.id}`
          }}
        >
        {item.title}
        </Link>
        {localStorage.getItem('loggedIn') ? <button value={`/articles/${item.id}`} onClick={() => this.deleteArticle(`/articles/${item.id}`)}>Delete</button> : null}
      </li>
    ));
  };

  deleteArticle(article){
    //console.log("http://localhost:8000/api" + article);
    axios({
        method: "DELETE",
        url:"http://localhost:8000/api" + article,
        headers: {
          authorization:`Token ${localStorage.getItem("token")}`
      }
    }).then((response)=>{
        console.log(response.status);
        if (response.status == '200' || response.status == '204') {
            alert("Deletion Successful.");
            this.loadArticles();
        }
    }).catch((error) => {
        alert("Unable delete article with credentials provided.");
        console.log(error);
    })
  }

  render() {
    return (
      <div>
        {this.renderArticles()}
      </div>
    );
  }
}

export default Home;
