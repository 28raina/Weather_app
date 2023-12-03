import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';
import { red } from '@mui/material/colors';

export default function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
 const API_URL = "https://api.openweathermap.org/data/2.5/weather";
 const API_KEY = "29ad0c274613cd426356e2fb5ceffe26";

 let getWeatherInfo= async()=>{
    try{
        let response = await fetch( `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelslike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description
        }
        console.log(result);
        return result;
    } catch(err){
      throw err;
    }
    }

    let handleChange = (event)=>{
        setCity(event.target.value)
    }

    let handleSubmit= async (event)=>{
        try{
            event.preventDefault();
            console.log(city);
            setCity("");
          let newInfo = await getWeatherInfo();
          updateInfo(newInfo)
        } catch(err){
            setError(true)
        }
           }
    return(
        <div className='searchBox'>
         <form onSubmit={handleSubmit}>
           <TextField id="standard-basic" label="City Name" variant="standard" required value={city} onChange={handleChange}/>
           <br /><br />
           <Button variant="contained" type="submit">
           Send
           </Button>
           {error && <p style={{color:"red"}}>No such place exists</p>}
         </form>
        </div>
    )
}