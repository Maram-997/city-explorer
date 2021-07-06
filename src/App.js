import React from 'react';
import axios from 'axios';
import Weather from './components/weather';

class App extends React.Component{
 
  constructor(props){
   super(props);
   this.state={
     cityInfo:{},
     info:'',
     visibility: false,

  }
 }



 readingData  = async (event)=>{
  event.preventDefault();
  // to update the value from the constructor as the user requested data
 await this.setState({
 info:event.target.cityInfo.value
  })

 

 let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.info}&format=json`;
 // axios.get will send a request to the API and get the data, this data will be stored in resData
 // axios needs time as this.setState so we will use the promises (async/ await)
 let resData = await axios.get(url);
 
 // to update the cityname and it's information from the recived data (API's Data)
await this.setState({
  cityInfo:resData.data[0],
  visibility:true,
})
 }



  render(){
    return(
      <>
      <h1>City Explorer</h1>
      <form onSubmit={this.readingData}>
     <input type="text" placeholder="City Name" name="cityInfo"/>
     <input type="submit" value="View Reuslt" />
      </form>
      <p>About The City: <br/>
     City Name: {this.state.cityInfo.display_name} <br/>
     City Lat: {this.state.cityInfo.lat} <br/>
     City Lon: {this.state.cityInfo.lon} <br/>
      </p>
      {this.state.visibility && < img alt="map" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityInfo.lat},${this.state.cityInfo.lon}&zoom=10`} /> }
      
      </>
    )
  }
}



export default App;