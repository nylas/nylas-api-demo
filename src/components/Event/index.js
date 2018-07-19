import React,{ Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important'
import { STYLES } from 'appConstants';
import {apiHost} from "API";
import Header from "../Header";
import Flexbox from "../Flexbox";
import TextDisplay from "../TextDisplay";
const {BACKGROUND_COLORS} = STYLES



type Props ={
    eventData: object
}

const styleSheet = StyleSheet.create({
  Event: {
    border: '1px solid lightgrey',
    borderRadius: 4,
    marginTop:20,
    backgroundColor: BACKGROUND_COLORS.MAIN,
    padding: 30,
  },
  Header: {
    fontWeight: 500,
    marginBottom: 10,
    marginTop: 30,
    alignText:'center'
  },
  Label: {
    marginBottom: '5px',
  },
  Content:{}

});

class Event extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {eventData: props.eventData, eventId: props.eventData.id}
        this.pollInterval = null;
        this.updateEventData = this.updateEventData.bind(this);
    }

    async componentDidMount(){
        if(!this.pollInterval){
            this.pollInterval = setInterval(this.updateEventData, 200);
        }
    }

    componentWillUnmount() {
        if (this.pollInterval) {
          clearInterval(this.pollInterval);
          this.pollInterval = null;
        }
    }

    async getEventUpdates(){
        const response = await fetch(`${apiHost()}/events/${this.state.eventId}`, {
          method: "GET",
          credentials: 'include'
        });
        if ( response.status === 200 ) {
          return await response.json();
        } else {
          alert('Unknown Error. Please contact your site administrator.');
        }
    }

    async updateEventData(){
        const eventData = await this.getEventUpdates();
        if (Object.keys(eventData).length !== 0 && JSON.stringify(eventData) !== JSON.stringify(this.state.eventData)) {
            this.setState({eventData: eventData});
        }
    }

    getTextContent(eventData){
        const keys = ["when", "title", "description", "location" ,"participants"];

        let eventContent = {};

        for (let key in eventData){
            if (!keys.includes(key)){
                continue;
            }
            if (key === 'when'){
                let start = new Date(eventData.when.start_time*1000);
                let end =  new Date(eventData.when.end_time*1000);
                eventContent.start = (
                    <p className={css(styleSheet.Content)}>{start.toDateString()}, {start.toLocaleTimeString()}</p>
                );
                eventContent.end = (
                    <p className={css(styleSheet.Content)}>{end.toDateString()}, {end.toLocaleTimeString()}</p>
                );
            }else if (key ==='participants'){
                let content;
                if (eventData.participants && eventData.participants.length!==0){
                    content = eventData.participants[0].email;  //events created in-app can't have more than one participant
                }else{
                    content = ""
                }
                eventContent[key] = (
                            <p>{content}</p>
                )
            }else{
                let content;
                if(!eventData[key]){
                    content = "";
                }else{
                    content = eventData[key];
                }
                eventContent[key] = (
                        <p className={css(styleSheet.Content)}>{content}</p>
                )
            }

        }


        return eventContent;
    }

    render()
    {
        let eventContent = this.getTextContent(this.state.eventData);

        return (
            <Flexbox styles={styleSheet.Event} direction='column' >
                <Header justifyContent = 'center' medium styles={styleSheet.Header}>
                    {eventContent.title}
                </Header>
                <TextDisplay label='What:' content={eventContent.description}/>
                <TextDisplay label='Start:' content={eventContent.start}/>
                <TextDisplay label='End:' content={eventContent.end}/>
                <TextDisplay label='Where:' content={eventContent.location}/>
                <TextDisplay label="Invited:"
                             content={eventContent.participants}/>

            </Flexbox>
        )
    }

}


export default Event
