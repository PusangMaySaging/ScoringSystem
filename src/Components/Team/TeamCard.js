import React, { useState,useEffect,useRef} from 'react';
import axios from 'axios'
import ModalSetting from '../ModalSettings'
function TeamCard(props) {


  const [arrayOfClasses,setArrayOfClasses]= useState(['random-profile bg1','random-profile bg2'
  ,'random-profile bg3','random-profile bg4','random-profile bg5'])//array of classes
 


  let count = -1;// starting point 

    return props.teams.map((team)=>{
      if(count == 4) count = -1;//if count is 4, set count again to -1
          count += 1 
        return (
              /* 
                  the purpose of count is for the array of classes with background images from  images folder.
                  appending the div classes with a class with a background.

              */
              <li key={team.teamId} className="team-list" >  
              <div className={arrayOfClasses[count]}></div>
                  <ModalSetting setMessage={props.setMessage }reset={props.reset} closeMessageDialog={props.closeMessageDialog} showMessageDialog={props.showMessageDialog} teamId = {team.teamId} name={team.teamName}></ModalSetting>
                <div className="card-stats">
                  <div className="card-stats-teamname ">
               <span className="card-stats-team">{team.teamName}</span>
               </div>
              <div className="card-stats-wrapper">
                <div className="card-stats-wrapper-column"> <label className="card-stats-team-score">Score</label>
               <span>0
               </span></div>
                 <div className="card-stats-wrapper-column"><label className="card-stats-team-pos">Position</label>
               <span>0
               </span></div> 
               
               </div>
              </div>
          
          </li>  
          );
        })
      
}
  
  export default TeamCard;
  