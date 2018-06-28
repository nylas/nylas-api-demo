import React, { Component } from 'react';

import LoginForm from 'components/LoginForm';
import NavBar from 'components/NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      pageTitle: ''
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
    this.toggleDisplayView = this.toggleDisplayView.bind(this);
  };

  setUserData(userData) {
    this.setState({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      defaultCalendar: userData.defaultCalendar,
      companyLogo: userData.displayLogo,
      companyText: userData.displayText
    });
  }

  toggleDisplayView(newView) {
    if (newView === 'calendar') {
      this.setState({ pageTitle: 'Calendar' });
    } else if (newView === 'mail') {
      this.setState({ pageTitle: 'Mail' });
    } else if (newView === 'settings') {
      this.setState({ pageTitle: 'Settings' });
    }
  }

  async handleLoginSubmit(inputMap) {
    const response = await fetch(`/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputMap),
      credentials: 'include'
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

  async handleLogoutSubmit() {
    const response = await fetch(`/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    if (response.status === 200) {
      // logout successful
      this.setState({
          logged_in: false,
          email: '',
          firstName: '',
          lastName: '',
          defaultCalendar: '',
          companyLogo: '',
          companyText: ''});
    } else {
      // misc failure(s)
      alert('Unknown Error. Please contact your site administrator.')
    }

  }

  render() {
    if (this.state.logged_in) {
      return (
        <div>
          <NavBar
            logoSrc={this.state.companyLogo}
            logoText={this.state.companyText}
            toggleDisplayView={this.toggleDisplayView}
            handleLogoutSubmit={this.handleLogoutSubmit} />

          {this.state.pageTitle}
        </div>
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
