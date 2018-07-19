// @flow
import React, {Component} from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';
import Flexbox from 'components/Flexbox';
import CreateEventForm from "components/CreateEventForm";
import {apiHost} from "API";
import Event from "components/Event";
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
        this.state = {eventData:{}};
        this.handleCreateEventSubmit = this.handleCreateEventSubmit.bind(this)
        this.baseState = this.state;
    }

    async handleCreateEventSubmit(inputMap:{}){
        inputMap.calendar_id= this.props.calendarId;
        let startTime = Date.parse(inputMap.start) / 1000 || 0;
        let endTime = Date.parse(inputMap.end)/ 1000 || 0;
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
          const eventData = await response.json();
          console.log(eventData);
          this.setState({
              eventData:eventData,
          });
        }
        else {
          alert('Unknown Error. Please contact your site administrator.')
        }
    }

    render(){
        let content;
        if (Object.keys(this.state.eventData).length===0 ){
            content = <CreateEventForm
                handleCreateEventSubmit = {this.handleCreateEventSubmit}
            />
        }
        else{
            content = <Event
                    eventData = {this.state.eventData}
            />
        }
        return(
            <Flexbox
                direction = "column"
                styles = {styleSheet.OuterContainer}
                alignItems = "center"
                justifyContent = "center"
            >
                {content}
            </Flexbox>
        )
    }
}
export default CalendarLayout
