import React, { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import { Location } from "./Locations"
import markerIcon from "../img/map-pin.svg"

const center = { lat: -40.9006, lng: 174.8860 }
const zoom = 5;

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>
};

interface MyMapComponentProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
    locations: Location[]
}

const MyMapComponent = ({
  center,
  zoom,
  locations,
}: MyMapComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  // set map and marker
  useEffect(() => {
    if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {
            center, 
            zoom,
            styles: [
                {
                    "elementType": "labels",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                },
            ],
        }));
    }
  }, [ref, map, center, zoom]);

  // set markers and directions on map
  useEffect(() => {
    if (map) {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({ 
            suppressMarkers: true, 
            polylineOptions: {
                strokeColor: "#4c98f0",
                strokeWeight: 6,
                strokeOpacity: 0.8,
            } 
        });

        directionsRenderer.setMap(map);

        // set markers
        locations.forEach((location) => {
            const lat = parseFloat(location.lat)
            const lng = parseFloat(location.lng)
    
            new window.google.maps.Marker({
                position: { lat, lng },
                map,
                label: {
                    text: location.name,
                    className: "marker-label"
                },
                icon: {
                    url: markerIcon,
                    scaledSize: new google.maps.Size(25, 25)
                }
            })
        })

        // set directions
        if (locations.length > 1) {
            const locs = [...locations]

            const origin = locs.shift()
            const destination = locs.pop()
            const waypoints = locs.map(loc => ({stopover: true, location: `${loc.lat},${loc.lng}`}))

            directionsService.route({
                origin:  `${origin?.lat},${origin?.lng}`,
                destination: `${destination?.lat},${destination?.lng}`,
                waypoints: waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                    }
                }
            )
        }
    }
  }, [locations, map])

  return <div ref={ref} id="map" />;
}

interface Props {
    locations: Location[]
}

const GoogleMap = ({ locations }: Props) => {
    return (
        <div className="map-cont">
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} render={render}>
            <MyMapComponent center={center} zoom={zoom} locations={locations} />
        </Wrapper>
        </div>
    );
}

export default GoogleMap