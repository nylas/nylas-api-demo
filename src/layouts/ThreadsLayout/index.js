// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'aphrodite/no-important';

import { apiHost } from "API";
import Flexbox from 'components/Flexbox';
import { STYLES } from 'appConstants';
import ThreadsForm from 'components/ThreadsForm';
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
});

export default class ThreadsLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      threads: [],
    }
    this.handleGetThreadsSubmit = this.handleGetThreadsSubmit.bind(this);
  };

  async handleGetThreadsSubmit(inputMap) {
    const response = await fetch(`${apiHost()}/threads?any_email=${inputMap.email}`, {
      method: "GET",
      credentials: 'include'
    });
    if (response.status === 200) {
      // query successful
      const threadData = await response.json();
      this.setState({
        threads: threadData,
      })
    } else {
      // misc failure(s)
      alert('Unknown Error. Please contact your site administrator.')
    }

  }

  render() {
    const threadDivs = this.state.threads.map((thread) =>
      <Thread
        threadId={thread.id}
        lastMessageTimestamp={thread.last_message_timestamp}
        subject={thread.subject} />
    );
    return (
      <Flexbox direction="column" styles={styleSheet.OuterContainer}>
        <ThreadsForm
          handleGetThreadsSubmit={this.handleGetThreadsSubmit}
        />
        { threadDivs }
      </Flexbox>
      );
    }
}
