import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import Sidebar from "./Sidebar";
import Article from "../Pages/Article";
import TagSearch from "../Pages/TagSearch";
import "./Navbar.css";
import Login from "../Pages/Login";
import axios from "axios";
import CreateArticle from "../Pages/CreateArticle";
import EditArticle from "../Pages/EditArticle";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    var authToUpdate = this.authToUpdate.bind(this);
    this.logout = this.logout.bind(this);
    //console.log(this.props.slug);
}

authToUpdate(arg){
  this.setState({
    loggedIn: arg
  });
}

logout(){
  axios({
    method: "POST",
    url:"http://localhost:8000/rest-auth/logout/",
    data:  this.state
  }).then((response)=>{
      console.log(response.status);
      if (response.status == '200') {
          alert("Logout Successful.");
          //console.log(response.data.key);
          localStorage.removeItem('token');
          localStorage.removeItem('loggedIn');
          this.authToUpdate(false);
      }
  }).catch((error) => {
      console.log(error);
  })
}

render() {
  var authToUpdate = this.authToUpdate;
    return (
      <Router>
        <div>
          <div class="full-width">
            <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
              <div class="navbar-brand">Cyber Blog</div>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav">
                  <li>
                    <Link class="nav-item nav-link" to="/">Home</Link>
                  </li>
                  <li>
                    <Link class="nav-item nav-link" to="/about">About</Link>
                  </li>
                  <li>
                    <Link class="nav-item nav-link" to="/contact">Contact</Link>
                  </li>
                  {this.state.loggedIn || localStorage.getItem('loggedIn') ? <li class="nav-item nav-link">You are logged in</li> : <li><Link class="nav-item nav-link" to="/login">Login</Link></li>}
                  {this.state.loggedIn || localStorage.getItem('loggedIn') ? <li class="nav-item nav-link"><button class="bg-transparent border-0" onClick={this.logout}>Logout</button></li> : null}
                  {this.state.loggedIn || localStorage.getItem('loggedIn') ? <li><Link class="nav-item nav-link" to="/create-article">Create Article</Link></li> : null}
                </ul>
              </div>
            </nav>
          </div>
          <div id="container">
            <div id="left">
              <Sidebar />
            </div>
            <div id="right">
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>
                <Route path="/login">
                  <Login authToUpdate = {authToUpdate.bind(this)}/>
                </Route>
                <Route 
                  path="/create-article" 
                  render={() => localStorage.getItem('loggedIn') ?
                    <CreateArticle /> :
                    <Redirect to="/login" />
                }/>
                <Route path="/articles/tag/:tagid" component={TagSearch} />
                <Route path="/articles/edit/:articleid" component={EditArticle} />
                <Route path="/articles/:articleid" component={Article} />
                <Route path="/"> 
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Navbar;

/* <li class="nav-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/about">About</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/contact">Contact</Link>
                    </li> */