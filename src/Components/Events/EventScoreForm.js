import React,{useState,useEffect} from 'react';
import axios from 'axios'





function EventScoreForm(props) {


    const [score,setScore] = useState({})
    const [isBusy,setBusy] = useState(true)

    function handleTeam(event){
        console.log(event.target.value)
        setScore({...score,teamId: event.target.value})
    }
    
    function handleEvent(event){
        console.log(event.target.value)
        setScore({...score,gameId: event.target.value})
    }
    
    function handleScore(event){
        console.log(event.target.value)
        setScore({...score,score: event.target.value})
    }
    
    function handleRemark(event){
        console.log(event.target.value)
        setScore({...score,remarkScore: event.target.value})
    }
    
    function handleRemarkDescription(event){
        console.log(event.target.value)
        setScore({...score,remarkDesc: event.target.value})
    }
    function handleParticipation(event){
        console.log(event.target.value)
        setScore({...score,participation:event.target.value})
    }
    function submitScore(e){
        e.preventDefault()
        setBusy(false)
    }
    useEffect(()=>{
        const TIME_FOR_CLOSING_MESSAGEBOX = 2000 // 2 seconds
        console.log("submitted form")
            if(isBusy === false){
                axios.put('http://localhost:9000/score/create',score).then(resp=>{
                    props.reset()
                    if(resp.status === 200){
                        props.setMessage(resp.data,"Successful Operaion","good-text","good")
                    }else{
                        props.setMessage(resp.data,"Failed Operation","danger-text","danger")
                    }
                    props.showMessage();
                    setTimeout(()=>{
                        props.closeMessage()
                    },TIME_FOR_CLOSING_MESSAGEBOX)
                })
            }
        setBusy(true)
    }, [isBusy])
 
    return (
        <div className="event-form-wrap event-score">
        <div className="event-form-title">
            <span>Score Event</span>
        </div>
        <form className="event-form event-score-form" onSubmit={submitScore}>
           
            <div className="event-input-wrapper">
            <label>Select team</label>
            <select className="event-select" name="category" onChange={handleTeam}>
                <option value=" ">Select team</option>
                {props.teams.map(team=>{
                    return <option key={team.teamId} value={team.teamId}>{team.teamName}</option>
                })}
            </select>
            </div>
            <div className="event-input-wrapper">
            <label>Select event</label>
            <select className="event-select" name="category" onChange={handleEvent}>
            <option value=" ">Select event</option>
                 {props.games.map(game=>{

                    return <option key={game.gameId} value={game.gameId}>{game.gameName}</option>
                })}
            </select> 
            </div>
            <div className="event-input-wrapper">
            <label>Score</label>
            <input type="number" name="eventName" className="event-name" min="0"required onChange={handleScore}></input>
            </div>
            <div className="event-input-wrapper">
            <label>Remarks</label>
            <input type="number" name="eventName" className="event-name" required min="0" onChange={handleRemark}></input>
            </div>
            <div className="event-input-wrapper">
            <label>Remark's description</label>
            <textarea id="w3review" name="w3review" rows="4" cols="50" onChange={handleRemarkDescription}></textarea>
            </div>
            <div className="event-input-wrapper">
            <label>Select participation</label>
            <select className="event-select" name="category" onChange={handleParticipation}>
                <option value=" ">Select Participation</option>
                <option value="Minor">No Participation</option>
                <option value="Major">Participated</option>
            </select>
            </div>
            <div className="event-input-wrapper">
                <button type="submit" className="btn event-btn">Score team</button>
            </div>
        </form>
  </div>
    );
}

export default EventScoreForm;