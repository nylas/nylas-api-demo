// @flow
import React from 'react';
import { StyleSheet} from 'aphrodite/no-important'
import { STYLES } from 'appConstants';
import Form from "../Form";
import Flexbox from "../Flexbox";
import TextFormField from "../TextFormField";
import Header from "../Header";
import SubmitButton from 'components/SubmitButton';
import TimeSpanFormField from "../TimeSpanFormField";
import {css} from "../../modules/aphrodite-extended";
const {BACKGROUND_COLORS} = STYLES

type Props ={
    handleCreateEventSubmit:()=> any,
    calendarID: any
}

const styleSheet = StyleSheet.create({
  CreateEventForm: {
    border: '1px solid lightgrey',
    borderRadius: 4,
    width: '100%',
    backgroundColor: BACKGROUND_COLORS.MAIN,
    padding: 30,
  },
  Header: {
    fontWeight: 500,
    marginBottom: 10,
    marginTop: 30,
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
    alignSelf: 'flex-center',
    flexGrow: 0,
    flexShrink: 0,
  },
  Notice:{
      marginTop: '10px',
      alignSelf:'flex-center'
  }

});

export default function CreateEventForm(props: Props) {
    return(
        <Form stylesheet={styleSheet.CreateEventForm} onSubmit = {props.handleCreateEventSubmit}>
            <Flexbox direction ='column' alignItems = 'center'>
                <Header medium styles ={styleSheet.Header}>
                    Add an event to your calendar
                </Header>
                <p className={css(styleSheet.Notice)} >Remember to set your default calendar before you create an event! Please do that on the Settings page.</p>
                <TextFormField
                    required
                    styles={styleSheet.FormField}
                    inputStyles={styleSheet.Input}
                    labelStyles={styleSheet.Label}
                    name="title"
                    label="Event Title:"
                    placeholder="Staff Meeting"
                    type="text"

                />
                <TimeSpanFormField
                    required
                    styles={styleSheet.FormField}
                    inputStyles={styleSheet.Input}
                    labelStyles={styleSheet.Label}
                    name="start"
                    label="Event Start:"
                    placeholder="1997-12-02"
                    type="datetime-local"
                />
                <TimeSpanFormField
                    required
                    styles={styleSheet.FormField}
                    inputStyles={styleSheet.Input}
                    labelStyles={styleSheet.Label}
                    name="end"
                    label="Event End:"
                    placeholder="1997-12-02"
                    type="datetime-local"
                />

                <TextFormField
                    styles={styleSheet.FormField}
                    inputStyles={styleSheet.Input}
                    labelStyles={styleSheet.Label}
                    name="participantEmail"
                    label="Participant's Email:"
                    placeholder="jdoe@email.com"
                    type="email"

                />
                <TextFormField
                    styles={styleSheet.FormField}
                    inputStyles={styleSheet.Input}
                    labelStyles={styleSheet.Label}
                    name="description"
                    label="Event Description:"
                    placeholder="This is the event for "
                    type="text"

                />
                <TextFormField
                    styles={styleSheet.FormField}
                    inputStyles={styleSheet.Input}
                    labelStyles={styleSheet.Label}
                    name="location"
                    label="Location:"
                    placeholder="123 ABC Street, XYZ County"
                    type="text"

                />

                <SubmitButton emphasis styles={styleSheet.SubmitButton}>
                    Create Event
                </SubmitButton>

            </Flexbox>
        </Form>
    )


}
