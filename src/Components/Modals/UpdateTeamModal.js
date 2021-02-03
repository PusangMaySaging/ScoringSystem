import React, { useState,useEffect,useRef} from 'react';
import axios from 'axios'

function UpdateTeamModal(props) {


    const [name,setName] = useState(" ")
    function handleInput(event){
    setName(event.target.value)
    }
    async function submitForm(event){
        event.preventDefault()
        const obj =  await {
            teamId: props.teamId,
            teamName:name
    }
        UpdateTeam(obj, props); // updateTeam function can be found in the lowest part
    }
        return (
              <div className="update-team">
                  <div className="modal-title update-modal">
                    <span>Update Team</span>
                  </div>
                  <form className="modal-update-form" onSubmit={submitForm}>
                <div className="update-team-form-wrapper">
                        <label htmlFor="teamName">Team's new name </label>
                      <input type="text" name="teamName" className="update-form-input" onChange={handleInput} required></input>
                    </div>
                    <div>
                        <button type="submit" className="btn good">Update</button>
                        <button type="button" className="btn cancel-btn margin" onClick={props.changeParent}>Cancel</button>
                    </div>
                  </form>
              </div>
          );
       
      
}
  
  export default UpdateTeamModal;

function UpdateTeam(obj, props) {
  axios.patch('http://localhost:9000/team/update', obj).then(resp => {
    props.reset();
    if (resp.status === 200) {
      props.setMessage(resp.data, "Success Operation", "good-text", "good"); // setting for dialog box if response is good
    }
    else {
      props.setMessage(resp.data, "Failed Operation", "danger-text", "danger"); //settings for dialog box if response is bad
    }
    props.showMessageDialog(); //show dialog box
    setTimeout(() => {
      props.closeMessageDialog(); //disable dialog box after 2 seconds
    }, 2000);
  });
}
  