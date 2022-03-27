import React, { useRef, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import GoogleMap from "./components/GoogleMap";
import Locations, { Location } from "./components/Locations";
import Download from "./components/Download";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  flex-basis: 30%;
  text-align: center;
`;

const App = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  const handleLocationAdd = (location: Location) => {
    setLocations([...locations, location]);
  };

  return (
    <AppContainer className="App App-header">
      <LeftContainer>
        <Locations handleLocationAdd={handleLocationAdd} />
        <Download mapRef={mapRef} />
      </LeftContainer>
      <GoogleMap locations={locations} mapRef={mapRef} />
    </AppContainer>
  );
};

export default App;
