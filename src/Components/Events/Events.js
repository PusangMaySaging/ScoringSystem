import EventForm from './EventForm'
import EventList from './EventList'
import React, { useState,useEffect} from 'react';
import axios from 'axios'

 

function Event(props) {
  
  const [events,setEvent]= useState([]);
  const [fetchCount,setFetchCount] = useState(0);
  
  useEffect(()=>{
      async function getEvents(){
        props.displayLoading()
        const data = await  axios.get('http://localhost:9000/game');
        return data
      }
      getEvents().then(resp =>{
        setEvent(resp.data);
        props.hideLoading()
      }).catch(err=>{
        props.hideLoading()
        console.log(err)
      })

  },[fetchCount])

  function reset(){
      setFetchCount(prevState=> prevState + 1)
  }
    return (
        <div>
        <div className="no-dsiplay">
        </div>
        <div className="teams-title">
          <span>Events</span>
          <button className="btn create-btn good" className="no-display">Create Team</button>
        </div>
      <div className="events">
        <div className="event-form-wrapper">
            <EventForm showMessage={props.showMessage} reset={reset} closeMessage={props.closeMessage} setMessage={props.setMessage}></EventForm>
        </div>
        <div className="event-lists">
        <ul>
        {events.map((event,index)=>{
          return <EventList showMessage={props.showMessage} closeMessage={props.closeMessage} setMessage={props.setMessage} reset={reset}key={event.eventId} event={event} listkey={event.eventId}></EventList>  
        })}
          </ul>
        </div> 
      </div>
      </div>
    );
  }
  
  export default Event;
  