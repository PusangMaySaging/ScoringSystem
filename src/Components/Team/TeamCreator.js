import uuid from 'react-uuid'
import React, { useState,useEffect} from 'react';
import axios from 'axios'
function TeamCreator() {
  /*this is the first form to create team. same as createTeamModal.js
  */
    const [team, setTeam] = useState({
        teamId:" ",
        teamName:" "
    })
    const [isReadyToSend,setReady] = useState(false)
    function inputListener(event){
       setTeam({...team, teamName: event.target.value})
    }
    const id = uuid()
    function submitForm(event){ 
        event.preventDefault()
        setTeam(prevState => {
            return{
                ...prevState,
                teamId: id
            }
        })
        setReady(true)
    }
    useEffect(()=>{
      if(isReadyToSend) axios.post('http://localhost:9000/team/create',team);
        setReady(false)
    },[isReadyToSend,team])
    
    return (
      <div>
        <form onSubmit={submitForm}>
     <div className = "form-group">
       <label htmlFor="team">Team name</label>
       <input type="text" className="team" name="team" onChange={inputListener}></input>
     </div>
     <div className="form-group">
       <button type="submit">Create Team</button>
     </div>
    </form>
      </div>
    );
  }
  
  export default TeamCreator;
  