// @flow
import React from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';
import Form from 'components/Form';
import Flexbox from 'components/Flexbox';
import SubmitButton from 'components/SubmitButton';
import TextFormField from 'components/TextFormField';

const { BACKGROUND_COLORS } = STYLES;

const styleSheet = StyleSheet.create({
  ThreadsForm: {
    width: '100%',
    backgroundColor: BACKGROUND_COLORS.MAIN_INSET,
    padding: 30,
  },
  FormField: {
    width: '25%',
    margin: '0 10px',
  },
  Input: {
    padding: '10px',
  },
  Label: {
    marginBottom: '5px',
  },
  SubmitButton: {
    marginTop: '30px',
    alignSelf: 'flex-end',
    flexGrow: 0,
    flexShrink: 0,
  }
});

type Props = {
  handleGetThreadsSubmit: () => any,
};

export default function ThreadsForm(props: Props) {
  return (
    <Form styles={styleSheet.ThreadsForm} onSubmit={props.handleGetThreadsSubmit}>
      <Flexbox
        direction="row"
        alignItems="center"
        justifyContent="center">
        <TextFormField
          required
          autoFocus
          styles={styleSheet.FormField}
          inputStyles={styleSheet.Input}
          labelStyles={styleSheet.Label}
          name="email"
          label="Email Address"
          placeholder="name@email.com"
          type="email" />
        <SubmitButton emphasis styles={styleSheet.SubmitButton}>
          Get Emails
        </SubmitButton>
      </Flexbox>
    </Form>
  );
}
