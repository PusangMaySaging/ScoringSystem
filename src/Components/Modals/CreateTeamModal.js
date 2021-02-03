import axios from 'axios'
import React, { useState,useEffect,useRef} from 'react';
import uuid from 'react-uuid'

function CreateTeamModal(props) {
    const [team,setTeam] = useState({//form state
        teamId: ' ',
        teamName: ' '
      })
      const [isReadyToSend,setReady] = useState(false)//if form is ready to send State
      function inputHandler(event){
        setTeam({...team,teamName:event.target.value})
      }

      function submitForm(e){//submit function
          e.preventDefault();
          const id = uuid()
          setTeam(prevState => {
              return{
                  ...prevState,//onChange
                  teamId:id
              }
          })
        setReady(true)// onclick submit isReady state will become true so that useEffect will executed
      }
      useEffect(()=>{
        
        const TIME_FOR_CLOSING_MESSAGEBOX = 2000; ///2 seconds
        if(isReadyToSend){ 
          createTeam(props, team, TIME_FOR_CLOSING_MESSAGEBOX, setReady);//set isReadyState back to false(not ready) | this function can be find in the lowest part
        };
      },[isReadyToSend])
      

    return (
        <div className="create-modal-container">
        <div className="update-team">
        <div className="modal-title update-modal">
          <span>Create Team</span>
        </div>
        <form className="modal-update-form" onSubmit={submitForm}>
        <div className="update-team-form-wrapper">
              <label htmlFor="teamName">Team's name </label>
            <input type="text" name="teamName" className="update-form-input" onChange={inputHandler} required></input>
          </div>
          <div>
              <button type="submit" className="btn good">Create</button>
              <button type="button" className="btn cancel-btn margin" onClick={props.changeParent} >Cancel</button>
          </div>
        </form>
    </div>
    </div>
    );
  }
  
  export default CreateTeamModal;

function createTeam(props, team, TIME_FOR_CLOSING_MESSAGEBOX, setReady) { // createTeam Function
  props.openCreateTeamModal();
  axios.post('http://localhost:9000/team/create', team).then(resp => {
    props.reset();
    if (resp.status === 201) {
      props.setMessage(resp.data, "Success Operation", "good-text", "good"); //settings for Dialog box message if response is good
    }
    else {
      props.setMessage(resp.data, "Failed Operation", "danger-text", "danger"); //setting for Dialog box if response is bad
    }
    showThenCloseMessage(props, TIME_FOR_CLOSING_MESSAGEBOX);

  });
  setReady(false);
}

function showThenCloseMessage(props, TIME_FOR_CLOSING_MESSAGEBOX) {
  props.showMessageDialog(); //show message dialog 
  setTimeout(() => {
    props.closeMessageDialog(); // close dialog after 2 seconds
  }, TIME_FOR_CLOSING_MESSAGEBOX);
}
  