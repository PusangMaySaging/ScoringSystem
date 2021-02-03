import React, { useState,useEffect} from 'react';


function CardProfile(props) {
    const [profileInititals,setProfileInitials] = useState('')//profile initials state


    useEffect(()=>{
        let newString
        if (props.name.split(" ").length > 1) {//check if words is greater than 2
            let values = props.name.split(" ");//returns an array
            let word1 = values[0]//put first word here
            let word2 = values[1]//put second word
            newString = `${word1.charAt(0)} ${word2.charAt(0)} `.toUpperCase()//append the first character of words from word 1 and word 2
        }
        else{
            // if one word
            newString = `${props.name.charAt(0)} ${[props.name.charAt(props.name.length - 1)]} `.toUpperCase() 
            // append the character of first and
            // last character from word
        }
        
        setProfileInitials(newString, newString)//setInitials of profile from built String 'newString'
        
    },[props.name])
    return (
      <>
       <div className="card-profile">
           <span className="card-profile-name">{profileInititals}</span>
       </div>
      </>
    );
  }
  
  export default CardProfile;
  