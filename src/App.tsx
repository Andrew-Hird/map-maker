import React, { useState } from 'react';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import GoogleMap from './components/GoogleMap';
import Locations, { Location } from './components/Locations';


const App = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  const handleLocationAdd = (location: Location) => {
    setLocations([...locations, location])
  }

  return (
    <div className="App App-header">
      <Locations handleLocationAdd={handleLocationAdd} />
      <GoogleMap locations={locations} />
    </div>
  );
}

export default App;
