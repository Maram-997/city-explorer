import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        chooseCity: ''
    }
    }
    selectedWeather = async (event) => {
    event.preventDefault();
     await  this.setState({
        chooseCity:event.target.chosenCity.value
    })
    
    let  weatherUrl = `http://localhost:3001/weather?cityName=${this.state.chooseCity}`
    let forecast = await axios.get(weatherUrl);
    console.log(forecast);
    await this.setState({
        weatherInfo: forecast.data

    })
   }

    
 

    
    
    render() {
        return (
            <>
                <p>Choose one of those cities to preview it's Weather Forecast (Paris, Seattle, Amman )<br/>
                and fill in the following box area:</p>
                <form onSubmit={this.selectedWeather} >
                    <input type="text" placeholder="city" name="chosenCity"  />
                    <input type="submit" value="Explore"  />
                    <p>City Forecast: {this.state.weatherInfo}</p>

                </form>
            </>
        )
    }

}

export default Weather;