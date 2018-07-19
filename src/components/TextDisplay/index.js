import React from 'react';
import Flexbox from "../Flexbox";
import {css, StyleSheet} from "aphrodite/no-important";
const styleSheet = StyleSheet.create({
  Label: {
    color: 'grey',
    textAlign:'left',
    width:150,
  }
});

type Props ={
    label: string,
    content: any,
    type:string
}

export default function TextDisplay(props:Props){

    return(
        <Flexbox direction ='row' >
            <p className={css(styleSheet.Label)}>{props.label}</p>
            {props.content}
        </Flexbox>



    )
}
