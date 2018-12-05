import React from 'react';
import LocationSearchBox from './subcomponents/LocationSearchBox'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions/auth";
import MapComponent from "./subcomponents/MapComponent";

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
class MapView2 extends React.Component {

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
                <LocationSearchBox onPlaceChanged={(place) => this.placeChanged(place)} style={{width: '70%'}}/>
                <MapComponent/>
            </div>
        )
    }
}


export default MapView2;
