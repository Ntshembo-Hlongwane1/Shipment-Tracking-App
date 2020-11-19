import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import { Descriptions } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
Geocode.setApiKey("AIzaSyCXoDd6wbl4gGbcgk286sUo2Knx2g1FpLk");
Geocode.enableDebug();

class TrackerMap extends React.Component {
  state = {
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  };

  componentDidMount() {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.location}&key=AIzaSyCXoDd6wbl4gGbcgk286sUo2Knx2g1FpLk`;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          mapPosition: {
            lat: res.data.results[0].geometry.location.lat,
            lng: res.data.results[0].geometry.location.lng,
          },
          markerPosition: {
            lat: res.data.results[0].geometry.location.lat,
            lng: res.data.results[0].geometry.location.lng,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCity = (addressArray) => {
    let city = "";

    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        localStorage.setItem("city", city);
        return city;
      }
    }
  };

  getArea = (addressArray) => {
    let area = "";

    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            localStorage.setItem("area", area);
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    let state = "";

    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          localStorage.setItem("province", state);
          return state;
        }
      }
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onInfoWindowClose = (event) => {};

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        const addressArray = response.results[0].address_components;
        const city = this.getCity(addressArray);
        const area = this.getArea(addressArray);
        const state = this.getState(addressArray);
        localStorage.setItem("fullAddress", address);
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  onPlaceSelected = (place) => {
    const address = place.formatted_address;
    const addressArray = place.address_components;
    const city = this.getCity(addressArray);
    const area = this.getArea(addressArray);
    const state = this.getState(addressArray);
    const latValue = place.geometry.location.lat();
    const lngValue = place.geometry.location.lng();

    localStorage.setItem("fullAddress", address);

    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={this.state.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          {/* InfoWindow on top of marker */}

          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow>
          <Marker />

          {/* For Auto complete Search Box */}
          <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "2rem",
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={["(regions)"]}
          />
        </GoogleMap>
      ))
    );

    return (
      <div style={{ padding: "1rem", margin: "0 auto", maxWidth: 1000 }}>
        <Descriptions bordered>
          <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
          <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
          <Descriptions.Item label="Province">
            {this.state.state}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {this.state.address}
          </Descriptions.Item>
        </Descriptions>

        <AsyncMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXoDd6wbl4gGbcgk286sUo2Knx2g1FpLk&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: this.state.height }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default TrackerMap;
