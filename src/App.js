import TeamCreator from './Components/Team/TeamCreator'
import TeamList from './Components/Team/TeamList'
import Header from './Components/Header'
import ModalMessage from './Components/Modals/ModalMessage'
import Events from './Components/Events/Events'
import React, { useState} from 'react';
import './Stylesheets/Body.css'
import './Stylesheets/Header.css'
import './Stylesheets/Team.css'
import './Stylesheets/Event.css'
import Loader from './Components/Loader'
import {BrowserRouter as Router,Route,} from "react-router-dom";
import EventScore from './Components/Events/EventScore'


function App() {


const [modalMessageState, setModalMessageState] = useState({ //state model dialogbox for settings message,title etc.
    title:" ",
    message:" ",
    classColor:" ",
    classBg: " "
})
const [loadingState,setLoadingState] = useState('loader-container no-display') //class for loading component

const [messageClass,setClass] = useState('modal-message-container no-display') // class for dialog box


function showMessage(){
  setClass('modal-message-container')
  console.log("dialog open"); //show dialog box
}
function closeMessage(){
  setClass('modal-message-container no-display')
  console.log("dialog close");//show dialog box
}
function setMessage(message,title,classColor,classBg){
   //function for settings dialog box contents
  setModalMessageState({
    title:title,
    message:message,
    classColor:classColor,
    classBg:classBg
  }) 
}
function displayLoading(){
        setLoadingState('loader-container');
          //display loading 
}
function hideLoading(){
  setLoadingState('loader-container no-display')
    //hide loading
}

  return (
   //components
    <main>
      <Header></Header>
     <Router>
     <Route path="/team">
      <TeamList displayLoading={displayLoading} hideLoading={hideLoading}showMessageDialog={showMessage} closeMessageDialog={closeMessage} setMessage={setMessage}></TeamList>
    </Route>   
    <Route path="/create">
      <TeamCreator></TeamCreator>
    </Route>
    <Route path="/events">
      <Events showMessage={showMessage} closeMessage={closeMessage} displayLoading={displayLoading} hideLoading={hideLoading} showMessageDialog={showMessage}setMessage={setMessage}></Events>
    </Route>
    <Route path="/score">
      <EventScore displayLoading={displayLoading} hideLoading={hideLoading} setMessage={setMessage} showMessage={showMessage} closeMessage={closeMessage}></EventScore>
    </Route>
     </Router>
     <ModalMessage class={messageClass} message={modalMessageState}/>
     <Loader loadingState={loadingState}></Loader>
    </main>
  );
}

export default App;
