import React, { Component } from "react";

import axios from "axios";

import Comments from "../Components/Comments";
import "./Article.css";

class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
          url: "http://localhost:8000/api/articles/"+this.props.location.articleID,
          articledata: [],
          isLoading: true,
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
                articledata,
                isLoading: false
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
      //console.log(dateNoTime);
      var day = this.grabDay(dateNoTime);
      var month = this.grabMonth(dateNoTime);
      var year = this.grabYear(dateNoTime);

      var renderDate = month + " " + day + ", " + year;
      //console.log(renderDate);

      return renderDate;
    }

    grabMonth = (date) => {
      switch(parseInt(date.split('-')[1])){
          case 1:
            return "January";
          case 2:
            return "February";
          case 3:
            return "March";
          case 4:
            return "April";
          case 5:
            return "May";
          case 6:
            return "June";
          case 7:
            return "July";
          case 8:
            return "August";
          case 9:
            return "September";
          case 10:
            return "October";
          case 11:
            return "November";
          case 12:
            return "December";
          default:

      }
    }

    grabDay = (date) => {
      return date.split('-')[2];
    }

    grabYear = (date) => {
      return date.split('-')[0];
    }

    render() {
        return(
            <div className="container">
                <div className="d-flex justify-content-center title h1">
                  {this.state.articledata.title}
                </div>
                <div>
                  <pre>
                    {this.state.articledata.content}
                  </pre>
                </div>
                <div>
                  Created on: {this.grabDate(this.state.articledata.created_on)}<br />
                  Edited  on: {this.grabDate(this.state.articledata.updated_on)}
                </div>

                {this.state.isLoading ? <div>Loading Comments</div> : <Comments slug={this.state.articledata.slug}/>}
            </div>
        );
    }
}

export default Article;