import React, { Component } from 'react';

import LoginForm from './login';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            logged_in: false
        }
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    };

    handleLoginChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleLoginSubmit(event) {
        event.preventDefault();
        const response = await fetch(`/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
                }),
        });
        if (response.status === 200) {
            // login successful
            this.setState({ logged_in: true });
        } else if (response.status === 400) {
            // login failed
            alert('Login Failed: Please provide an email and password.')
        } else if (response.status === 401) {
            // login failed
            alert('Login Failed: Incorrect credentials.')
        } else {
            // misc failure(s)
            alert('Unknown Error. Please contact your site administrator.')
        }

    }

    render() {
        if (this.state.logged_in) {
            return (
                <p>You are logged in!</p>
             );
        } else {
            return (
                <LoginForm
                  username={this.state.email}
                  password={this.state.password}
                  handleLoginChange={this.handleLoginChange}
                  handleLoginSubmit={this.handleLoginSubmit}/>
            );
        }
    }
}

export default App;
