import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Link } from 'react-router-dom';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      infoIndex: null,

    };
    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkClick = props.resultClicked
  }
  onMapClick(t, map, coord) {

    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.props.onClick(latLng)
    this.setState(previousState => {
      return {
        ...previousState,
        markers: [
          {
            title: "This only is used to give user an aparoximate value",
            name: "Your location",
            position: { lat, lng }
          }
        ]
      };
    });
  }
  onMarkerHover = (props, marker, e) =>
    this.setState(s => {
      return {
        ...s,
        infoDump: props.infoContent,
        activeMarker: marker,
        showingInfoWindow: true
      }
    });

  onMarkerClick = (propsMarker, marker, e) => {
    this.onMarkClick(propsMarker.id)
  }

  render() {
    const center = this.props.latitude && this.props.longitude ?
      {
        lat: this.props.latitude,
        lng: this.props.longitude
      } : {
        lat: 40.3924352374654,
        lng: -3.6984705979760135,
      };

    const restults = this.props.results ? this.props.results : []
    const { resultClicked } = this.props
    return (
      <div>
        {JSON.stringify(this.state.infoIndex)}

        <Map
          google={this.props.google}
          zoom={14}
          // style={mapStyles}
          initialCenter={center}
          onClick={this.onMapClick}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              name={marker.name}
              position={marker.position}
            />
          ))}
          {restults.map((result, index) => (
            <Marker
              key={index}
              id={result.id}
              title={result.title}
              position={{ lat: result.latitude, lng: result.longitude }}
              onClick={this.onMarkerClick}
              onMouseout={this.onMarkerHover}
              infoContent={<WindowContent {...result} />} />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <p>{this.state.infoDump}</p>

          </InfoWindow>
        </Map>
      </div>
    );
  }
}

const WindowContent = ({ title, price, description, id, img }) => {
  return (
    <div>
      <h6>{title}</h6>
      <b>{price}</b>
      <p>{description}</p>
      <img src={img} />
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY
})(MapContainer);