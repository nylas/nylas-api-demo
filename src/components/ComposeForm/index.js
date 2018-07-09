// @flow
import React from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';
import Flexbox from 'components/Flexbox';
import Form from 'components/Form';
import Header from 'components/Header';
import SubmitButton from 'components/SubmitButton';
import TextAreaFormField from 'components/TextAreaFormField';
import TextFormField from 'components/TextFormField';

const { BACKGROUND_COLORS } = STYLES;

const styleSheet = StyleSheet.create({
  ComposeForm: {
    width: '40%',
    backgroundColor: BACKGROUND_COLORS.MAIN,
    margin: 30,
    paddingTop: 30,
    paddingBottom: 30,
  },
  FormField: {
    width: '85%',
  },
  Input: {
    margin: 5,
    padding: '10px',
    flex: 'auto',
  },
  Label: {
    marginBottom: '5px',
    marginRight: 15,
    marginTop: '5px',
    flex: 'none',
  },
  SubmitButton: {
    flexGrow: 0,
    flexShrink: 0,
  },
  TextArea: {
    alignContent:'stretch',
    alignItems: 'stretch',
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 30,
    width: '85%'
  }
});

type Props = {
  handleSendSubmit: () => any,
  sendingMessage: string
};

export default function ComposeForm(props: Props) {
  return (
    <Form
      styles={styleSheet.ComposeForm}
      onSubmit={props.handleSendSubmit}>
      <Flexbox direction="column" alignItems="center">
        <Header medium styles={styleSheet.Header}>
          Compose Email
        </Header>
        <TextFormField
          required
          autoFocus
          styles={styleSheet.FormField}
          inputStyles={styleSheet.Input}
          labelStyles={styleSheet.Label}
          name="to"
          label="To:"
          placeholder="jdoe@email.com"
          flexDirection="row" />
        <TextFormField
          styles={styleSheet.FormField}
          inputStyles={styleSheet.Input}
          labelStyles={styleSheet.Label}
          name="cc"
          label="cc:"
          placeholder="lorem@ipsum.edu"
          flexDirection="row" />
        <TextFormField
          styles={styleSheet.FormField}
          inputStyles={styleSheet.Input}
          labelStyles={styleSheet.Label}
          name="subject"
          label="Subject" />
        <TextAreaFormField
          required
          styles={styleSheet.TextArea}
          inputStyles={styleSheet.Input}
          labelStyles={styleSheet.Label}
          name="body"
          label="Body" />
        <SubmitButton emphasis styles={styleSheet.SubmitButton}>
          Send
        </SubmitButton>
        { props.sendingMessage }
      </Flexbox>
    </Form>
  );
}
