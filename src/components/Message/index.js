// @flow
import React from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import Flexbox from 'components/Flexbox';

const styleSheet = StyleSheet.create({
  Message: {
    margin: '5px',
    padding: '5px'
  },
});

type Props = {
  body: string,
  date: string,
  from: string,
};

export default function Message(props: Props) {

  return (
    <Flexbox direction="column" styles={styleSheet.Message}>
      <p>
        From: {props.from}
      </p>
      <p>
        {props.date}
      </p>
      <p>
        {props.body}
      </p>
    </Flexbox>
  );
}
