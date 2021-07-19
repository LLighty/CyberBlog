import React, { Component } from "react";

import axios from "axios";

import "./Article.css";

class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
          url: "http://localhost:8000/api/articles/"+this.props.match.params.articleid,
          articledata: []
        };
    }

    async componentDidMount() {
        this.loadArticle();
    }
    
    async loadArticle() {
        try{
          const response = await axios.get(this.state.url);
          const status = response.status;
          if(status===200)
          {
            const articledata = response.data;
            this.setState({
                articledata
            });
            console.log(`Article: ${JSON.stringify(articledata)}`);
          }
        } catch(e) {
          console.log(`Error: ${e}`);
        }
    }

    grabDate = (date) => {
      date = String(date);
      var dateNoTime = date.substring(0, date.indexOf('T'));
      console.log(dateNoTime);
      return dateNoTime;
    }

    render() {
        return(
            <div>
                <div class="d-flex justify-content-center title">
                  {this.state.articledata.title}
                </div>
                <div>
                  {this.state.articledata.content}
                </div>
                <div>
                  Created on: {this.grabDate(this.state.articledata.created_on)}<br />
                  Edited  on: {this.grabDate(this.state.articledata.updated_on)}
                </div>
            </div>
        );
    }
}

export default Article;