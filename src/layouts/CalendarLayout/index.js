// @flow
import React, {Component} from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';
import Flexbox from 'components/Flexbox';
import CreateEventForm from "../../components/CreateEventForm";
import {apiHost} from "../../API";
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
type Props = {
  calendarId:string,
};

class CalendarLayout extends Component<Props>{
    constructor(props){
        super(props);
        this.handleCreateEventSubmit = this.handleCreateEventSubmit.bind(this)

    }
    async handleCreateEventSubmit(inputMap:{}){
        inputMap.calendar_id= this.props.calendarId;
        let startTime = (new Date(inputMap.start).getTime()) / 1000 || 0;
        let endTime = (new Date(inputMap.end).getTime())/ 1000 || 0;
        inputMap.when= {"start_time": startTime, "end_time": endTime};
        delete  inputMap.start;
        delete inputMap.end;
        if (inputMap.participantEmail){
            inputMap.participants = [
              {
                "comment": null,
                "email": inputMap.participantEmail,
                "name": "",
                "status": "noreply"
              }
            ];
        }
        else{
            inputMap.participants=[]
        }
        delete inputMap.participantEmail;
        const response  = await fetch(`${apiHost()}/events`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(inputMap),
          credentials: 'include'
        });
        if (response.status === 200) {
          const eventData = await  response.json();
        } else {
          alert('Unknown Error. Please contact your site administrator.')
        }

    }
    render(){
        return (
            <Flexbox
                direction = "column"
                styles = {styleSheet.OuterContainer}
                alignItems = "center"
                justifyContent = "center"
            >
                <CreateEventForm
                    handleCreateEventSubmit = {this.handleCreateEventSubmit}
                />


            </Flexbox>
        )
    }

}
export default CalendarLayout
