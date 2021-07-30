import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Comments.css';

import axios from "axios";

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
          url: "http://localhost:8000/api/" + this.props.slug + "/comment/",
          commentData: []
        };
        console.log(this.props.slug);
        this.loadComments = this.loadComments.bind(this);
    }
  
    async componentDidMount() {
      this.loadComments();
    }
  
    async loadComments() {
      try{
        console.log(this.state.url);
        const response = await axios.get(this.state.url);
        const status = response.status;
        if(status===200)
        {
          const commentData = response.data;
          this.setState({
            commentData
          });
          //console.log(`Comments: ${JSON.stringify(commentData)}`);
        }
      } catch(e) {
        console.log(`Error: ${e}`);
      }
    }

    renderComments = () => {
        const comments = this.state.commentData;
        //console.log(JSON.stringify(comments));
        return comments.map(item => (
            <div key={item.id} class="d-flex flex-row comment-row m-t-0">
                <div className="m-b-2 m-t-2"><span className="h5">User: {item.author}</span>
                  <div>{item.content}</div> <span>{item.created_on}</span>
                </div>
            </div>
        ));
    };

    render() {
        return (
            <div>  
                {this.renderComments()}
            </div>
        );
      }
}

export default Comments;