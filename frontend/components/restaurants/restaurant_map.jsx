import React from 'react';

class RestaurantMap extends React.Component {
  constructor(props) {
    super(props);
    this.markers = [];
  }

  componentDidMount() {
    if (!this.props.restaurant) return;
    this.setMapOptions(this.props.restaurant);
    this.pos = new google.maps.LatLng(this.props.restaurant.latitude,
      this.props.restaurant.longitude);

    this.addMarker(this.pos);
  }

  setMapOptions(restaurant) {
    this.mapOptions = {
      center: { lat: restaurant.latitude,
        lng: restaurant.longitude },
        zoom: 13
      };
    this.map = new google.maps.Map(this.mapNode, this.mapOptions);
  }

  addMarker(pos) {
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      restaurantId: this.props.restaurant.id
    });
    this.markers.push(marker);
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }

    this.markers = [];
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.restaurant) return;
    this.setMapOptions(nextProps.restaurant);
    const pos = new google.maps.LatLng(nextProps.restaurant.latitude, nextProps.restaurant.longitude);
    this.clearMarkers();
    this.addMarker(pos);
  }

  render() {
    return (
      <div id="map-container" ref={ map => this.mapNode = map }>
      </div>
    );
  }
}

export default RestaurantMap;
