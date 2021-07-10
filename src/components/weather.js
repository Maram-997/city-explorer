import React from 'react';

class Weather extends React.Component {

    
    render() {
        return (
            <>
 
                    { this.props.visibilityForWeather &&
                    this.props.weatherInfo.map(element => <>
                     <p>{element.date}</p>
                     <p>{element.description}</p>

                    </>)}
                     
                
            </>
        )
    }

}

export default Weather;