import React, { Component } from 'react';
import { useHistory } from "react-router-dom";

import axios from "axios";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleSubmit(e){
        e.preventDefault();
        axios({
            method: "POST",
            url:"http://localhost:8000/rest-auth/login/",
            data:  this.state
        }).then((response)=>{
            console.log(response.status);
            if (response.status == '200') {
                alert("Login Successful.");
                //console.log(response.data.key);
                localStorage.setItem('token', response.data.key);
                localStorage.setItem('loggedIn', true)
                this.props.authToUpdate(true);
                this.resetForm();
            }
        }).catch((error) => {
            alert("Unable to login with provided credentials.");
            console.log(error);
        })
    }
    
    resetForm(){
        this.setState({username: '', email: '', password: ''});
    }

    render() {
        return(
            <div class="container">
                <div class="d-flex justify-content-center title h1">
                    Login
                </div>
                <div>
                    <div class="row">
                        <div class="col-md-16">
                            <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                                <div className="form-group">
                                    <label htmlFor="name">Username</label>
                                    <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onUsernameChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" id="email" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.onPasswordChange.bind(this)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onEmailChange(event) {
        this.setState({email: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }
}

export default Login;