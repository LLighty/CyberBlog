import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";

class Navbar extends Component {
    render() {
        return (
          <Router>
            <div>
              <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
                <div class="navbar-brand">Lighty Cyber Blog</div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                  <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                      <Link class="nav-link" to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/about">About</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
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