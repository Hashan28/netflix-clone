import React, { useEffect, useState } from 'react'
import './Player.css'
import backarrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} =useParams();
  const navigate= useNavigate();

  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at: "",
    typeof:""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWQwMDFjNmIwMDNmNGU0OWVlYjI5MWZkODA3Yjc4NCIsIm5iZiI6MTcyOTEzNTYwNi45NzE1MzQsInN1YiI6IjY3MTA4MjlkMWY5ZDBlZTRiOGM5YzkzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RBIVf8kJhE1dVT7t0Yj2Wohe9RpCszaPPEM9KOOyQog'
    }
  };

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));

  },[])
  


  return (
    <div className='player'>
      <img src={backarrow_icon} onClick={()=>{navigate(-2)}} alt="" />
      <iframe width='90%' height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`} 
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player