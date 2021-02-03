import React, { useState,useEffect} from 'react';


function ModalMessage(props) {
    //the modal message box mark-up
    return (
        //set className
        //setTitle
        //set message
        //setColor and Background
        <div className={props.class}> 
          <div className={`modal-message-title ${props.message.classBg}`}>
              
              <span>{props.message.title}</span>
          </div>
       <div className="modal-message-subtitle">
           <span className={props.message.classColor}>{props.message.message}</span>
       </div>
    </div>
    );
  }
  
  export default ModalMessage;
  