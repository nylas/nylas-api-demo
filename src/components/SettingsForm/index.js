// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';
import Flexbox from 'components/Flexbox';
import Form from 'components/Form';
import Header from 'components/Header';
import SubmitButton from 'components/SubmitButton';
import TextFormField from 'components/TextFormField';
import RadioButtonFormField from 'components/RadioButtonFormField';

const { BACKGROUND_COLORS } = STYLES;

const styleSheet = StyleSheet.create({
  SettingsForm: {
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
    padding: '10px',
  },
  Label: {
    marginBottom: '5px',
    marginTop: '5px'
  },
  RadioContainer: {
    cursor: 'inherit',
    fontSize: 14,
    fontWeight: 500,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 40,
    paddingLeft: 40,
  },
  RadioLabel: {
    marginTop: '5px',
  },
  SubmitButton: {
    flexGrow: 0,
    flexShrink: 0,
  },
  UpdateMessage: {
    paddingTop: 10
  },
});

export default function SettingsForm(props) {
  const calendarRadioButtons = props.calendars.map((calendar) =>
    <RadioButtonFormField
      name="defaultCalendar"
      label={calendar.name}
      key={calendar.id}
      labelPlacement="after"
      labelStyles={styleSheet.RadioLabel}
      defaultValue={calendar.id}
      defaultChecked={calendar.id === props.defaultCalendar} />
  );
  return (
    <Form styles={styleSheet.SettingsForm} onSubmit={props.handleSettingsSubmit}>
      <Flexbox direction="column" alignItems="center">
        <Header medium styles={styleSheet.Header}>
          Settings
        </Header>
        <TextFormField
          required
          autoFocus
          styles={styleSheet.FormField}
          inputStyles={styleSheet.Input}
          labelStyles={styleSheet.Label}
          name="companyText"
          label="Company Name"
          defaultValue={props.companyText ? props.companyText : ""}
          placeholder="Nylas"/>
        <TextFormField
          required
          styles={styleSheet.FormField}
          inputStyles={styleSheet.Input}
          labelStyles={styleSheet.Label}
          name="companyLogo"
          label="Company Logo"
          defaultValue={props.companyLogo ? props.companyLogo : ""}
          placeholder="https://www.nylas.com/hubfs/seafoam_preview.jpg" />
      </Flexbox>
        <Flexbox
          direction="column"
          styles={styleSheet.RadioContainer}
          alignItems="flex-start">
        <label className={css([styleSheet.RadioLabel])}>Pick a default calendar:</label>
        { calendarRadioButtons }
        </Flexbox>
        <Flexbox direction="column" alignItems="center">
        <SubmitButton emphasis styles={styleSheet.SubmitButton}>
          Update
        </SubmitButton>
        <div className={css([styleSheet.UpdateMessage])}>
        { props.updateMessage }
        </div>
        </Flexbox>
    </Form>
  );
}
