import React,{useState,useEffect}from 'react';
import EventScoreForm from './EventScoreForm'
import axios from 'axios'






function ScoreList(){

  return (
    <li className="event-list">
    <div className="event-title-category-wrapper">
    <div className="event-title-wrapper">
        <div className="event-title">
            <span></span>
        </div>
    </div>
    <div className="event-category-wrapper">
        <div className="event-category">
        <span></span>
        </div>
    </div>
    </div>
    <div className="event-img">
   {/*<Image category={props.event.category}></Image>*/}
    </div>
</li>
  )
}

function EventScore(props) {
    const [teams,setTeams] = useState([])
    const [games,setGames] = useState([])
    const [scoredTeam, setScoredTeam]  = useState([{}])
    const [fetchCount, setFetchCount] = useState(0)
  
    useEffect(()=>{
        
      props.displayLoading()
        async function getTeams(){
           const data = await axios.get('http://localhost:9000/team');
            
            return data;
        }
        getTeams().then(response=>{
           const arrayOfEvents= response.data[0].games.map(game=>{
             props.hideLoading();
              return game;
            })
          
            setGames(arrayOfEvents)
            setTeams(response.data)

        }).catch(err=>{
            if(err) console.error(err)
            props.hideLoading();
        })
            
        
    },[fetchCount])

    function getScoredTeamBasedOnGame(){
      teams.forEach(team => {
        team.games.forEach(game=>{
          console.log(game)
        })
      })
    }

    function reset(){
      setFetchCount(prevState=>prevState + 1);
    }
    return (
        <div>
        <div className="no-dsiplay">
        </div>
        <div className="teams-title">
          <span>Event</span>
        </div>
      <div className="events">
        <div className="event-form-wrapper">
         <EventScoreForm teams={teams} games={games} displayLoading={props.displayLoading} hideLoading={props.hideLoading} 
         setMessage={props.setMessage} showMessage={props.showMessage} closeMessage={props.closeMessage} reset={reset}></EventScoreForm>
        </div>
        <div className="event-lists">
          <div><select onChange={getScoredTeamBasedOnGame}>
            <option value="">Select team</option>
            {games.map(game=>{
                return <option key={game.gameId}value={game.gameId}>{game.gameName}</option>
            })}
            </select></div>
        <ul>
        {/*map here */}
          </ul>
        </div> 
      </div>
      </div>
    );

    
}

export default EventScore;