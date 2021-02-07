import React, { Component } from 'react';

 
class BingMap extends Component {
  render(){
    return (
    <BingMapsReact
      bingMapsKey=""
      height="500px"
      mapOptions={{
        navigationBarMode: "square"
      }}
      width="500px"
      viewOptions={{
        center: { latitude: 42.360081, longitude: -71.058884 },
        mapTypeId: "grayscale"
      }}
    />
  );
}
}

export default BingMap