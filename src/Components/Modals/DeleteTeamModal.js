import axios from 'axios'


function DeleteTeamModal(props) {


    function deleteData(){
        deleteTeam(props, showCloseMessage)// delete team function, can be find in the lowest part
      
    }
    return (
        <div className="delete-team-modal">
            <div className="modal-title">
                <span>Delete Confirmation</span>
            </div>
            <div className="delete-team-message">
            <p>Are you sure you want to delete this data? This process cannot be undone.</p>
            </div>
            <div className="delete-team-buttons">
                <button className="confirm-btn btn danger" onClick={deleteData}>Confirm</button>
                <button onClick={props.changeParent} className="cancel-btn btn">Cancel</button>
            </div>
        </div>
    );

    function showCloseMessage(TIME_FOR_CLOSING_MESSAGEBOX) {
        props.showMessageDialog();
        setTimeout(() => {
            props.closeMessageDialog();
        }, TIME_FOR_CLOSING_MESSAGEBOX);
        props.reset();
    }
  }
  
  export default DeleteTeamModal;

function deleteTeam(props, showCloseMessage) {
    const TIME_FOR_CLOSING_MESSAGEBOX = 2000; //2 seconds
    axios.delete(`http://localhost:9000/team/delete/${props.teamId}`).then(resp => {
        if (resp.status === 200) {
            props.setMessage(resp.data, "Success Operation", "good-text", "good"); //setting for message dialog if response is good
        }
        else {
            props.setMessage(resp.data, "Failed Operation", "danger-text", "danger"); //setting for message dialog if response is bad
        }
        showCloseMessage(TIME_FOR_CLOSING_MESSAGEBOX);
    });

}


  