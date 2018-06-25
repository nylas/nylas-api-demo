import React, { Component } from 'react';

import LoginForm from 'components/LoginForm';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: false,
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    };

    setUserData(userData) {
        this.setState({
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            defaultCalendar: userData.defaultCalendar,
            displayLogo: userData.displayLogo,
            displayText: userData.displayText
        });
    }

    async handleLoginSubmit(inputMap) {
        const response = await fetch(`/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(inputMap),
        });
        if (response.status === 200) {
            // login successful
            const userData = await response.json();
            this.setUserData(userData);
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
                  handleLoginSubmit={this.handleLoginSubmit}/>
            );
        }
    }
}

export default App;
