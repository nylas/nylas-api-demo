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

type Props = {
  lastMessageTimestamp: string,
  threadId: string,
  subject: string,
  defaultExpanded?: boolean,
  pollForUpdates?: boolean,
};

export default class Thread extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      collapsed: true,
      messages: [],
    }
    this.toggleDisplayMessages = this.toggleDisplayMessages.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.pollInterval = null;
  };

  async componentDidMount() {
    if (this.props.defaultExpanded) {
      await this.toggleDisplayMessages();
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  async getMessages() {
    const response = await fetch(`/messages?thread_id=${this.props.threadId}`, {
      method: "GET",
      credentials: 'include'
    });
    if ( response.status === 200 ) {
      // query successful
      const messageData = await response.json();
      return messageData
    } else {
      // misc failure(s)
      alert('Unknown Error. Please contact your site administrator.');
    }
  }

  async updateMessages() {
    const messageData = await this.getMessages();
    if ( messageData.length > this.state.messages.length ) {
      this.setState({ messages: messageData });
    }
  }

  async toggleDisplayMessages() {
    if (this.state.collapsed) {
      await this.updateMessages();
      this.setState({ collapsed: false });
      // poll backend cache for updates 5 times per second
      if ( this.props.pollForUpdates && !this.pollInterval ) {
        this.pollInterval = setInterval(this.updateMessages, 200);
      }
    } else {
        this.setState({
          collapsed: true
        });
        if (this.pollInterval) {
          clearInterval(this.pollInterval);
          this.pollInterval = null;
        }
    }
  }

  makeDateString(timestamp) {
    const dateTimestamp = new Date(timestamp * 1000);
    return dateTimestamp.getMonth() + 1 + '/' + dateTimestamp.getDate() + '/' + dateTimestamp.getFullYear()
  }

  render() {
    const messages = this.state.messages.map((message) =>
      <Message
        key={message.id}
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
