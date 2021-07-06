import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        chooseCity: '',
        weatherInfo:[],
        date:'',
        description:''

    }
    }
    selectedWeather = async (event) => {
    event.preventDefault();
     await  this.setState({
        chooseCity:event.target.chosenCity.value
    })
    
    let  weatherUrl = `https://marams-city-explorer.herokuapp.com/weather?cityName=${this.state.chooseCity}`
    let forecast = await axios.get(weatherUrl);
    console.log(forecast.data);
    await this.setState({
        weatherInfo: forecast.data,
        date:forecast.data.date,
        description:forecast.data.description 

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
                    <>City Forecast: {this.state.weatherInfo.map(element => {
                        return(
                             <>
                                <p> {element.date}</p>
                                <p> {element.description}</p>
        
                            </>
                        )
                    } )}
                    </>
                     
                </form>
            </>
        )
    }

}

export default Weather;