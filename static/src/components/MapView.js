import React from 'react';
import LocationSearchBox from './subcomponents/LocationSearchBox'
import {Map, Marker, Circle,GoogleApiWrapper} from './google_maps_react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions/auth";
import ReactEcharts from 'echarts-for-react';

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
        super(props);

        this.state = {
            center: defaultProps.center,
            zoom: defaultProps.zoom
        };
        this.placeChanged.bind(this.placeChanged());
        this.getOption.bind(this.getOption());
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

    getOption() {
        let processed_data = {1: 12, 2: 14, 3: 24, 4: 10}
        var data1 = [];
        var xAxisData = [];
        Object.keys(processed_data).sort().forEach(function (key) {
            xAxisData.push(key);
            data1.push(processed_data[key]);
        });

        var option = {
            title: {
                text: 'Data from the past'
            },
            legend: {
                data: ['bar'],
                align: 'left'
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {},
            series: [{
                name: 'bar',
                type: 'bar',
                data: data1,
                animationDelay: function (idx) {
                    return idx * 10;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        };

        return option;
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <LocationSearchBox onPlaceChanged={(place) => this.placeChanged(place)}
                                   style={{width: '50%'}}/>

                <Map google={this.props.google}
                     zoom={this.state.zoom}
                     style={{height: '35%', width: '50%',}}
                     initialCenter={{
                         lat: 40.854885,
                         lng: -88.081807
                     }}
                     center={this.state.center}
                >
                    <Marker position={this.state.center}
                            name={'Current location'}/>
                    <Circle
                        radius={1200}
                        center={this.state.center}
                        strokeColor='transparent'
                        strokeOpacity={0}
                        strokeWeight={5}
                        fillColor={'#FF0000'}
                        fillOpacity={0.2}
                    />
                </Map>

                    <ReactEcharts option={this.getOption()} style={{position: 'relative',width: '100%', height: '30%','marginTop':'50%'}}/>

            </div>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyBhxmH4h8k0ZaUN713RVCb9T1uGTfsIX9k"
})(MapView)
