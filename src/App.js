import React, { Component } from 'react';

import LoginLayout from 'layouts/LoginLayout';
import NavBar from 'components/NavBar';
import ComposeLayout from 'layouts/ComposeLayout';
import ThreadsLayout from 'layouts/ThreadsLayout';
import SettingsLayout from 'layouts/SettingsLayout';

import { apiHost } from "API";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      pageContent: '',
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
    this.toggleDisplayView = this.toggleDisplayView.bind(this);
    this.setUserData = this.setUserData.bind(this);
  };

  setUserData(userData) {
    this.setState({
      userId: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      defaultCalendar: userData.defaultCalendar,
      companyLogo: userData.companyLogo,
      companyText: userData.companyText
    });
  }

  toggleDisplayView(newView) {
    if (newView === 'calendar') {
      this.setState({ pageContent: 'Calendar' });
    } else if (newView === 'compose') {
      this.setState({ pageContent: <ComposeLayout /> });
    } else if (newView === 'mail') {
      this.setState({ pageContent: <ThreadsLayout /> });
    } else if (newView === 'settings') {
      this.setState({
        pageContent: <SettingsLayout
          companyLogo={this.state.companyLogo}
          companyText={this.state.companyText}
          defaultCalendar={this.state.defaultCalendar}
          setUserData={this.setUserData}
          userId={this.state.userId}/>
      });
    }
  }

  async handleLoginSubmit(inputMap) {
    const response = await fetch(`${apiHost()}/login`, {
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
    const response = await fetch(`${apiHost()}/logout`, {
      method: 'POST',
      credentials: 'include',
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

          { this.state.pageContent }
        </div>
       );
    } else {
      return (
          <LoginLayout
            handleLoginSubmit={this.handleLoginSubmit}/>
      );
    }
  }
}

export default App;
