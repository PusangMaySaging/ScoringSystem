import React, { useState,useEffect} from 'react';
import TeamCard from './TeamCard'
import CreateTeamModal from '../Modals/CreateTeamModal'
import axios from 'axios'

function TeamList(props) {
  const [teams,setTeams] = useState([])//list of teams 
  const [fetchStateCount,setFetchStateCount] = useState(0)// for reset 

  const [createModalState,setCreateModalState] = useState({
    class: 'create-modal no-display', //createmodel state class will be appended to class of create team modal form in order to display
    bool: false
})

const [teamListClass,setTeamListClass] = useState('')//teamlistClass state will be appended to the parent div of team div 
                                                    //to add background to the div when the container is empty
function openCreateTeamModal(){                 
  //function responsible for opening and closing logic of create team form
    if(!createModalState.bool){
        setCreateModalState({
            class:'create-modal',
            bool: true
        })
    }
    else{
        setCreateModalState({
            class:'create-modal no-display',
            bool: false
        })
    }
}

useEffect(()=>{
async function getTeams(){//fetching data from database 
    props.displayLoading() // show loadingScreen
    const data = await axios.get('http://localhost:9000/team') 
    return data
}
  
getTeams().then(resp=>{
  props.hideLoading()//hide loading after promise is fulfilled
  console.log("set")
  setTeams(resp.data) //set state of teams from database
}).catch((err)=>{
  props.hideLoading()
  console.error("Something bad happened")
});

},[fetchStateCount])

function reset(){
  setFetchStateCount(prevState=> prevState + 1)//nothing important. function to be called when you want to fetch data again
}

useEffect(()=>{  
  if(teams.length === 0){
    setTeamListClass('teams empty-bg')// if there is no data set TeamListClass state to this value
  }
  else{
    setTeamListClass('teams') //if there is data
  }
},[teams])

  //components
  return (
    <div>
      <div className={createModalState.class}>
        <CreateTeamModal openCreateTeamModal={openCreateTeamModal} setMessage={props.setMessage} reset={reset} showMessageDialog={props.showMessageDialog} closeMessageDialog={props.closeMessageDialog}changeParent={openCreateTeamModal}></CreateTeamModal>
      </div>
      <div className="teams-title">
        <span>Teams</span>
        <button className="btn create-btn good" onClick={openCreateTeamModal}>Create Team</button>
      </div>
    <div className ={teamListClass}>
      <ul className="team-lists">
     <TeamCard reset={reset} setMessage={props.setMessage} closeMessageDialog={props.closeMessageDialog}showMessageDialog={props.showMessageDialog}teams={teams} />
     </ul>
    </div>
    </div>
  );
}

export default TeamList;
