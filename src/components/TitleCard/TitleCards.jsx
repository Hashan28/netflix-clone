import React, { useEffect, useRef, useState } from 'react'
import './TitleCard.css'
import card_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {

  const [apiData,setApiData]=useState([]);

  const cardsRef=useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWQwMDFjNmIwMDNmNGU0OWVlYjI5MWZkODA3Yjc4NCIsIm5iZiI6MTcyOTEzNTYwNi45NzE1MzQsInN1YiI6IjY3MTA4MjlkMWY5ZDBlZTRiOGM5YzkzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RBIVf8kJhE1dVT7t0Yj2Wohe9RpCszaPPEM9KOOyQog'
    }
  };
  
  
  const handleWheel=(event)=>{
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err))

    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])

  return (
    <div className='titleCard'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards