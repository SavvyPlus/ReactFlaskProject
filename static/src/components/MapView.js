import React from 'react';
import LocationSearchBox from './subcomponents/LocationSearchBox'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions/auth";
import Analytics from "./Analytics";

const defaultProps = {
    center: {
        lat: 40.854885,
        lng: -88.081807
    },
    zoom: 11
};

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class MapView extends React.Component {

    constructor(props) {
        super(props)
        this.placeChanged.bind(this.placeChanged())
        this.state = {
            center: defaultProps.center,
            zoom: defaultProps.zoom
        }
    }


    placeChanged(place) {
        if (place) {
            console.log(place);
            console.log(place.geometry.viewport.b.b);
            this.setState({
                center: place.geometry.location,
                zoom: 16
            });
            this.forceUpdate();
        }
    };


    render() {
        return (
            <div>
                <LocationSearchBox onPlaceChanged={(place) => this.placeChanged(place)} style={{ width: '70%'}}/>
                <Map google={this.props.google}
                    zoom={this.state.zoom}
                    style={{height: '60%', width: '50%'}}
                    initialCenter={{
                        lat: 40.854885,
                        lng: -88.081807
                    }}
                    center={this.state.center}
                >
                    <Marker position={this.state.center}
                                name={'Current location'} />
                </Map>

            </div>
        )
    }
}



export default GoogleApiWrapper({
  apiKey: "AIzaSyBhxmH4h8k0ZaUN713RVCb9T1uGTfsIX9k"
})(MapView)
