import React, { Component } from "react";

import axios from "axios";

import {
  Link,
} from "react-router-dom";

class TagSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [[]],
      url: "http://localhost:8000/api/tags/"+this.props.location.tag+"/",
      isLoading: true,
      foundArticles: false
    };
    // console.log(this.state.url);
    this.loadArticles = this.loadArticles.bind(this);
    if(this.props.location.tag !== undefined){
      window.sessionStorage.setItem("url" , this.state.url);
    }
  }

  async componentDidMount() {
    this.loadArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    //this.state.value !== prevState.value
    if (prevProps.location.tag !== this.props.location.tag) {
      console.log("Test");
      this.setState({
        articleList: [[]],
        url: "http://localhost:8000/api/tags/"+this.props.location.tag+"/",
        isLoading: true,
        foundArticles: false
      })
      if(this.props.location.tag !== undefined){
        window.sessionStorage.setItem("url" , "http://localhost:8000/api/tags/"+this.props.location.tag+"/");
      }
      this.loadArticles();
    }
  }

  async loadArticles() {
    try{
      //console.log(window.sessionStorage.getItem("url"));
      const response = await axios.get(window.sessionStorage.getItem("url"));
      const status = response.status;
      if(status===200)
      {
        const articleList = response.data;
        this.setState({
          articleList,
          isLoading: false,
          foundArticles: true
        });
        //console.log(`Articles: ${JSON.stringify(articleList)}`);
      }
    } catch(e) {
      this.setState({
        isLoading: false,
        foundArticles: false
      });
      console.log(`Error: ${e}`);
    }
  }

  renderArticles = () => {
    const newArticles = this.state.articleList;
    //console.log(JSON.stringify(newArticles));
    if(this.state.foundArticles){
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
        </li>
      ));
    }
    return <div>Could not find any articles with that tag.</div>
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? <div>Loading Articles</div> : this.renderArticles()}
      </div>
    );
  }
}

export default TagSearch;
