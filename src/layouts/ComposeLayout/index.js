// @flow
import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { apiHost } from "API";
import ComposeForm from 'components/ComposeForm';
import Flexbox from 'components/Flexbox';
import { STYLES } from 'appConstants';
import Thread from 'components/Thread';

const { BACKGROUND_COLORS } = STYLES;

const styleSheet = StyleSheet.create({
  Header: {
    fontWeight: 500,
    marginBottom: 10,
    marginTop: 15,
  },
  OuterContainer: {
    backgroundColor: BACKGROUND_COLORS.MAIN_INSET,
  },
  ThreadContainer: {
    marginTop: 30,
  }
});

export default class ComposeLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      formSendingMessage: '',
    }
    this.handleSendSubmit = this.handleSendSubmit.bind(this);
  };

  formatContact(contactEmail) {
    return [{'name': '', 'email': contactEmail}]
  }

  async handleSendSubmit({cc, to, ...inputMap}) {
    this.setState({ formSendingMessage: 'Sending...' })
    if (cc) {
      inputMap.cc = this.formatContact(cc);
    }
    inputMap.to = this.formatContact(to);
    inputMap.tracking = {
      "links": false,
      "opens": false,
      "thread_replies": true};
    const response = await fetch(`${apiHost()}/send`, {
      method: "POST",
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(inputMap),
    });
    if (response.status === 200) {
      // update successful
      const messageData = await response.json();
      this.setState({ message: messageData });
    } else {
      // misc failure(s)
      alert('Unknown Error. Please contact your site administrator.')
    }

  }

  displayThread() {
    return <Flexbox direction="column"
      className={css([styleSheet.OuterContainer, styleSheet.ThreadContainer])}>
        <Thread
          defaultExpanded={true}
          threadId={this.state.message.thread_id}
          lastMessageTimestamp={this.state.message.date}
          subject={this.state.message.subject}
          pollForUpdates={true}
        />
      </Flexbox>
  }

  displayForm() {
    return <Flexbox
      direction="column"
      styles={styleSheet.OuterContainer}
      alignItems="center"
      justifyContent="center">
        <ComposeForm
          handleSendSubmit={this.handleSendSubmit}
          sendingMessage={this.state.formSendingMessage}
        />
      </Flexbox>
  }

  render() {
    return (
      <div>
      { !this.state.message ? this.displayForm() : this.displayThread() }
      </div>
     );
   }
}
