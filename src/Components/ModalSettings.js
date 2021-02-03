import React, { useState,useEffect,useRef} from 'react';
import DeleteTeamModal from './Modals/DeleteTeamModal'
import UpdateTeamModal from './Modals/UpdateTeamModal'
import CardProfile from './Team/CardProfile'
function ModalSettings(props) {

const [modalState,setModalState]= useState({
    class: "settings-modal no-display", //modal state for settings class
    bool: false
})
const [deleteState,setDeleteModalState]= useState({
    class: "modal-container no-display",    //delete state modal class for warning 
    bool: false
})
const [updateState, setUpdateModalState] = useState({
    class: "update-modal-container no-display", // updatestate class for form
    bool: false
})

function handleModal(){
    //function for closing and opening settings modal
    if(!modalState.bool) //if close
        setModalState({
            class: "settings-modal",
            bool: true  
    })
    else{
        setModalState({ //if open
            class: "settings-modal no-display",
            bool: false
        })
    }
}
function handleUpdateModal(){
       //function for closing and opening update modal
    if(!updateState.bool){
        setUpdateModalState({
            class: "update-modal-container ",
            bool: true,
        })
    }
        else{
            setUpdateModalState({ //if open
                class: "no-display",
                bool: false,
            })
        }
    }

function handleDeleteModal(){
        //function for closing and opening delete modal
    if(!deleteState.bool){
        setDeleteModalState({
            class: "modal-container",
            bool: true
        })
    }
    else{
        setDeleteModalState({ //if open
            class: "modal-container no-display",
            bool: false
        })
    }
}

    return (
        <div>
        <div className={deleteState.class}>
            <DeleteTeamModal reset={props.reset} showMessageDialog={props.showMessageDialog} closeMessageDialog={props.closeMessageDialog}setMessage={props.setMessage}changeParent={handleDeleteModal} name={props.name} teamId={props.teamId}></DeleteTeamModal>
        </div>
        <div className={updateState.class}>
        <UpdateTeamModal reset={props.reset} showMessageDialog={props.showMessageDialog} closeMessageDialog={props.closeMessageDialog}setMessage={props.setMessage}changeParent={handleUpdateModal} name={props.name} teamId={props.teamId}></UpdateTeamModal>
        </div>
        <div className="card-bg">
        <div className={modalState.class}>
        <ul class="setting-lists">
        <li className="update" onClick={handleUpdateModal}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></li>
        <li className="delete" onClick={handleDeleteModal}><i class="fa fa-trash" aria-hidden="true"></i></li>
        </ul>
         </div>
        <div className="settings">
        <i className="fas fa-cog settings-icon" onClick={handleModal}></i>
     </div>
    <CardProfile name={props.name}></CardProfile>
    </div> 
    </div>


 
);
  
} 
  export default ModalSettings;
  