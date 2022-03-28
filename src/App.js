import  { useEffect, useState } from 'react';
import './App.css';
import Clear from './assests/clear.jpg'
import Cloudy from './assests/cloudy.jpg'
import Snow from './assests/snow.jpg'
import Overcast from './assests/overcast.jpg'
import Rainy from './assests/rainy.jpg'

import SearchIcon from '@mui/icons-material/Search';

function App() {
  const [place, setPlace] = useState('new york');

  const [placeInfo, setPlaceInfo] = useState({});

  useEffect (() => {
    handleFetch();
  }, [])

  const handleFetch = () => {
    fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=751cae840ec34ef083c152653222703&q=${place}&days=1&aqi=no&alerts=no`
    ) 
  .then(response => response.json())
  .then(data => setPlaceInfo({
    name: data.location.name,
    country: data. location.country,
    farenheit: {
      current: data.current.temp_f,
      high: data.forecast.forecastday[0].day.maxtemp_f,
      low: data.forecast.forecastday[0].day.mintemp_f,
    },
    condition: data.current.condition.text
     })
    );
    setPlace("");
  };

  console.log(placeInfo)

  return (

   
    <div className="app"
    style={
        placeInfo.condition?.toLowerCase() === "clear" ||
        placeInfo.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${Clear})` }
          : placeInfo.condition?.includes("cloudy")
          ? { backgroundImage: `url(${Cloudy})` }
          : placeInfo.condition?.toLowerCase().includes("rainy")
          ? { backgroundImage: `url(${Rainy})` }
          : placeInfo.condition?.toLowerCase().includes("snow")
          ? { backgroundImage: `url(${Snow})` }
          : { backgroundImage: `url(${Overcast})` }
      }
    > 
    
   
    
      <div className="search-input">
        <input className='Input'  type="text" value={place} onChange={(e) => setPlace(e.target.value)}/>

        <SearchIcon onClick ={handleFetch} fontSize="large" className=" search-button"/>

        {/* <button onClick ={handleFetch} className="SearchButton">Search</button> */}
      </div>


      <div className="weather-container">
        <div className="top-part">
          <h1>{placeInfo.farenheit?.current}&deg;F</h1>
          <div className='Condition'>
            <h1>{placeInfo.condition}</h1>
            <h1>{placeInfo.farenheit?.high}&deg;F</h1>
            <h1>{placeInfo.farenheit?.low}&deg;F</h1>
          </div>
        </div>
        <div className='Name'>
           <h2>{placeInfo.name}, {placeInfo.country}</h2>
        </div>

       
      </div>

    
    </div>
   

  );
}

export default App;
