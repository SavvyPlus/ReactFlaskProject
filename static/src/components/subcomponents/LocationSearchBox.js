import React from 'react';
import TextField from 'material-ui/TextField';

export default class LocationSearchBox extends React.Component {
  componentDidMount() {
    if (typeof google === 'undefined') {
      console.warn('Google Places was not initialized. LocationSearchBox will not function.');
      return;
    }

    const { country, onPlaceChanged } = this.props;
    const { places } = google.maps;

    let options;

    if (country) {
      options = {
        componentRestrictions: { country }
      };
    }

    const input = this.locationSearch;

    input.setAttribute('placeholder', '');

    if (!input._autocomplete) {
      input._autocomplete = new places.Autocomplete(input, options);

      input._autocomplete.addListener('place_changed', (() => {
        onPlaceChanged && onPlaceChanged(input._autocomplete.getPlace());
      }).bind(input._autocomplete));
    }
  }

  render() {
    return (
        <TextField ref={ref => (this.locationSearch = ref?ref.input:"")} hintText="Search nearby" style={{ width: '70%'}}/>
    );
  }
}
