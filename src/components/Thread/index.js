// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';
import Flexbox from 'components/Flexbox';
import Header from 'components/Header';
import Message from 'components/Message';

const { BACKGROUND_COLORS } = STYLES;

const styleSheet = StyleSheet.create({
  Subject: {
    margin: '5px',
  },
  ThreadContainer: {
    width: '80%',
    backgroundColor: BACKGROUND_COLORS.MAIN,
    margin: '0 auto 10px auto',
    padding: '10px'
  },
  Thread: {
    justifyContent: 'space-between'
  },
  Timestamp: {
    margin: '5px',
  },
});

export default class Thread extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      messages: [],
    }
    this.toggleDisplayMessages = this.toggleDisplayMessages.bind(this);
  };

  async toggleDisplayMessages() {
    // TODO: implement REFRESH button so we re-query messages when button is clicked,
    // instead of when the thread is expanded
    if ( this.state.collapsed ) {
      console.log(`/messages?thread_id=${this.props.threadId}`);
      const response = await fetch(`/messages?thread_id=${this.props.threadId}`, {
        method: "GET",
        credentials: 'include'
      });
      if ( response.status === 200 ) {
        // query successful
        const messageData = await response.json();
        this.setState({
          collapsed: false,
          messages: messageData,
        });
      } else {
        // misc failure(s)
        alert('Unknown Error. Please contact your site administrator.');
      }
    } else {
        this.setState({
          collapsed: true
        });
    }
  }

  makeDateString(timestamp) {
    const dateTimestamp = new Date(timestamp * 1000);
    return dateTimestamp.getMonth() + 1 + '/' + dateTimestamp.getDate() + '/' + dateTimestamp.getFullYear()
  }

  render() {
    const messages = this.state.messages.map((message) =>
      <Message
        date={this.makeDateString(message.date)}
        body={message.snippet}
        from={message.from[0].email} />
    );
    const stringDate = this.makeDateString(this.props.lastMessageTimestamp);

    return (
      <Flexbox direction="column"
        styles={styleSheet.ThreadContainer}
      >
        <a onClick={this.toggleDisplayMessages}>
          <Flexbox direction="row"
            styles={styleSheet.Thread}
            justifyContent="stretch">
          <Header medium styles={styleSheet.Subject}>
            {this.props.subject || '(no subject)'}
          </Header>
          <Header small styles={styleSheet.Timestamp}>
            {stringDate}
          </Header>
          </Flexbox>
          { !this.state.collapsed ? messages : <p></p>}
        </a>
      </Flexbox>
      );
    }
}
