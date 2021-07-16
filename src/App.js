import React from 'react';
import axios from 'axios';
import Weather from './components/weather';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movies from './components/movies';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityInfo:{},
      weatherInfo: [],
      visibility: false, // for the map
      visibilityForWeather: false,
      moviesInfo: [],
      visibilityForMovies: false,
      cityName: ''
    }
  }




  readingData = async (event) => {
    event.preventDefault();
    // to update the value from the constructor as the user requested data
    await this.setState({
      cityName: event.target.cityName.value.toLowerCase()
    })



    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.cityName}&format=json`;
    // axios.get will send a request to the API and get the data, this data will be stored in resData
    // axios needs time as this.setState so we will use the promises (async/ await)
    let resData = await axios.get(url);
    // to update the cityname and it's information from the recived data (API's Data)
    await this.setState({
      cityInfo: resData.data[0],
      visibility: true,
    })
    this.getWeather();  
    this.getMovies();
  }

  getWeather = async () => {
    const city = this.state.cityName.charAt(0).toUpperCase() + this.state.cityName.slice(1);

    let weatherUrl = `https://marams-city-explorer.herokuapp.com/weather?cityName=${city}`
    let forecast = await axios.get(weatherUrl);
    await this.setState({
      weatherInfo: forecast.data,
      visibilityForWeather: true

    })
  }




  getMovies = async () => {
    const city = this.state.cityName.charAt(0).toUpperCase() + this.state.cityName.slice(1);
    let moviesUrl = `https://marams-city-explorer.herokuapp.com/movie?cityName=${city}&format=json`
    let moviesRes = await axios.get(moviesUrl);
    await this.setState({
      moviesInfo: moviesRes.data,
      visibilityForMovies: true

    })
console.log(this.state.moviesInfo, this.state.visibilityForMovies)



  }
  render() {
    return (
      <>
        <h1>City Explorer</h1>


        <Form onSubmit={this.readingData}>



          <Form.Group controlId="searchQuery">

            <Form.Label> Choose City and fill it with the following box area to display it's weather and movie:</Form.Label>
            <Form.Control type="text" placeholder="City Name" name="cityName" />
          </Form.Group>
          <Button type="submit" >Explore</Button>
        </Form>
        
              <>
                {<p>About The City: <br />
                  City Name: {this.state.cityInfo.display_name} <br />
                  City Lat: {this.state.cityInfo.lat} <br />
                  City Lon: {this.state.cityInfo.lon} <br />
                </p>}

                {this.state.visibility && < img alt="map" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityInfo.lat},${this.state.cityInfo.lon}&zoom=10`} />}
              </>

           
            <Weather visibilityForWeather={this.state.visibilityForWeather}  weatherInfo={this.state.weatherInfo}/>
            {this.state.moviesInfo.map(movie => {
              return (    <Movies visibilityForMovies={this.state.visibilityForMovies}   movie = {movie} />
                )
            })}

        
        
        




      </>
    )
  }

}
export default App;