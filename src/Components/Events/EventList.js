import e from 'cors';
import React,{useEffect,useState} from 'react';
import majorImg from '../../images/major.svg';
import minorImg from '../../images/minor.svg';
import axios from 'axios'

function Major(props){

    return  <img className="event-img" src={majorImg}></img>
  }
  
  function Minor(props){
  
      return  <img className="event-img" src={minorImg}></img>
  }

  
function Image(props){

    if(props.category === "Major"){
        console.log("major")
        return <Major></Major>
    }
    else{
        console.log("minor")
        return <Minor></Minor>
    }
}

function EventList(props) {

    const [eventStateModal,setEventStateModal] = useState({
        class: "no-display",
        bool:false
    })
    const [eventDeleteState,setEventDeleteState] = useState({
        class: "no-display",
        bool:false
    })
    function handleSettingEventModal(){
        if(!eventStateModal.bool){

            setEventStateModal({ 
            class: "event-setting-modal",
              bool:true })
        }
        else{
            setEventStateModal({ 
                class: "no-display",
                  bool:false 
            })
        }
    }
    function handleDeleteModal(){

        if(!eventDeleteState.bool){
            setEventDeleteState({ 
                class:'delete-event-confirmation',
                bool:true
            })
        }
        else{
            setEventDeleteState({ 
                class:'no-display',
                bool:false
            })

        }

    }

    function deleteEvent(){
        sendDeletedEvent(props); // send item to delete . function can be find in the lowest part
    }
    return (
        <li className="event-list" key={props.listkey}>
            <div className={eventStateModal.class}>
                <div className="event-setting-command">
                <i className="fa fa-pencil-square-o good-text" aria-hidden="true"></i>
                <i className="fa fa-trash danger-text" aria-hidden="true" onClick={handleDeleteModal}></i>
                </div>
            </div>
            <div className={eventDeleteState.class}>
                <div className="event-del-confirmation">
                <p>Are you sure you want to delete this data? this process cannot be undone.</p>
                </div>
                <div className="delete-event-buttons">
                    <button className="btn danger" onClick={deleteEvent}>Confirm</button>
                    <button className="btn cancel-btn" onClick={handleDeleteModal}>Cancel</button>
                </div>
            </div>
            <div className="event-title-category-wrapper">
            <div className="event-title-wrapper">
                <div className="event-title">
                    <span>{props.event.eventName}</span>
                </div>
            </div>
            <div className="event-category-wrapper">
                <div className="event-category">
                <span>{props.event.category}</span>
                </div>
            </div>
            </div>
            <div className="event-img">
           {/*<Image category={props.event.category}></Image>*/}
            </div>
            <i className="fas fa-cog settings-icon event-setting" onClick={handleSettingEventModal}></i>
        </li>
    );
}



export default EventList;

function sendDeletedEvent(props) {
    axios.delete(`http://localhost:9000/game/delete/${props.event.eventId}`).then(resp => {
        if (resp.status === 200) {
            props.setMessage(resp.data, "Success Operation", "good-text", "good");
        }
        else {
            props.setMessage(resp.data, "Failed Operation", "danger-text", "danger");
        }
        props.showMessage();

        setTimeout(() => {
            props.closeMessage();
        }, 2000);
        props.reset();
    });
}
