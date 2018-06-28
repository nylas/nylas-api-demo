// @flow
import React from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';
import Form from 'components/Form';
import Flexbox from 'components/Flexbox';
import SubmitButton from 'components/SubmitButton';
import TextFormField from 'components/TextFormField';
import Header from 'components/Header';

const { BACKGROUND_COLORS } = STYLES;

const styleSheet = StyleSheet.create({
  SignInForm: {
    border: '1px solid lightgrey',
    borderRadius: 4,
    width: '100%',
    backgroundColor: BACKGROUND_COLORS.MAIN,
    padding: 30,
  },
  Header: {
    fontWeight: 500,
    marginBottom: 10,
    marginTop: 15,
  },
  FormField: {
    width: '100%',
    margin: '0 10px',
    marginTop: '25px',
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

export default function LoginForm(props) {
  return (
    <Form styles={styleSheet.login} onSubmit={props.handleLoginSubmit}>
      <Flexbox direction="column" alignItems="center">
        <Header medium styles={styleSheet.Header}>
          Sign in to the Nylas API Demo
        </Header>
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
        <TextFormField
          required
          styles={styleSheet.FormField}
          inputStyles={styleSheet.Input}
          labelStyles={styleSheet.Label}
          name="password"
          label="Password"
          placeholder="•••••••••••"
          type="password" />
        <SubmitButton emphasis styles={styleSheet.SubmitButton}>
          Sign In
        </SubmitButton>
      </Flexbox>
    </Form>
  );
}
