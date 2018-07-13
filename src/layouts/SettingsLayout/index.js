// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'aphrodite/no-important';

import { apiHost } from "API";
import Flexbox from 'components/Flexbox';
import SettingsForm from 'components/SettingsForm';
import { STYLES } from 'appConstants';

const { BACKGROUND_COLORS } = STYLES;

const styleSheet = StyleSheet.create({
  OuterContainer: {
    backgroundColor: BACKGROUND_COLORS.MAIN_INSET,
  },
});

export default class SettingsLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calendars: [],
      updateMessage: ''
    }
    this.handleSettingsSubmit = this.handleSettingsSubmit.bind(this);
  };

  componentDidMount() {
    this.getCalendars();
  }

  async getCalendars() {
    const response = await fetch(`${apiHost()}/calendars`, {
      method: "GET",
      credentials: 'include'
    });
    if (response.status === 200) {
      // query successful
      const calendarData = await response.json();
      this.setState({
        calendars: calendarData,
      })
    } else {
      // misc failure(s)
      alert('Unknown Error. Please contact your site administrator.')
    }
  }

  async handleSettingsSubmit(inputMap) {
    const response = await fetch(`${apiHost()}/user/${this.props.userId}`, {
      method: "PUT",
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(inputMap),
    });
    if (response.status === 200) {
      // update successful
      const userData = await response.json();
      this.props.setUserData(userData);
      // TODO: message should be updated (hidden) if form values change again
      this.setState({ updateMessage: 'Your settings have been saved!' });
    } else {
      // misc failure(s)
      alert('Unknown Error. Please contact your site administrator.')
    }

  }

  render() {
    return (
      <Flexbox
        direction="column"
        styles={styleSheet.OuterContainer}
        alignItems="center"
        justifyContent="center">

        <SettingsForm
          calendars={this.state.calendars}
          companyLogo={this.props.companyLogo}
          companyText={this.props.companyText}
          defaultCalendar={this.props.defaultCalendar}
          handleSettingsSubmit={this.handleSettingsSubmit}
          updateMessage={this.state.updateMessage}
        />
      </Flexbox>
     );
   }
}
