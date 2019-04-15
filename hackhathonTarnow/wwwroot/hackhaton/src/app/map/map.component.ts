import { Component, OnInit } from '@angular/core';
import { DefinedPlaces } from '../defined-places';
import { MapStyle } from '../map-style';
//import * as MarkerClusterer from "@google/markerclusterer"


declare var google;
//declare var google;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  startLatitude: number = 50.0138100;
  startLongitude: number = 20.9869800;
  markers = [];
  map: any;
  mapMenuVisible = true;
  filtered = false;
  mapStyleName = 'day';
  geocoder;

  constructor(private definedPlaces: DefinedPlaces, private mapStyle: MapStyle) {
    this.mapStyleName = localStorage.getItem('mapstyle') || 'day';
    console.log(this.mapStyleName);
  }

  ngOnInit() {

    this.getLocation().then(
      () => {
        this.initMap(this.findPlace);

      }
    );
    this.geocoder = new google.maps.Geocoder();

  }

  async getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.info(position.coords.latitude, position.coords.longitude);
      console.log('elo');
    });
  }

  findPlace() {
    let t = this;
    let address: HTMLInputElement = (<any>document.querySelector('#address')).value;
    this.geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === 'OK') {
        let location = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
        t.findClosestPlace(location);
        t.map.setCenter(results[0].geometry.location);
        t.map.zoom = 16;
      } else {
        alert('Wystąpił błąd wyszukiwania: ' + status);
      }
    });
  }

  findClosestPlace(cords) {
    console.log(cords);
    //this.closestDistance(this.definedPlaces, cords[0], cords[1])
  } 

  initMap(findPlace) {
    var t = this;
    var mapStyle = t.mapStyleName == 'day' ? t.mapStyle.day : t.mapStyle.night;
    let icon_free = {
      url: '../../assets/car-green-min.png', size: new google.maps.Size(25, 42)
    };
    let icon_taken = {
      url: '../../assets/car-red-min.png', size: new google.maps.Size(25, 42)
    };

    t.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: t.startLatitude, lng: t.startLongitude },
      zoom: 13, mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      styles: mapStyle
    });

    for (let i = 0; i < t.definedPlaces.placRybny.length; i++) {
      console.log(i);
      let pos = {
        lat: t.definedPlaces.placRybny[i][1],
        lng: t.definedPlaces.placRybny[i][0]
      };

      if (i == 2) {
        t.markers[i] = new google.maps.Marker({
          position: pos,
          map: t.map,
          title: 'zajete',
          icon: icon_taken
        });
      }
      else {
        t.markers[i] = new google.maps.Marker({
          position: pos,
          map: t.map,
          title: 'wolne',
          icon: icon_free
        });
      }
    }
    var mcOptions = { gridSize: 60, maxZoom: 16, zoomOnClick: true, minimumClusterSize: 2 };
    let visibleMarkers = t.markers;
    //new MarkerClusterer(t.map, visibleMarkers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }, mcOptions)


    //  document.getElementById('findPlace').addEventListener('click', function() {
    //    findPlace(geocoder, this.map);
    //  });
  }

  closestDistance(parkCords, geo_lat, geo_lon) {
    let distances = [];
    parkCords.forEach(function (location, i) {
      distances[i] = {
        distance: this.calculateDistance(geo_lat, geo_lon, location.lat, location.lng),
        city: location.title
      }
    });
    let closestLoc = distances.reduce((prev, current) => (prev.distance < current.distance) ? prev : current);

    return closestLoc;
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    if (lat1 === '' || lon1 === '' || lat2 === '' || lon2 === '') {
      return 999999999999;
    }

    var p = 0.017453292519943295;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
  }

  filterPlaces() {
    console.log(this.map);
    if (this.filtered == false) {
      console.log('filtrowanie on');
      this.filtered = true;
      for (let j = 0; j < this.markers.length; j++) {
        if (this.markers[j].title == 'zajete') {
          this.markers[j].setVisible(false);
        }
        else {
          this.markers[j].setVisible(true);
        }
      }
    }
    else {
      this.filtered = false;
      console.log('filtrowanie off');
      for (let j = 0; j < this.markers.length; j++) {
        this.markers[j].setVisible(true);
      }
    }
  }

  switchMapStyle() {
    var newStyle = this.mapStyleName == 'day' ? 'night' : 'day';
    this.mapStyleName = newStyle;
    console.log(newStyle);
    localStorage.setItem('mapstyle', newStyle);
    var mapStyle = newStyle == 'day' ? this.mapStyle.day : this.mapStyle.night;

    this.map.setOptions({ styles: mapStyle });

  }
}
