import uuid from 'react-uuid'
import React, { useState,useEffect} from 'react';
import axios from 'axios'

function EventForm(props) {
    const [event,setEvent] = useState({
        gameName:' ',
    category: ' '
    });
    const [isBusy,setBusy] = useState(true)
    
    function getEventName(e){
        setEvent({
            ...event,
            gameName: e.target.value
        })
     
    }

    
    function getCategory(e){
        setEvent({
            ...event,
            category: e.target.value
        })
      
    }

    function submitEvent(e){
        e.preventDefault();
       setBusy(false)
    }
    useEffect(()=>{
        const TIME_FOR_CLOSING_MESSAGEBOX = 2000; ///2 seconds

        if(!isBusy){
            createEvent(event, props, TIME_FOR_CLOSING_MESSAGEBOX, setBusy);
        }
    },[isBusy])
    return (

        <div className="event-form-wrap">
            <div className="event-form-title">
                <span>Create Event </span>
            </div>
            <form className="event-form" onSubmit={submitEvent}>
                <div className="event-input-wrapper">
                <label>Event's name</label>
                <input type="text" name="eventName" className="event-name" onChange={getEventName}required></input>
                </div>
                <div className="event-input-wrapper">
                <label>Event's Category</label>
                <select className="event-select" name="category" onChange={getCategory}>
                    <option value=" ">Select Category</option>
                    <option value="Minor">Minor</option>
                    <option value="Major">Major</option>
                </select>
                </div>
                <div className="event-input-wrapper">
                    <button type="submit" className="btn event-btn">Create Event</button>
                </div>
            </form>
      </div>
    );
  }
  
  export default EventForm;

function createEvent(event, props, TIME_FOR_CLOSING_MESSAGEBOX, setBusy) {
    axios.post('http://localhost:9000/game/create', event).then(resp => {
        if (resp.status == 201) {
            props.setMessage(resp.data, "Success Operation", "good-text", "good");
            props.reset();
            props.showMessage();
            setTimeout(() => {
                props.closeMessage();
            }, TIME_FOR_CLOSING_MESSAGEBOX);
        }
        else {
            props.setMessage(resp.data, "Failed Operation", "danger-text", "danger");
        }

    });
    setBusy(true);
}
