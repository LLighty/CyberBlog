import React, { Component } from "react";

import axios from "axios";

class EditArticle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            slug: '',
            author: '',
            content: '',
            status: 0,
            tags: '',
            allowedTags : [],
            loadedTags: false,
            articleID: null
        }
        if(this.props.location.articleID !== undefined){
            window.sessionStorage.setItem("editing" , "http://localhost:8000/api/articles/"+this.props.location.articleID);
        }

        this.setSlug = this.setSlug.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeTags = this.changeTags.bind(this);
        this.getPostData = this.getPostData.bind(this);
    }

    async componentDidMount() {
        this.loadTags();
        this.loadArticleInfo();
    }
    
    async loadTags() {
        try{
          const response = await axios.get("http://localhost:8000/api/tags");
          const status = response.status;
          if(status===200)
          {
            const allowedTags = response.data;
            this.setState({
                allowedTags,
                loadedTags: true
            });
            //console.log(`Article: ${JSON.stringify(articledata)}`);
          }
        } catch(e) {
          console.log(`Error: ${e}`);
        }
    }

    async loadArticleInfo(){
        try{
            const response = await axios.get(window.sessionStorage.getItem("editing"));
            const status = response.status;
            if(status===200)
            {
              const articledata = response.data;
              this.setState({
                  title: articledata.title,
                  slug: articledata.slug,
                  content: articledata.content,
                  status: articledata.status,
                  tags: articledata.tags
              });
            }
          } catch(e) {
            console.log(`Error: ${e}`);
        }
    }

    //('title', 'slug', 'content', 'status', 'tags')
    getPostData(){
        var dataToReturn = {
            title: this.state.title,
            slug: this.state.slug,
            content: this.state.content,
            status: this.state.status,
            tags: this.state.tags
        };
        return dataToReturn;
    }

    handleSubmit(e){
        e.preventDefault();
        axios({
            method: "PATCH",
            url: window.sessionStorage.getItem("editing") + '/',
            data: this.getPostData(),
            headers: {
                authorization:`Token ${localStorage.getItem("token")}`
            }
        }).then((response)=>{
            console.log(response.status);
            if (response.status == '200') {
                alert("Article has been updated");
            } else {
                alert("Article Failed to Update");
          }
        }).catch((error) => {
            alert("Error editing article");
            console.log(error);
        })
    }

    render() {
        return(
            <div class="container">
                <div class="d-flex justify-content-center title h1">
                  Edit an Article
                </div>
                <div>
                    <div class="row">
                        <div class="col-md-16">
                            <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" value={this.state.title} onChange={this.onTitleChange.bind(this)} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Content</label>
                                    <textarea className="form-control" rows="20" id="content" value={this.state.content} onChange={this.onContentChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select id="status" onChange={this.changeStatus} value={this.state.value}>
                                        <option value="0">Draft</option>
                                        <option value="1">Publish</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tags">Tags</label>
                                    {this.state.loadedTags ? 
                                    <select id="tags" onChange={this.changeTags} value={this.state.tags}>{this.renderTags()}</select>
                                    : <div>Loading Tags</div>}
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderTags(){
        var options = [];
        options.push(<option key='blank' value=""></option>);
        for(var i = 0; i < this.state.allowedTags.length; i++){
            options.push(<option key={i} value={this.state.allowedTags[i].tag}>{this.state.allowedTags[i].tag}</option>);
        }
        return options;
    }

    changeStatus(event){
        this.setState({status: event.target.value});
    }

    changeTags(event){
        this.setState({tags: event.target.value});
    }

    setSlug(){
        var title = this.state.title;
        title = title.toLowerCase();
        title = title.replaceAll(" ", "-");
        this.setState({slug : title});
    }

    onTitleChange(event) {
        this.setState({title: event.target.value});
        this.setSlug();
    }
  
    onContentChange(event) {
        this.setState({content: event.target.value});
    }
}

export default EditArticle;