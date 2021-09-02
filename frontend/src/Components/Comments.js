import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Comments.css';

import axios from "axios";

class Comments extends Component {
  constructor(props) {
      super(props);
      this.state = {
        url: "http://localhost:8000/api/" + this.props.slug + "/comment/",
        commentData: [],
        postData: {post: this.props.postID, author: '', content: ''}
      };
      //console.log(this.props.slug);
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
              <div className="m-b-2 m-t-2">
                {localStorage.getItem('loggedIn') ? <div><button value={`/comments/${item.id}`} onClick={() => this.deleteComment(`/comments/${item.id}`)}>Delete</button></div> : null}
              </div>
          </div>
      ));
  };

  deleteComment(comment){
    //console.log("http://localhost:8000/api" + commentID);
    axios({
      method: "DELETE",
      url:"http://localhost:8000/api" + comment,
      headers: {
        authorization:`Token ${localStorage.getItem("token")}`
    }
    }).then((response)=>{
        console.log(response.status);
        if (response.status == '200' || response.status == '204') {
            alert("Deletion Successful.");
            this.loadComments();
        }
    }).catch((error) => {
        alert("Unable delete article with credentials provided.");
        console.log(error);
    })
  }

  handleSubmit(e){
    e.preventDefault();
    //console.log("Submit Comment");
    //console.log(this.state.postData);
    axios({
        method: "POST",
        url: this.state.url,
        data:  this.state.postData
    }).then((response)=>{
        //console.log(response.status);
        if (response.status === 201) {
            alert("Comment Posted!");
            this.loadComments();
            this.resetForm();
        } else {
            alert("Comment failed to post!");
        }
    }) 
  }
  
  resetForm(){
      this.setState({
        postData: {author: '', content: ''}
      });
  }

  onNameChange(event) {
    this.setState({
      postData: {
        ...this.state.postData,
        author: event.target.value
      }}
    );
  }


  onContentChange(event) {
    this.setState({
      postData: {
        ...this.state.postData,
        content: event.target.value
      }
    });
  }

  render() {
      return (
          <div>
            <div>
              {this.renderComments()}
            </div>
            <div>
              <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" value={this.state.postData.author} onChange={this.onNameChange.bind(this)} />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea className="form-control" rows="5" id="content" value={this.state.postData.content} onChange={this.onContentChange.bind(this)} />
                </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div> 
          </div>
    );
  }
}

export default Comments;